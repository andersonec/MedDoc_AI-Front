import { loadEnvironment } from './environment-loader'
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const envVariables = loadEnvironment();
Object.assign(environment, envVariables);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
.bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
