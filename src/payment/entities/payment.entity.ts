import { Transaction } from "src/transaction/entities/transaction.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, 
         OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Payment')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'payment_id'
    })
    payment_id: number

    @Column({
        name: 'ยอดเงินที่ต้องชำระ',
        nullable: true
    })
    payment_total?: number

    @Column({
        name: 'รูปแบบที่ชำระ',
        nullable: true
    })
    payment_type?: string

    @CreateDateColumn()
    payment_createat: Date

    @UpdateDateColumn()
    payment_updateat: Date

    @OneToOne(() => Transaction, (Transaction) => Transaction.payment)
    transaction: Transaction
}