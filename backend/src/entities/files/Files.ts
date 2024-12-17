import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Files extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column()
  username: string;
  // @Column()
  // content: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;
}
