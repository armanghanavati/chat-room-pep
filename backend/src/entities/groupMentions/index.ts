import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Group } from "../group";

@Entity("group_mentions")
export class GroupMentions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  userId: number;

  @Column("nvarchar")
  groupName: string;

  @Column("int", { nullable: true })
  mentionMmr: number | null;

  @ManyToMany(() => Group, (group: any) => group.groupMentions)
  groups: Group[];
}
