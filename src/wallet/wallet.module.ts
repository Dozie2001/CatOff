import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { WalletController } from './controller/wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './services/models/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  providers: [WalletService],
  controllers: [WalletController]
})
export class WalletModule {}
