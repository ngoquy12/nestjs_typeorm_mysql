import { Column, Entity, PrimaryColumn } from 'typeorm';

// Tên bảng
@Entity({ name: 'users' })
export class User {
  // Định nghĩa các trường có trong bảng
  @PrimaryColumn({ type: 'char', length: 36 })
  UserId: string;

  @Column({ type: 'varchar', length: 100 })
  UserName: string;

  @Column({ type: 'varchar', length: 100 })
  Email: string;

  @Column({ type: 'varchar', length: 100 })
  Password: string;

  @Column({ nullable: true, type: 'date' })
  CreatedDate: Date;
}
