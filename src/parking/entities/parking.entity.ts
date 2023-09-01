import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Parking')
export class Parking extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'parking_id'
    })
    parking_id: number

    @Column({
        name: 'name',
        nullable: false
    })
    parking_name: string

    @Column({
        name: 'จำนวนช่องทั้งหมด',
        nullable: false
    })
    parking_total: number

    @Column({
        name: 'จำนวนช่องที่จอด',
        default: 0,
        nullable: false
    })
    parking_notEmpty: number

    @Column({
        name: 'ค่าจอด(บาท/30 นาที)',
        nullable: false
    })
    parking_costpermi: number

    @CreateDateColumn()
    createat: Date

    @UpdateDateColumn()
    updateat: Date
}