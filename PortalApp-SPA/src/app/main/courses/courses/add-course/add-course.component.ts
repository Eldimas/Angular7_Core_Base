import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  // description: string;
  //   iconUrl: string;
  //   courseListIcon: string;
  //   longDescription: string;
  //   category: string;
  //   lessonsCount: number;
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup(
      {
        description: new FormControl(''),
        iconUrl: new FormControl(''),
        courseListIcon: new FormControl(''),
        longDescription: new FormControl(''),
        category: new FormControl(''),
        lessonsCount: new FormControl(0)
      }
    );
  }

}
