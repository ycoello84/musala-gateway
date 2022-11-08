import { Route } from '@angular/router';
import { AddgatewayComponent } from './components/addgateway/addgateway.component';
import { HomeComponent } from './components/home/home.component';
import { ListGatewayComponent } from './components/list-gateway/list-gateway.component';
import { EditGatewayComponent } from './components/edit-gateway/edit-gateway.component';
import { AddDeviceComponent } from '../../musala-gateway/src/app/components/add-device/add-device.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { EditDeviceComponent } from './components/edit-device/edit-device.component';

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
    path: 'add-device',
    loadComponent: () =>
      import('./components/add-device/add-device.component').then(
        (c) => c.AddDeviceComponent
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
    path: 'list-device',
    loadComponent: () =>
      import('./components/device-list/device-list.component').then(
        (c) => c.DeviceListComponent
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
    path: 'edit-device',
    loadComponent: () =>
      import('./components/edit-device/edit-device.component').then(
        (c) => c.EditDeviceComponent
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
