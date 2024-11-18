import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("mentions")
export default class Mentions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column("int")
  recieverId: number;

  // @Column("nvarchar", { length: 255 }) // با استفاده از nvarchar برای رشته
  // recieverId: string; // به عنوان رشته

  // getRecieverIds(): number[] {
  //   return this.recieverId.split(",").map((id) => parseInt(id.trim(), 10));
  // }

  // setRecieverIds(ids: number[]): void {
  //   this.recieverId = ids.join(","); // تبدیل آرایه به رشته
  // }
}
