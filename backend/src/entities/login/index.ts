import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("login_info")
export class LoginInfo extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  userId: string;

  @Column()
  userName: string;
}
