import { Component } from '@nestjs/common';
import { Connection } from 'typeorm';

@Component()
export class DbService {
  constructor(public connection: Connection) {}
}
