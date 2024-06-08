import { Column, OneToMany, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { WalletEntity } from "src/wallet/services/models/wallet.entity";




@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;
  
    @Column({ select: false })
    password: string;


    @OneToMany(() => WalletEntity, (walletEntity) => walletEntity.address)
    wallets:  WalletEntity[]
}