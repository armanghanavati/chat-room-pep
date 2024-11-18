import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("grout")
export default class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  groupName: string;

  @Column()
  usersId: number;

  @Column()
  recieverId: number;
}
