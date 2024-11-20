// import {
//   Table,
//   Column,
//   Model,
//   PrimaryKey,
//   AutoIncrement,
//   DataType,
// } from "sequelize-typescript";

// @Table({ tableName: "message" })
// export class Message extends Model {
//   @PrimaryKey
//   @AutoIncrement
//   @Column(DataType.INTEGER)
//   id!: number;

//   @Column(DataType.STRING)
//   title!: string;

//   @Column(DataType.STRING) // Adjust data type if necessary, e.g., DataType.INTEGER
//   userId!: string; // or DataType.INTEGER if it's a number

//   @Column(DataType.STRING)
//   userName!: string;

//   @Column(DataType.ARRAY(DataType.INTEGER)) // or a string if you're storing it differently
//   recieverId!: number[]; // Change if it should be a different type

//   @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
//   })
//   time: Date;
// }

// async () => {
//   await Message.sync();
// };
