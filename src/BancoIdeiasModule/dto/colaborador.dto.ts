/* eslint-disable prettier/prettier */
export class CreateColaboradorDto {
  nome: string;
  matricula: string;
  nomePrefixo: string;
  prefixo: string;
  nomeUor: string;
  uor: string;
  aceiteTermos: string;
  ativo: string;
}

export class UpdateColaboradorDto extends CreateColaboradorDto {
  id: number;
}
