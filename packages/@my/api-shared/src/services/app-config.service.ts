import { Component, Inject } from '@nestjs/common';
import { IConfig } from 'config';

@Component()
export class AppConfigService {

  appName = this.config.get<string>("appName");
  appDescription = this.config.get<string>("appDescription");
  appVersion = this.config.get<string>("appVersion");
  port = +this.config.get<number>("port");

  constructor(@Inject('ConfigToken') protected config: IConfig) {
  }

}
