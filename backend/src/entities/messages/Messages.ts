import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { nullable } from "zod";

@Entity("chat-message")
export default class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  roomId: string;

  @Column({ type: "int", nullable: true })
  receiveId: number | null;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
