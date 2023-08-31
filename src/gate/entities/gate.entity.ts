import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class Gate extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'gate_id'
    })
    gate_id: number

    @Column({
        name: 'name',
        nullable: false
    })
    gate_name: string

    @Column({
        name: 'in-out gates',
        nullable: false
    })
    gate_type: string

    @Column({
        name: 'time'
    })
    gate_time: Date

    @Column({
        name: 'เลขป้ายทะเบียน'
    })
    car_license: string

    @Column({
        name: 'จังหวัด'
    })
    car_province: string

    @Column()
    gate_createat: Date

    @Column()
    gate_updateat: Date

}
