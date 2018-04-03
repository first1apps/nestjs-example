import { Entity, Column } from 'typeorm';

export class Address {
  @Column('text', { nullable: true, default: null })
  title: string | null = null;

  @Column('text', { nullable: true, default: null })
  street1: string | null = null;

  @Column('text', { nullable: true, default: null })
  street2: string | null = null;

  @Column('text', { nullable: true, default: null })
  city: string | null = null;

  @Column('text', { nullable: true, default: null })
  state: string | null = null;

  @Column('text', { nullable: true, default: null })
  postalCode: string | null = null;

  @Column('text', { nullable: true, default: null })
  country: string | null = null;
}
