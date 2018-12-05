import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { AdminUserService } from './admin-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class AdminUserComponent implements OnInit, OnDestroy {

  user: any;
  productForm: FormGroup;
  pageType: string;
   // Private
   private _unsubscribeAll: Subject<any>;
   
  constructor(
    private _adminUserService: AdminUserService
    ) { 
      this._unsubscribeAll = new Subject();
    }

  ngOnInit(): void {
    this._adminUserService.onProductChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(user => {
        if ( user) {
          console.log(user);
          
          this.user = user;
        }
        else  {
          console.log('some error');
          
        }

        // this.productForm = this.createProductForm();
      });
  }

  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
