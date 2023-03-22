/* eslint-disable prettier/prettier */
export class CreateCategoryDto {
  nome: string;
  descricao: string;
  ativo: string;
}

export class UpdateEventoDto extends CreateCategoryDto {
  id: number;
}
