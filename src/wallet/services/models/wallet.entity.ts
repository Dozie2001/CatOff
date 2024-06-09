import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  import { UserEntity } from 'src/users/models/user.entity';
  
@Entity('WalletAddress')
export class WalletEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    address: string;

    @Column({default: 0})
    balance: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.wallets)
    author: UserEntity
  

}
  