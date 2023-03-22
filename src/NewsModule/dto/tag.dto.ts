/* eslint-disable prettier/prettier */
export class CreateTagDto {
  tag: string;
  descricao: string;
  ativo: string;
}

export class UpdateTagDto extends CreateTagDto {
  id: number;
}
