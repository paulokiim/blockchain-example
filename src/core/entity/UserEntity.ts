import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @Column({ name: 'username', nullable: false })
  username!: string;

  @Column({ name: 'password', nullable: false })
  password!: string;

  @Column({ name: 'email', nullable: false })
  email!: string;

  @Column({ name: 'phone_number', nullable: false })
  phoneNumber!: string;
}
