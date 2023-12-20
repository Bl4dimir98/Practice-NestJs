import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from "class-validator";


export class CreateBookDto {
    @IsNotEmpty()
    @IsNumber()
    readonly barCode: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    readonly country: string;

    @IsNotEmpty()
    @IsNumber()
    readonly yearPublic: number;



}
