/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from 'src/NewsModule/entities/tag.entity';
import { TagService } from 'src/NewsModule/services/tag.service';




@Injectable()
export class UcCadastrarTag {




    constructor(private readonly tagService: TagService) { }

    async run(tag: Partial<Tag>): Promise<Tag> {
        return this.tagService.cadastrarTag(tag);
    }








}
