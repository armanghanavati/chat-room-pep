import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({ tableName: "group" })
export class Group extends Model {
  @Column(DataType.STRING)
  groupName!: string;

  @Column(DataType.STRING)
  usersId!: number;

  @Column("nvarchar") // یا طول مناسب دیگری
  recieverId: string; // به عنوان رشته

  getRecieverIds(): number[] {
    return this.recieverId.split(",").map((id) => Number(id.trim()));
  }

  setRecieverIds(ids: number[]): void {
    this.recieverId = ids.join(","); // ذخیره به عنوان رشته
  }
}

async () => {
  await Group.sync();
};
