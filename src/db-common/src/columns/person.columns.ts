import { Entity, Column } from 'typeorm';
import { Address } from './address.columns';

export function Personed<T extends new (...args: any[]) => any>(Base: T) {
  class _Personed extends Base {
    @Column('text', { nullable: true, default: null })
    title: string | null = null;

    @Column('text', { nullable: true, default: null })
    firstName: string | null = null;

    @Column('text', { nullable: true, default: null })
    middleName: string | null = null;

    @Column('text', { nullable: true, default: null })
    lastName: string | null = null;

    @Column('text', { nullable: true, default: null })
    suffix: string | null = null;

    @Column('text', { nullable: true, default: null })
    gender: string | null = null;

    @Column('text', { nullable: true, default: null })
    birthDate: Date | null = null;

    @Column('text', { nullable: true, default: null })
    socialSecurityNumber: string | null = null;

    @Column('text', { nullable: true, default: null })
    maritalStatus: string | null = null;

    @Column('text', { nullable: true, default: null })
    homePhoneNumber: string | null = null;

    @Column('text', { nullable: true, default: null })
    workPhoneNumber: string | null = null;

    @Column('text', { nullable: true, default: null })
    email: string | null = null;

    @Column(type => Address)
    address: Address;
  }
  return _Personed;
}

export class Person extends Personed(Object) {}
