import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity'

@Entity()
export class Log {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "mediumtext", nullable: false })
  text: string

  @Column({
    type: "enum",
    enum: [true, false],
    default: true
  })
  isPublic: boolean

  @CreateDateColumn({ type: "timestamp" })
  create_time: Date

  @UpdateDateColumn({ type: "timestamp" })
  updata_time: Date

  @ManyToOne(() => User, (user) => user.logs)
  @JoinColumn()
  user: User
}
