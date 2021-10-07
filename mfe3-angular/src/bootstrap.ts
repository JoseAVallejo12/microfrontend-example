import { bootstrap } from '@angular-architects/module-federation-tools';
import { AppModule } from './app/app.module';
import { MfeFormModule } from './app/components/mfe-form/mfe-form.module';
import { environment } from './environments/environment.prod';

bootstrap(MfeFormModule, {
  production: environment.production
});


