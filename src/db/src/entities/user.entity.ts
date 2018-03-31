import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column('text', { nullable: false })
  username: string = '';

  @Column('text', { nullable: false })
  firstName: string = '';

  @Column('text', { nullable: false })
  middleName: string = '';

  @Column('text', { nullable: false })
  lastName: string = '';

  @Column('timestamptz', { nullable: true })
  dateOfBirth: Date | null = null;

  @Column('text', { nullable: true })
  gender: string | null = null;
}
