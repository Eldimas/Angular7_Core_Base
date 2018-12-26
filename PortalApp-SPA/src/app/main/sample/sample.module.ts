import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { NavtreeComponent } from './navtree/navtree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { Navtree01Component } from './navtree01/navtree01.component';
import { Navtree02Component } from './navtree02/navtree02.component';

const routes = [
    {
        path     : 'sample',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent,
        NavtreeComponent,
        Navtree01Component,
        Navtree02Component
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MatTreeModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule
    ],
    exports     : [
        SampleComponent,
        MatTreeModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule
    ]
})

export class SampleModule
{
}
