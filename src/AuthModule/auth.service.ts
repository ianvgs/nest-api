import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import axios from 'axios';
import * as https from 'https';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './dto/auth';

interface DadosAdicionaisFunci {
  prefixoDependencia?: number;
  nomePrefixo?: string;
  nomePrefixoCompleto?: string;
  prefixoDiretoria?: number;
  nomeDiretoria?: string;
  nomeDiretoriaCompleto?: string;
  codigoComissaoUsuario: number;
  textoComissaoUsuario: string;
  codigoReferenciaOrganizacional: string;
  dataNasc?: string;
  sexo?: string;
}

@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  //Encrypt configuration
  private algorithm = 'aes-256-ctr';
  private secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
  private iv = crypto.randomBytes(16);

  //KEY_PREFIX = prefixo do token que vai ser enviado no final do processamento 'arqdsad-auth-'+ hash. (tipo o Bearer+token)
  private KEY_PREFIX = 'arqsad-auth-';

  autenticar(request: Request): any {
    if (request.cookies != undefined) {
      return this.geraUsuarioOpenAM(request.cookies['BBSSOToken']);
    }
    throw new BadRequestException('Favor logar no OpenAm');
  }

  async geraUsuarioOpenAM(bbToken: string): Promise<any> {
    const sessionAtiva: Auth = await this.authModel.findOne({
      where: { sessionKey: this.generateSessionKey(bbToken) },
    });
    if (sessionAtiva) {
      return this.desencriptografar(sessionAtiva.auth);
    }

    let respostaOpenAm = { data: { roles: null, token: null } };

    try {
      respostaOpenAm = await axios.get(
        `https://sso.intranet.bb.com.br/sso/identity/json/attributes?subjectid=${bbToken}`,
        {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers: {
            'Content-Type': 'application/json',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
          },
        },
      );
    } catch (error) {
      if (error.message == 'Request failed with status code 401') {
        throw new UnauthorizedException('Cookie expirado ou invalido!');
      } else {
        throw new BadRequestException(
          `Problemas no cookie! \n mensagem: ${error.message}`,
        );
      }
    }

    const { data } = respostaOpenAm;

    //Transforma usuario XML => JSON // todos os dados vindo do sso
    const usuario: any = {
      matricula: this.retornaObjetoSingle(data, 'cd-idgl-usu'),
      matriculaUpper: String(
        this.retornaObjetoSingle(data, 'cd-idgl-usu'),
      ).toUpperCase(),
      nome: this.retornaObjetoSingle(data, 'nomeFuncionario'),
      nomeGuerra: this.retornaObjetoSingle(data, 'nomeGuerra'),
      displayname: this.retornaObjetoSingle(data, 'displayname'),
      nomeCamelCase: this.retornaObjetoSingle(data, 'sn'),
      responsabilidadeFuncional: parseInt(
        this.retornaObjetoSingle(data, 'responsabilidadeFuncional'),
      ),
      grupamento: parseInt(this.retornaObjetoSingle(data, 'grupamento')),
      codigoCargo: parseInt(this.retornaObjetoSingle(data, 'codigoComissao')),
      prefixoDependencia: parseInt(
        this.retornaObjetoSingle(data, 'prefixoDependencia'),
      ),
      nomeCargo: this.retornaObjetoSingle(data, 'tx-cmss-usu'),
      cpfFunci: this.retornaObjetoSingle(data, 'nr-cpf'),
      telefoneCasa: this.retornaObjetoSingle(data, 'homephone'),
      telefoneMovel: this.retornaObjetoSingle(data, 'mobile'),
      uorEquipe: parseInt(this.retornaObjetoSingle(data, 'cd-eqp')),
      codigoNacionalidade: parseInt(this.retornaObjetoSingle(data, 'cd-ncl')),
      prefixoDiretoria: parseInt(
        this.retornaObjetoSingle(data, 'prefixoDiretoria'),
      ),
      tipoMatricula: this.retornaObjetoSingle(data, 'cd-tip-idgl'),
      cdDvs: parseInt(this.retornaObjetoSingle(data, 'cd-dvs')),
      codigoComissaoUsu: parseInt(
        this.retornaObjetoSingle(data, 'cd-cmss-usu'),
      ),
      prefixoSuperEstadual: parseInt(
        this.retornaObjetoSingle(data, 'prefixoSuperEstadual'),
      ),
      codigoInstituicao: parseInt(
        this.retornaObjetoSingle(data, 'codigoInstituicao'),
      ),
      telefoneTrabalho: this.retornaObjetoSingle(data, 'telephonenumber'),
      criticidade: this.retornaObjetoSingle(data, 'criticidade'),
      prefixoTemporario: parseInt(
        this.retornaObjetoSingle(data, 'cd-pref-depe'),
      ),
      codMCI: parseInt(this.retornaObjetoSingle(data, 'cd-cli')),
      cdIor: parseInt(this.retornaObjetoSingle(data, 'cd-ior')),
      codigoPilar: this.retornaObjetoArray(data, 'codigoPilar'),
      nomeUF: this.retornaObjetoSingle(data, 'nomeUF'),
      codRefOrgc: this.retornaObjetoSingle(data, 'cd-ref-orgc'),
      uorDependencia: parseInt(this.retornaObjetoSingle(data, 'cd-uor-dep')),
      chaveCripto: this.retornaObjetoSingle(data, 'chaveCripto'),
      tipoDependencia: parseInt(
        this.retornaObjetoSingle(data, 'tipoDependencia'),
      ),
      cdInst: parseInt(this.retornaObjetoSingle(data, 'cd-inst')),
      mail: this.retornaObjetoSingle(data, 'mail'),
      sessaoIIB: this.retornaObjetoSingle(data, 'sessaoIIB'),
      consentimentoOauth2: this.retornaObjetoArray(data, 'oauth2savedconsent'),
      papeis: this.trataPapeis(data.roles),
      bbSSOToken: data.token.tokenId,
      ssoacr: 'sso.intranet.bb.com.br',
    };

    //Complementa os dados através de um serviço da diope(aqui nem precisaria ter)
    const dadosAdicionaisFunci: DadosAdicionaisFunci =
      await this.getDadosAdicionaisUsuario(
        usuario.matricula,
        usuario.prefixoDependencia,
      );

    if (dadosAdicionaisFunci != null) {
      usuario.nomePrefixo = dadosAdicionaisFunci.nomePrefixo;
      usuario.nomePrefixoCompleto = dadosAdicionaisFunci.nomePrefixoCompleto;
      usuario.codRefOrgc = dadosAdicionaisFunci.codigoReferenciaOrganizacional;
      usuario.codigoComissaoUsu = dadosAdicionaisFunci.codigoComissaoUsuario;
      usuario.nomeCargo = dadosAdicionaisFunci.textoComissaoUsuario;
      usuario.dtNascimento = dadosAdicionaisFunci.dataNasc;
      usuario.sexo = dadosAdicionaisFunci.sexo;

      if (dadosAdicionaisFunci.nomeDiretoria !== undefined) {
        usuario.nomeDiretoria = dadosAdicionaisFunci.nomeDiretoria;
        usuario.nomeDiretoriaCompleto =
          dadosAdicionaisFunci.nomeDiretoriaCompleto;
      }
    }

    const encryptUserData = await this.encriptografar(usuario);
    const answer = new this.authModel({
      auth: encryptUserData,
      sessionKey: this.generateSessionKey(bbToken),
    });

    answer
      .save()
      .then((res): void => {
        /*  */
      })
      .catch(() => {
        throw new BadRequestException('Erro ao salvar sessão do usuario.');
      });

    return usuario;
  }

  private retornaObjetoSingle(dadosOpenAM: any, nome: string) {
    return dadosOpenAM.attributes
      .filter((item) => item.name === nome)
      .map((item) => item['values'][0])[0];
  }

  private retornaObjetoArray(dadosOpenAM: any, nome: string) {
    return dadosOpenAM.attributes
      .filter((item) => item.name === nome)
      .map((item) => item['values'])[0];
  }

  private trataPapeis(lista) {
    const listaRetorno = [];
    lista.forEach((element) => {
      listaRetorno.push(
        element
          .replace(',ou=group,o=bb,ou=services,dc=opensso,dc=java,dc=net', '')
          .replace('id=', ''),
      );
    });

    return listaRetorno;
  }

  encriptografar(valor) {
    valor = JSON.stringify(valor);
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.secretKey,
      this.iv,
    );
    const encrypted = Buffer.concat([cipher.update(valor), cipher.final()]);

    return JSON.stringify({
      iv: this.iv.toString('hex'),
      content: encrypted.toString('hex'),
    });
  }

  desencriptografar(valor) {
    valor = JSON.parse(valor);
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(valor.iv, 'hex'),
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(valor.content, 'hex')),
      decipher.final(),
    ]);
    return JSON.parse(decrpyted.toString());
  }

  private async getDadosAdicionaisUsuario(
    chaveUsuario: string,
    prefixoDependencia: number,
  ): Promise<DadosAdicionaisFunci> {
    const urlAutenticador = process.env.AUTENTICADOR_DIOPE_URL;

    try {
      const response = await axios.get(
        `${urlAutenticador}/infos-usuario?chaveUsuario=${chaveUsuario}&prefixoDependencia=${prefixoDependencia}`,
        {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers: {
            'Content-Type': 'application/json',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
          },
        },
      );

      return response.data as DadosAdicionaisFunci;
    } catch (error: any) {
      return null;
    }
  }

  private generateSessionKey(bbToken: string) {
    return this.KEY_PREFIX + bbToken;
  }
}
