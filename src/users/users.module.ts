import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, AuthService],
  controllers: [UsersController, AuthController]
})
export class UsersModule {

  
}
