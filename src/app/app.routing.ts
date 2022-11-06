import { Route } from '@angular/router';
import { AddgatewayComponent } from './components/addgateway/addgateway.component';
import { HomeComponent } from './components/home/home.component';
import { ListGatewayComponent } from './components/list-gateway/list-gateway.component';
import { EditGatewayComponent } from './components/edit-gateway/edit-gateway.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'add-gateway',
    loadComponent: () =>
      import('./components/addgateway/addgateway.component').then(
        (c) => c.AddgatewayComponent
      ),
  },
  {
    path: 'list-gateway',
    loadComponent: () =>
      import('./components/list-gateway/list-gateway.component').then(
        (c) => c.ListGatewayComponent
      ),
  },
  {
    path: 'edit-gateway',
    loadComponent: () =>
      import('./components/edit-gateway/edit-gateway.component').then(
        (c) => c.EditGatewayComponent
      ),
  },
  {
    path: 'details-gateway/:id',
    loadComponent: () =>
      import('./components/details-gateway/details-gateway.component').then(
        (c) => c.DetailsGatewayComponent
      ),
  },
];
