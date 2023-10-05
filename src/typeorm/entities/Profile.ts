import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryColumn({ type: 'char', length: 36 })
  ProfileId: string;

  @Column({ type: 'varchar', length: 100 })
  FirstName: string;

  @Column({ type: 'varchar', length: 100 })
  LastName: string;

  @Column({ type: 'date' })
  DateOfBirth: Date;

  @Column({ type: 'tinyint' })
  Gender: number;
}
