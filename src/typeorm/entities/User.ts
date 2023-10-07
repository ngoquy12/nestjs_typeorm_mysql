import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './Profile';
import { Post } from './Post';

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

  @OneToOne(() => Profile) // Định nghĩa mối quan hệ 1 - 1
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user) // Định nghĩa mối quan hệ 1 - n
  posts: Post[];
}
