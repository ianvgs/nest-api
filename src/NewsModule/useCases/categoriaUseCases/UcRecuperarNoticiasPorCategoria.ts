/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from 'src/NewsModule/entities/categoria.entity';
import { CategoriaService } from 'src/NewsModule/services/categoria.service';

@Injectable()
export class UcRecuperarNoticiasPorCategoria {
    constructor(private readonly categoriaService: CategoriaService) { }
    async run(nomeCategoria: string): Promise<Categoria> {
        return this.categoriaService.getNoticiasPorCategoria(nomeCategoria);
    }
}
