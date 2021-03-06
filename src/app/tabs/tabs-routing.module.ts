
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children:
            [
                {
                    path: 'home',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: () =>
                                    import('../home/home.module').then(m => m.HomePageModule)
                            }
                        ]
                },
                {
                    path: 'comanda',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: () =>
                                    import('../comanda/comanda.module').then(m => m.ComandaPageModule)
                            }
                        ]
                },
                {
                    path: 'account',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: () =>
                                    import('../account/account.module').then(m => m.AccountPageModule)
                            }
                        ]
                },
                {
                    path: '',
                    redirectTo: '/tabs/home',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
    },
    {
        path: 'comanda',
        redirectTo: '/tabs/comanda',
        pathMatch: 'full'
    },
    {
        path: 'account',
        redirectTo: 'tabs/account',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule { }