import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { join } from 'path';

@Module({
  imports: [  
    //Allows for Postgres variables to be made available to Services
    ConfigModule.forRoot({ isGlobal: true }), UsersModule, WalletModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true, // shouldn't be used in production - may lose data
      logging: process.env.DB_LOGGING === 'true',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [__dirname + '/../migration/**/*.{js,ts}'],
      subscribers: [__dirname + '/../subscriber/**/*.{js,ts}'],
      extra: {
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
