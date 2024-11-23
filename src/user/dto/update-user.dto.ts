import { IsNotEmpty, Length, Min, NotEquals, ValidateIf } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    @Length(0, 200)
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    name?: string;

    @Min(1)
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    age?: number;
}