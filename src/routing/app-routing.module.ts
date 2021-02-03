import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundModule } from 'src/page-not-found/page-not-found.module';
import { RegistrationPageComponent } from 'src/registration/registration-page/registration-page.component';
import { RegistrationModule } from 'src/registration/registration.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found/page-not-found.component';

export enum RoutePaths {
  ROOT = '',
  PAGE_NOT_FOUND = 'page-not-found'
}

const routes: Routes = [
  {
    path: RoutePaths.ROOT,
    component: RegistrationPageComponent
  },
  {
    path: RoutePaths.PAGE_NOT_FOUND,
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: RoutePaths.PAGE_NOT_FOUND,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    RegistrationModule,
    PageNotFoundModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
