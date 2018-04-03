import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Personed, Audit, BaseRecord } from '@my/db-common';
import { Coverage } from './coverage.entity';

@Entity({ schema: 'patient' })
export class Patient extends Personed(BaseRecord) {
  @PrimaryGeneratedColumn() id: number;

  @Column(type => Audit)
  audit: Audit;

  @OneToMany(type => Coverage, coverage => coverage.patient)
  coverages: Coverage[];
}
