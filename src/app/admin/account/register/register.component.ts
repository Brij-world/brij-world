import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { IRegister } from '../account.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formData: FormGroup;
  public loader: boolean = false;
  private model: IRegister;

  constructor(private accountService: AccountService, private fb: FormBuilder,
    private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(
        '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})')])],
      referralCode: [''],
    })
  }

  get f() { return this.formData.controls; }

  onSubmit() {
    this.loader = true;
    this.model = Object.assign({}, this.formData.value);
    this.accountService.register(this.model).subscribe((response: any) => {
      this.loader = false;
      localStorage.setItem('otp', JSON.stringify(response));
      this.router.navigateByUrl('/account/email-verification');
    }, (error: any) => {
      this.loader = false;
      this.notifyService.error(error.error);
    })
  }

}
