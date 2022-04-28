import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ name: 'uid', nullable: false })
  uid!: string;

  @Column({ name: 'username', nullable: false })
  username!: string;

  @Column({ name: 'password', nullable: false })
  password!: string;

  @Column({ name: 'email', nullable: false })
  email!: string;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber!: string;
}
