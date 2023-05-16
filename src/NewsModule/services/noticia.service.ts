import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';
const fs = require('fs');
const path = require('path');

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(Noticia, 'news_connection')
    private readonly noticiaRepo: Repository<Noticia>,

  ) { }
  async recuperarTodasNoticias(): Promise<Noticia[]> {
    const noticias = await this.noticiaRepo.find({
      relations: { colaborador: true, tags: true }
    });
    return noticias;
  }

  async cadastrarNoticia(props: Partial<Noticia>): Promise<Noticia> {

    const { titulo, resumo, texto, idCategoria, idColaborador, tags, idSite, imgPath } = props;
    const createdNoticia = this.noticiaRepo.create({
      imgPath,
      idSite,
      titulo,
      resumo,
      texto,
      idCategoria,
      idColaborador,
      ativo: "S",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags
    });
    const savedNoticia = await this.noticiaRepo.save(createdNoticia);
    return savedNoticia;
  }

  async recuperarNoticiaPorId(id: number, idSite: number) {

    const noticia = await this.noticiaRepo.findOne({
      where: {
        id: id
      },
      relations: {
        categoria: true,
        colaborador: true
      }
    });

    if (noticia.idSite != idSite) {
      throw new BadRequestException('Noticia de outro site');
    }

    if (!noticia) {
      throw new BadRequestException('Noticia não encontrada');
    }


    noticia.views = noticia.views + 1
    await this.noticiaRepo.save(noticia)


    // Resolve the image file path
    const imagePath = path.resolve(noticia.imgPath);
    const imageData = await this.readImageFile(imagePath);
    return { ...noticia, imageData };

  }


  private async readImageFile(imgPath: string): Promise<Buffer> {
    return fs.promises.readFile(imgPath);
  }
}
