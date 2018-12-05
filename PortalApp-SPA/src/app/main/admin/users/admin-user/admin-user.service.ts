import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AdminUserService implements Resolve<any> {
  baseUrl = environment.apiUrl + 'users/';
    routeParams: any;
    user: any;
    onProductChanged: BehaviorSubject<any>;

    /**
     *
     */
    constructor(private _httpClient: HttpClient) {
        this.onProductChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([this.getProduct()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                this._httpClient.get(this.baseUrl +  this.routeParams.id)
                    .subscribe((response: any) => {
                        this.user = response;
                        
                        this.onProductChanged.next(this.user);
                        resolve(response);
                    }, reject);
            }
        });
    }
}
