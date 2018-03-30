import { AppConfigService } from './app-config.service';

export function sharedServicesForRoot() {
  return [AppConfigService];
}
