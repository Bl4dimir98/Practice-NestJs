import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: number;

  // Dto de la relación
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  bookTitle: string[]

}
