export class CreateUserDTO{
    name:string;
    email:string;
    password:string;
    address:string;
    city:string
}

export class UpdateUserDTO{
    password:string;
    address:string;
}