import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("group")
export default class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  groupName: string;

  @Column()
  usersId: number;

  @Column("nvarchar", { length: 255 }) // یا طول مناسب دیگری
  recieverId: string; // به عنوان رشته

  getRecieverIds(): number[] {
    return this.recieverId.split(",").map((id) => Number(id.trim()));
  }

  setRecieverIds(ids: number[]): void {
    this.recieverId = ids.join(","); // ذخیره به عنوان رشته
  }
}
