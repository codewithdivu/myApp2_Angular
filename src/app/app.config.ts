import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { myInterceptorInterceptor } from './Interceptor/my-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([myInterceptorInterceptor])),
    provideAnimationsAsync(),
    provideHotToastConfig({
      position: 'top-right',
    }),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'square-jelly-box' })),
  ],
};
