import { Type } from "class-transformer"
import { IsOptional } from "class-validator"

export class PaginationBookDto {
    @IsOptional()
    @Type(() => Number)
    limit?: number

    @IsOptional()
    @Type(() => Number)
    offset?: number
}