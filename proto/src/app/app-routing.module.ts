import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
{
    path: 'home',
    loadChildren: () => import('./home/home.module').then( (m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then((m) => m.RegistroPageModule),
  },
  {
    path: 'taller',
    loadChildren: () => import('./taller/taller.module').then( (m) => m.TallerPageModule),
  },  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
