import { Routes } from '@angular/router';
import { PostsDetailComponent } from './pages/post-detail/posts-detail.component';
import { PostsCreateComponent } from './pages/posts-create/posts-create.component';
import { PostsOverviewComponent } from './pages/posts-overview/posts-overview.component';
import { PostsUpdateComponent } from './pages/posts-update/posts-update.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsOverviewComponent,
  },
  {
    path: 'create',
    component: PostsCreateComponent,
  },
  {
    path: ':postId',
    component: PostsDetailComponent,
  },
  {
    path: ':postId/update',
    component: PostsUpdateComponent,
  },
];
