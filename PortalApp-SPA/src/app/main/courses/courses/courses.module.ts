import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTabsModule } from '@angular/material';

const routes = [
  { path: 'courses', component: CoursesComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,

        MatTabsModule
  ],
  declarations: [CoursesComponent],
  exports: [
    CoursesComponent,

    MatTabsModule
  ]
})
export class CoursesModule { }
