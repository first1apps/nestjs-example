import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from './services';
import * as config from 'config';

const configProvider = { provide: 'ConfigToken', useValue: config };
const jwtSecretProvider = {
  provide: 'JwtSecretToken',
  useFactory: (appConfig: AppConfigService) => {
    return appConfig.jwtSecret;
  },
  inject: [AppConfigService],
};

@Module({
  components: [AppConfigService, configProvider, jwtSecretProvider],
  exports: [AppConfigService, jwtSecretProvider],
})
export class ApiSharedModule {}
