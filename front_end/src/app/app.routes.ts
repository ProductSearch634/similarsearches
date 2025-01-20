import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path:'',
        component: MainLayoutComponent,
        children: [
            {
                path:'',
                redirectTo: 'search',
                pathMatch: 'full'
            },
            {
                path:'search',
                loadComponent: ()=>import('./home/search/search.component').then(c=>c.SearchComponent)
            },
            {
                path:'result',
                loadComponent: ()=>import('./home/search-result/search-result.component').then(c=>c.SearchResultComponent)
            },
            {
                path:'how-it-works',
                loadComponent: ()=>import('./home/how-it-works/how-it-works.component').then(c=>c.HowItWorksComponent)
            }
        ]
    }
];
