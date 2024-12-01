import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reciever } from "../reciever";

@Entity()
export class Messages extends BaseEntity {
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
}
