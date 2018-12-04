import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import {
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatSelectModule,
    MatSortModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { AdminUsersService } from './admin-users/admin-users.service';

const routes: Routes = [
    {
        path: 'admin-users',
        component: AdminUsersComponent,
        resolve  : {
          data: AdminUsersService
      }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        FuseSharedModule,
        FuseWidgetModule
    ],
    declarations: [AdminUsersComponent]
})
export class AdminUsersModule {}
