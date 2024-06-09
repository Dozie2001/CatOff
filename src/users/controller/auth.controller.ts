import { Body, HttpCode, HttpStatus, Post, Controller, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.class';
import { AuthService } from '../services/auth.service';
import { DeleteResult } from 'typeorm';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}


    @Post()
    register(@Body() user: User): Observable<User> {
        return this.authService.registerAccount(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user: User): Observable<User> {
      return this.authService
        .login(user)
    }


    @Delete('delete')
    delete_User(@Body() id: number): Observable<DeleteResult> {
        return this.authService.deleteUser(id)
    }
}
