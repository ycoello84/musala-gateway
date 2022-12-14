import { Route } from "@angular/router";
import { AddgatewayComponent } from "./components/addgateway/addgateway.component";
import { HomeComponent } from "./components/home/home.component";

export const routes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },{
        path: 'add-gateway',
        loadComponent:() => import('./components/addgateway/addgateway.component').then( c=>c.AddgatewayComponent)
    }
]