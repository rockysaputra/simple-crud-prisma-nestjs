import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDTO } from "./create-user.dto";
import { Response } from "express";
const bcrypt = require('bcrypt')


function hashPassword(curPassword:string){
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(curPassword,salt)
    return hashedPassword
}
@Injectable()
export class UserService{
    constructor(private prismaService:PrismaService){}

    async findAllUsers(){
        return this.prismaService.user.findMany();
    }

    async createNewUser(data:CreateUserDTO , @Res() res:Response){ 
        try {

            data.password = hashPassword(data.password)
            const createUser = await this.prismaService.user.create({
                data
            })
            console.log(createUser);
            
            return res.status(HttpStatus.OK)
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message":"Internal Server Error"
            });
        }
    }

    async deleteUser(id:number ,@Res() res:Response){
        try {
            const deleteUser = await this.prismaService.user.delete({
                where:{
                    id:Number(id)
                }
            })

            return res.status(HttpStatus.OK)
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message":"Internal Server Error"
            });
        }
    }
}