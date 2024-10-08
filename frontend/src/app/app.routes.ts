import { Routes } from '@angular/router';
import { HomeComponent } from './_core/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.routes').then(m => m.routes),
  },
];
