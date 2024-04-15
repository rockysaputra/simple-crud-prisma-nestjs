import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDTO } from './create-user.dto';
import { client_redis } from 'src/redis_connect/redis_connect';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUser(@Res() res:Response){
    let findUser

    let cache = await client_redis.get("users:users")
    
    if(cache){
      findUser = JSON.parse(cache)
    }else{
      findUser = await this.userService.findAllUsers();
      await client_redis.set("users:users",JSON.stringify(findUser))
    }
    res.status(HttpStatus.OK).json(findUser);
  }

  @Post()
  async addNewUser(@Body() addUserData:CreateUserDTO,@Res() res:Response){
    try {
      const createData = await this.userService.createNewUser(addUserData,res)
      
      await client_redis.del("users:users")
      return res.status(HttpStatus.OK).json({
        "State":"Success",
        "message":"Success Add new data"
      })
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        "message":"Internal Server Error"
      });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id:number , @Res() res:Response){
    try {
      const deleteUser  = await this.userService.deleteUser(id,res)

      if(deleteUser.statusCode == 200){
        await client_redis.del("users:users")
        return res.status(HttpStatus.OK).json({
          "State":"Success",
          "message":`Success Delete data with id ${id}`
        })
      }
      
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        "message":"Internal Server Error"
      });
    }
  }


}