import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Messages } from "../messages/Messages";

@Entity()
export class Reciever extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { nullable: true })
  recieverId: number;

}
