import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("chat-message")
export default class Messages extends BaseEntity {
  @PrimaryColumn({ type: "numeric" })
  id: number;

  @Column()
  message: string;
}
