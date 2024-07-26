import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 10, unique: true, update: false })
  login_name: string

  @Column({ type: "varchar", length: 10, nullable: true })
  nickname: string

  @Column({ type: "varchar", length: 20, select: false })
  passworsd: string

  @Column({ type: "varchar", length: 20, select: false, update: false })
  email: string

  @Column({ type: "int", nullable: true })
  age: number

  @Column({
    type: "enum",
    enum: ['男', '女'],
    default: '男'
  })
  sex: string

  @CreateDateColumn({ type: "timestamp" })
  create_time: Date

  @UpdateDateColumn({ type: "timestamp" })
  updata_time: Date
}
