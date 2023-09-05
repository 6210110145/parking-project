import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'parking_id'
    })
    transaction_id: number
    
    @Column({
        name: 'เลขทะเบียน',
        nullable: false
    })
    car_license: string

    @Column({
        name: 'จังหวัด',
        nullable: false
    })
    car_province: string

    @Column({
        name: 'วันที่',
        type: 'date'
    })
    date: Date

    @Column({
        name: 'ลานจอด',
        nullable: false
    })
    parking_name: string

    @Column({
        name: 'ค่าจอด(บาท/30 นาที)',
        nullable: false
    })
    parking_costpermi: number
}