/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/NewsModule/entities/tag.entity';
import { TagService } from 'src/NewsModule/services/tag.service';

@Injectable()
export class UcRecuperarTodasTags {
  constructor(private readonly tagService: TagService) { }

  async run(): Promise<Tag[]> {
    return this.tagService.getTodasTags();
  }
}
