import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag, 'news_database2')
    private readonly tagRepo: Repository<Tag>,
  ) { }

  async getTodasTags(): Promise<Tag[]> {
    const getTags = await this.tagRepo.find();
    return getTags;
  }

  async getTagPorIdeia(idIdeia): Promise<Tag[]> {
    const tagsPorIdeia = await this.tagRepo.find({ where: { id: idIdeia } });
    return tagsPorIdeia;
  }

  async cadastrarTag(props: Partial<Tag>): Promise<any> {
    const { tag, descricao } = props;

    const tagCriada = this.tagRepo.create({
      tag: tag,
      descricao: descricao,
      ativo: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.tagRepo.save(tagCriada);
    return tagCriada;
  }
}
