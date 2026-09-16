import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterOutlet,
  NavigationEnd
} from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);

  isAuthenticated = false;
  isHomePage = true;

  userData$ = this.oidcSecurityService.userData$;

  // Grupos / roles del usuario
  roles: string[] = [];

  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {

        const navigation = event as NavigationEnd;

        this.isHomePage =
          navigation.urlAfterRedirects === '/';

      });

    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated }) => {

        this.isAuthenticated = isAuthenticated;

        console.log(
          'Authenticated:',
          isAuthenticated
        );

        if (isAuthenticated) {

          this.obtenerRoles();

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

    const url =
      this.oidcSecurityService.getAuthorizeUrl();

    console.log(
      'URL DE COGNITO:',
      url
    );

    this.oidcSecurityService.authorize();

  }

  logout(): void {

    this.oidcSecurityService
      .logoff()
      .subscribe();

  }

  irAPedidos(): void {

    this.router.navigate(['/pedidos']);

  }

  irAProductos(): void {

    this.router.navigate(['/productos']);

  }

  tieneRol(rol: string): boolean {

    return this.roles.includes(rol);

  }

}