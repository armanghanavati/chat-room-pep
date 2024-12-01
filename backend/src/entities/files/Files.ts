import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  // @Column()
  // content: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}