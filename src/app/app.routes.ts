import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './component/libro/libro.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Página principal',
      },
      {
        path: 'libro',
        component: LibroComponent,
        title: 'Soy Producto',
      },
            {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
];
