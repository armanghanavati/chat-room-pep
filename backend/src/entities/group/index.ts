import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { GroupMentions } from "../groupMentions";

@Entity("groups")
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("nvarchar")
  groupName: string;

  @ManyToMany(() => GroupMentions, (gpMentions) => gpMentions.groups)
  @JoinTable()
  groupMentions: GroupMentions[];
}