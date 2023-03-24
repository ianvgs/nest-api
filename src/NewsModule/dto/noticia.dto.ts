/* eslint-disable prettier/prettier */
export class CreateNoticiaDto {
  id: number;

  titulo: string;

  resumo: string;

  texto: string;

  idCategoria: number;

  idColaborador: string;

  ativo: string;
}

export class UpdateNoticiaDto extends CreateNoticiaDto {
  id: number;
}
