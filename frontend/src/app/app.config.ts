import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideRouter } from '@angular/router';

import {
  provideAuth,
  authInterceptor
} from 'angular-auth-oidc-client';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    // Permite que Angular agregue automáticamente
    // el JWT de Cognito a las peticiones protegidas
    provideHttpClient(
      withInterceptors([
        authInterceptor()
      ])
    ),

    provideAuth({
      config: {

        // Cognito
        authority:
          'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_kvyppdpRt',

        // URL donde Cognito devuelve al usuario
        redirectUrl:
          'http://localhost:4200/',

        // URL después de cerrar sesión
        postLogoutRedirectUri:
          'http://localhost:4200/',

        // Cliente Angular
        clientId:
          '5dod8t29e2skq7s04u0v6m8j43',

        // Permisos OIDC
        scope:
          'openid email phone',

        // Authorization Code Flow
        responseType:
          'code',

        // API Gateway protegida
        secureRoutes: [
          'https://7ayp94w3m5.execute-api.us-east-1.amazonaws.com/api/'
        ]
      }
    })
  ]
};