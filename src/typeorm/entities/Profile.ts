import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryColumn()
  ProfileId: string;

  @Column({ type: 'varchar', length: 50 })
  FirstName: string;

  @Column({ type: 'varchar', length: 50 })
  LastName: string;

  @Column({ type: 'varchar', length: 255 })
  Address: string;
}
