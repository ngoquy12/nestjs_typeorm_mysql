import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'post' })
export class Post {
  @PrimaryColumn({ type: 'char', length: 36 })
  PostId: string;

  @Column({ type: 'varchar', length: 100 })
  Title: string;

  @Column({ type: 'text' })
  Content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
