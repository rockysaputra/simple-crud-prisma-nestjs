import { Module } from '@nestjs/common';

import { UserController } from './user/user.controller';
import { QuotesController } from './quotes/quotes.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService,PrismaService],
})
export class AppModule {}
