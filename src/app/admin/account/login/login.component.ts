import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { ILogin } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formData: FormGroup;
  public loader: boolean = false;
  private model: ILogin;

  constructor(private accountService: AccountService, private fb: FormBuilder,
    private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  get f() { return this.formData.controls; }

  onSubmit() {
    this.loader = true;
    this.model = Object.assign({}, this.formData.value);
    this.accountService.login(this.model).subscribe(() => {
      this.loader = false;
      this.router.navigateByUrl('/dashboard');
    }, (error: any) => {
      this.loader = false;
      if (error.statusText === "Unknown Error") {
        return this.notifyService.warn("Check your internet connection and retry.");
      }
      this.notifyService.error(error.error);
    })
  }

}
