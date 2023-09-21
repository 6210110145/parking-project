import { Transaction } from "src/transaction/entities/transaction.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, 
         ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Payment')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'payment_id'
    })
    payment_id: number

    @Column({
        name: 'total',
        nullable: true
    })
    payment_total: number

    @Column({
        name: 'type',
        nullable: true
    })
    payment_type: string

    @Column({
        name: 'payment_time',
        nullable: true
    })
    payment_time: Date

    @CreateDateColumn()
    payment_createat: Date

    @UpdateDateColumn()
    payment_updateat: Date

    @ManyToOne(() => Transaction, Transaction => Transaction.payments)
    transaction: Transaction
}