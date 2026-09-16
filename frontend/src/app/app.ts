import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private readonly oidcSecurityService =
    inject(OidcSecurityService);

  private readonly router =
    inject(Router);

  isAuthenticated = false;

  isHomePage = true;

  userData$ =
    this.oidcSecurityService.userData$;

  roles: string[] = [];


  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(event =>
          event instanceof NavigationEnd
        )
      )
      .subscribe(event => {

        const navigation =
          event as NavigationEnd;

        this.isHomePage =
          navigation.urlAfterRedirects === '/';

      });


    this.oidcSecurityService
      .checkAuth()
      .subscribe({

        next: ({ isAuthenticated }) => {

          this.isAuthenticated =
            isAuthenticated;

          console.log(
            'Authenticated:',
            isAuthenticated
          );


          if (isAuthenticated) {

            this.obtenerRoles();

          }

        },

        error: (error) => {

          console.error(
            'Error al comprobar autenticación:',
            error
          );

          this.isAuthenticated = false;

        }

      });

  }


  private obtenerRoles(): void {

    this.oidcSecurityService
      .getPayloadFromIdToken()
      .subscribe({

        next: (payload: any) => {

          console.log(
            'Payload del ID Token:',
            payload
          );


          const grupos =
            payload?.['cognito:groups'];


          this.roles =
            Array.isArray(grupos)
              ? grupos
              : [];


          console.log(
            'Roles del usuario:',
            this.roles
          );


          /*
           * REDIRECCIÓN SEGÚN ROL
           */

          if (this.roles.includes('admin')) {

            console.log(
              'Redirigiendo a panel ADMIN'
            );

            this.router.navigateByUrl('/admin');

            return;

          }


          if (this.roles.includes('Colaborador')) {

            console.log(
              'Redirigiendo a panel COLABORADOR'
            );

            this.router.navigateByUrl('/colaborador');

            return;

          }


          if (this.roles.includes('Cliente')) {

            console.log(
              'Redirigiendo a panel CLIENTE'
            );

            this.router.navigateByUrl('/cliente');

            return;

          }


          console.warn(
            'El usuario no tiene un rol válido:',
            this.roles
          );

        },

        error: (error) => {

          console.error(
            'No fue posible obtener los roles:',
            error
          );

          this.roles = [];

        }

      });

  }


  login(): void {

    console.log(
      'Iniciando sesión con Cognito...'
    );

    this.oidcSecurityService.authorize();

  }


  logout(): void {

    this.oidcSecurityService
      .logoff()
      .subscribe({

        next: () => {

          this.isAuthenticated = false;

          this.roles = [];

          this.router.navigateByUrl('/');

        },

        error: (error) => {

          console.error(
            'Error al cerrar sesión:',
            error
          );

        }

      });

  }


  irAPedidos(): void {

    this.router.navigateByUrl('/pedidos');

  }


  irAProductos(): void {

    this.router.navigateByUrl('/productos');

  }


  tieneRol(rol: string): boolean {

    return this.roles.includes(rol);

  }

}