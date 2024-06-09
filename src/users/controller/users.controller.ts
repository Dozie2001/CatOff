import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Request,
    Get,
    Res,
    Param,
    Put,
    Body,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { UpdateResult } from 'typeorm';
import { WalletEntity } from 'src/wallet/services/models/wallet.entity';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ) {}

    @Get(':userId')
    findUserById(@Param('userId') userStringId: string): Observable<User> {
        const userId = parseInt(userStringId);
        return this.userService.findUserById(userId);
    }

    @Put('wallets/:userId')
    updateWallets(@Param('userId') userId: string, @Body() wallet: WalletEntity): Observable<UpdateResult> {
        const userIdNumber = parseInt(userId, 10); // Convert the userId from string to number
        return this.userService.updateUserWallets(userIdNumber, wallet);
    }

}
