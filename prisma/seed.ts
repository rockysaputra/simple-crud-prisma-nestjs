import { Prisma, PrismaClient } from "@prisma/client";
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

function hashPassword(curPassword:string){
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(curPassword,salt)
    return hashedPassword
}

const userData: Prisma.UserCreateInput[] = [
    {
        name:"rocky",
        email:"hehe@mail.com",
        password:hashPassword("12345678"),
        address:"jelambar",
        city:"jakarta",
        quotes:{
            create:{
                quotes:"jika aku ingin menang maka akan menang"
            }
        }
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

