import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("login_info")
export class LoginInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 1000 })
  token: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column({ nullable: true })
  userRole: string;
}
