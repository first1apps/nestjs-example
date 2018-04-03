import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseRecord, Person, Address } from '@my/db-common';
import { Patient } from './patient.entity';

@Entity({ schema: 'patient' })
export class Coverage extends BaseRecord {
  @ManyToOne(type => Patient, patient => patient.coverages)
  patient: Patient;

  @Column('boolean') active: Boolean;

  @Column('text', { nullable: true })
  memberIdNumber: string | null = null;

  @Column('text', { nullable: true })
  groupIdNumber: string | null = null;

  @Column('text', { nullable: true })
  relationship: string | null = null;

  @Column(type => Person)
  subscriber: Person;

  @Column('text', { nullable: true })
  organizationName: string;

  @Column(type => Address)
  organizationAddress: Address;
}
