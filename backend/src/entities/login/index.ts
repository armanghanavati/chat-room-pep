import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LoginInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 1000 })
  token: string;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  userRole: string;
}
