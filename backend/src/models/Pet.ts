import {Entity, Column, PrimaryGeneratedColumn,OneToMany, JoinColumn} from 'typeorm';
import Image from './image';

@Entity('pets')
export default class Pet {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    catdog:string;

    @Column()
    latitude:number;

    @Column()
    longitude:number;

    @Column()
    about:string;

    @Column()
    instructions:string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.pet, {
        cascade: ['insert','update']
    })
    @JoinColumn({ name: 'pet_id'})
    images:Image[];

}