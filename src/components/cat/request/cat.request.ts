import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CatRequest {
  @IsString()
  @IsDefined()
  name: string;

  @IsNumber()
  @IsDefined()
  age: number;
}
