import { Component, OnInit } from '@angular/core';
import { Observable, noop } from 'rxjs';

import { Environment } from 'prismjs';
import { environment } from 'environments/environment';
import { createHttpObservable } from 'app/utils/util';
import { map, filter, shareReplay, tap } from 'rxjs/operators';
import { Course } from 'app/_models/course';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    baseUrl = environment.apiUrl + 'course/';
    courses: [];

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {}

    ngOnInit(): void {


        const http$: Observable<Course[]>  = createHttpObservable(this.baseUrl + 'getAllCourses');

        const courses$: Observable<Course[]> = http$.pipe(
          tap(() => console.log('HTTP request executed')),
          map(res => Object.values(res)),
          shareReplay()
        );

        courses$.subscribe();
        
        this.beginnerCourses$ = courses$
        .pipe(
          map(courses => courses.filter(course => course.category === 'BEGINNER'))
        );

        this.advancedCourses$ = courses$
        .pipe(
          map(courses => courses.filter(course => course.category === 'ADVANCED'))
        );

        // courses$.subscribe(
        //     courses => {
        //         this.courses = courses;
        //         this.beginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        //         this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
        //     },
        //     noop,
        //     () => console.log('completed')
        // );
    }
}
