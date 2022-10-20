import {IsDefined, MaxLength, MinLength} from "class-validator";

export class CreateUserDto{
    @MaxLength(16,{message:'Username must have maximum 16 characters.'})
    @MinLength(2,{message:'Username must have minimum 2 characters.'})
    @IsDefined()
    username:string;

    @MaxLength(16,{message:'Name must have maximum 16 characters.'})
    @MinLength(2,{message:'Name must have minimum 2 characters.'})
    @IsDefined()
    name:string;

    @MaxLength(16,{message:'Surname must have maximum 16 characters.'})
    @MinLength(2,{message:'Surname must have minimum 2 characters.'})
    @IsDefined()
    surname:string;

}