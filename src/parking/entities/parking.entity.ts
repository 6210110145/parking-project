import { Gate } from "src/gate/entities/gate.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        type: "integer",
        nullable: false
    })
    parking_total: number

    @Column({
        name: 'จำนวนช่องที่รถจอด',
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

    @OneToMany(() => Gate, gates => gates.parking)
    @JoinColumn()
    gates: Gate[]
}