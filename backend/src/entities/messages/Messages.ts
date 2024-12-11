import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @Column("int", { default: 0 })
  roomId: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
