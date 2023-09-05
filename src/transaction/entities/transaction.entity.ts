import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'parking_id'
    })
    transaction_id: number

}