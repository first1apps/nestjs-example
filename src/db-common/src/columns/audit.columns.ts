import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Audit {
  @Column('int4', { nullable: true })
  createdBy: number | null = null;

  @Column('timestamptz', { nullable: true })
  createdAt: Date | null = null;

  @Column('int4', { nullable: true })
  modifiedBy: number | null = null;

  @Column('timestamptz', { nullable: true })
  modifiedAt: Date | null = null;
}
