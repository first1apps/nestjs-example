import { Component, Inject } from '@nestjs/common';
import { IConfig } from 'config';

@Component()
export class AppConfigService {
  appName = this.config.get<string>('appName');
  appDescription = this.config.get<string>('appDescription');
  appVersion = this.config.get<string>('appVersion');
  port = +this.config.get<number | string>('port');
  jwtSecret = this.config.get<string>('jwtSecret');
  defaultSessionExpiresIn = +this.config.get<number | string>('defaultSessionExpiresIn');
  allowDbStructureSync = this.config.has('allowDbStructureSync') && this.config.get<boolean>('allowDbStructureSync') === true;

  dbConnection = {
    host: this.config.get<string>('dbConnection.host'),
    port: +this.config.get<number | string>('dbConnection.port'),
    user: this.config.get<string>('dbConnection.user'),
    password: this.config.get<string>('dbConnection.password'),
    database: this.config.get<string>('dbConnection.database'),
    ssl: notFalsey(this.config.get<any>('dbConnection.ssl')),
  };

  constructor(@Inject('ConfigToken') protected config: IConfig) {}
}

function notFalsey(v: any): boolean {
  if (v == null) return true;
  const vType = typeof v;
  if (vType === 'boolean') return v;
  if (vType === 'string') {
    const r = v !== false && !v.match(/^\s*(false|no|off)\s*$/i);
    return r;
  } else {
    throw new Error(`notFalsey: unexpected value. ${v}`);
  }
}
