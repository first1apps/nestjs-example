import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from './services';
import { IConfig } from 'config';

@Module({})
export class ApiSharedModule {
  static rootProviders(config: IConfig): any[] {
    const rootProviders = [
      AppConfigService,
      { provide: 'ConfigToken', useValue: config },
    ];
    return rootProviders;
  }
}
