import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { nullable } from "zod";
import Mentions from "../mentions";

@Entity("chat-message")
export default class Messages extends Mentions {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  // @Column()
  // roomId: string;

  @Column("int", { nullable: true })
  recieverId: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
