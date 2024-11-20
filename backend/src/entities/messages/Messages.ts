import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { nullable } from "zod";

@Entity("chat-message")
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  title: string;

  @Column()
  userId: any;

  @Column()
  userName: string;

  @Column("int", { nullable: true })
  recieverId: number | null;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  time: Date;

  // @OneToMany(() => Reciever, (reciever: any) => reciever.message, {
  //   cascade: true,
  // })
  // recievers: Reciever[];
}

// @Entity("receivers") // نام جدول
// export class Reciever extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column("int", { nullable: true })
//   recieverId: number;

//   // ارتباط با Message
//   @ManyToOne(() => Messages, (message) => message.recievers)
//   message: Messages;
// }

// @Entity("chat-message") // نام جدول
// export class Message extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column("int")
//   userId: number;

//   @Column("nvarchar", { length: 255 })
//   userName: string;

//   @Column("nvarchar", { length: 255 })
//   title: string;

//   @Column("datetime")
//   time: Date;

//   // ارتباط یک به چند با Reciever
//   @OneToMany(() => Reciever, (reciever: any) => reciever.message, {
//     cascade: true,
//   }) // config cascade if you want automatic handling
//   recievers: Reciever[];

//   // برای ایجاد رکوردهای Reciever از طریق Message
//   setRecievers(ids: number[]): void {
//     this.receivers = ids.map((id) => {
//       const reciever = new Reciever();
//       reciever.recieverId = id;
//       reciever.message = this; // ارتباط دوطرفه
//       return reciever;
//     });
//   }
// }

// @Entity("message_receivers")
// export class MessageReceivers extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   messageId: number; // Foreign key to Messages

//   @Column()
//   receiverId: number; // Receiver user ID
// }
