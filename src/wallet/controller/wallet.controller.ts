import { Controller, Post, Get, Delete, Put } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';

@Controller('wallet')
export class WalletController {


    @Post('user')
    create()  {

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
