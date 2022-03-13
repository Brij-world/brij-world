import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, ReplaySubject } from 'rxjs';
import { IChangePassword, ILogin, IRegister, IUser } from './account.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.baseUrl}account`
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private router: Router) { }

  public loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  public login(model: ILogin) {
    return this.http.post(`${this.apiUrl}/login`, model).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  public register(model: IRegister) {
    return this.http.post(`${this.apiUrl}/register`, model)
  }

  public forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgotpassword`, { email })
  }

  public changePassword(model: IChangePassword) {
    return this.http.post<any>(`${this.apiUrl}/changepassword`, model)
  }

  public validateOtp(otp: string, email: string) {
    return this.http.post(`${this.apiUrl}/validateotp`, { otp, email })
  }

  public resendOtp(email: string) {
    return this.http.post(`${this.apiUrl}/resendotp`, { email })
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('account/login');
  }


}
