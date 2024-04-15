import { HttpStatus, Injectable, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateUserDTO } from "./create-user.dto";
import { Response } from "express";
import { send } from "process";
const bcrypt = require('bcrypt')


function hashPassword(curPassword:string){
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(curPassword,salt)
    return hashedPassword
}
@Injectable()
export class UserService{
    constructor(private prismaService:PrismaService){}

    async findAllUsers(@Res() res:Response){
        try {
            const getUserAll = await this.prismaService.user.findMany({
                select:{
                    id:true,
                    email:true,
                    name:true
                }
            });
            return getUserAll
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message":"Internal Server Error"
            });
        }
    }

    async findDetailUsers(@Res() res:Response , id:number){
        try {
            const getUserDetail = await this.prismaService.user.findFirst({
                where:{
                    id : Number(id)
                },
                select:{
                    id: true,
                    email: true,
                    name: true,
                    password: true,
                    address: true,
                    city: true,
                    createdAt: true,
                    quotes: true
                }
            })

            return getUserDetail
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                "message":"Internal Server Error"
            });
        }
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
            await this.prismaService.quotes.deleteMany({
                where: {
                    userId: Number(id),
                },
            });
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

    async updateUserAdress(id:number ,@Res() res:Response , data:any){
        try {
            const updateUser = await this.prismaService.user.update({
                where: {
                  id: Number(id)
                },
                data
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