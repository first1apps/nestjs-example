import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn() id: number;

  @Column('int4', { nullable: false })
  userId: number;

  @Column('boolean', { nullable: false })
  isValid: boolean = false;

  @Column('int4', { nullable: false })
  lifeSpanMinutes: number = 0;

  @Column('int4', { nullable: false })
  hits: number = 0;

  @Column('timestamptz', { nullable: false })
  createdAt: Date;

  @Column('timestamptz', { nullable: false })
  lastTouch: Date;

  @Column('timestamptz', { nullable: false })
  expiresAt: Date;

  @Column('timestamptz', { nullable: true })
  hardExpirationDate: Date | null;
}
