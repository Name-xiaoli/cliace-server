import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Email{

  @PrimaryGeneratedColumn()
  id:number

  @Column({ type: "varchar", length: 20, select: false, update: false,unique: true, })
  email: string

  @Column({ type: "varchar",length: 6  })
  captcha: string
}