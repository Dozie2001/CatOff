import { Body, Controller, Post, Get, Delete, Put } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../services/models/wallet.interface';
import { User } from 'src/users/models/user.class';
import { Observable } from 'rxjs';
@Controller('wallet')
export class WalletController {

    constructor( private walletService: WalletService) {}

    @Post('user')
    create(@Body() user: User, post: Wallet ): Observable<Wallet>  {
        return this.walletService.createWallet(user, post);
    }

    @Get('user/id')
    getWallet() {

    }

    @Put(':id')
    updateWallet() {

    }

    @Delete(':id')
    deleteWallet() {

    }
}
