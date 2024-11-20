import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nullable } from "zod";

@Entity("chat-message")
export default class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  title: string;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column("int", { nullable: true })
  recieverId: number | null;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;

  @OneToMany(() => Reciever, (reciever: any) => reciever.message, {
    cascade: true,
  })
  recievers: Reciever[];
}

@Entity("receivers") // نام جدول
export class Reciever extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { nullable: true })
  recieverId: number;

  @ManyToOne(() => Messages, (message) => message.recievers)
  message: Messages;
}
