import { Column, PrimaryGeneratedColumn, Generated, PrimaryColumn } from 'typeorm';
import { PKT } from './types';
import { Audit } from './columns';

export class BaseRecord {
  @PrimaryGeneratedColumn('uuid')
  id: PKT;

  @Column(type => Audit)
  audit: Audit;
}
