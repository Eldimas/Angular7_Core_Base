import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  }) 
export class AdminUserService {}
