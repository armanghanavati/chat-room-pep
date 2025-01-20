import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class UploadFiles extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column("int")
  attachmentId: Number;

  @Column("char")
  attachmentType: string;

  @Column("char")
  attachmentName: string;

  @Column("char")
  ext: string;

  @Column("date")
  insertDate: Date;

  @Column("char")
  fileName: String;
}