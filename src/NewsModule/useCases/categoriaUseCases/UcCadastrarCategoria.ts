/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from 'src/NewsModule/entities/categoria.entity';
import { CategoriaService } from 'src/NewsModule/services/categoria.service';



@Injectable()
export class UcCadastrarCategoria {


    constructor(private readonly categoriaService: CategoriaService) { }


    async run(categoria: Partial<Categoria>): Promise<Categoria> {
        return this.categoriaService.cadastrarCategoria(categoria);
    }



}
