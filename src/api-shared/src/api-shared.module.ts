import { Module, DynamicModule } from '@nestjs/common';
import { AppConfigService } from './services';
import * as config from 'config';

const configProvider = { provide: "ConfigToken", useValue: config };
const jwtSecretProvider = { provide: "JwtSecretToken", useValue: "asdfasdfafasasdf" };

@Module({
    components: [AppConfigService, configProvider, jwtSecretProvider],
    exports: [AppConfigService, jwtSecretProvider],
})
export class ApiSharedModule {
}
