/* eslint-disable prettier/prettier */
export class CreateColaboradorDto {
  nome: string;
  email: string;
  ativo: string;
}

export class UpdateColaboradorDto extends CreateColaboradorDto {
  id: number;
}
