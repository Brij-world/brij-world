import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { AccountService } from '../account.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  public formData: FormGroup;
  public loader: boolean = false;
  public timeLeft = 60;
  private sub: Subscription;
  otpData = JSON.parse(localStorage.getItem('otp'));

  constructor(private accountService: AccountService, private fb: FormBuilder,
    private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {

    this.sub = timer(1000, 1000).subscribe((res) => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 1;
      }
    });

    this.formData = this.fb.group({
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
    })
  }

  get f() { return this.formData.controls; }

  verifyOTP() {
    if (this.otpData.otp.toString() !== this.formData.value.otp) {
      return this.notifyService.error("Invalid OTP");
    }
    this.loader = true;
    this.accountService.validateOtp(this.otpData.otp, this.otpData.email)
      .subscribe((response: any) => {
        this.loader = false;
        localStorage.removeItem('otp');
        this.router.navigateByUrl('account/login');
      }, (error: any) => {
        this.loader = false;
        this.notifyService.error(error.error);
      })
  }

  resendOTP() {
    if (this.otpData.email !== undefined) {
      this.accountService.resendOtp(this.otpData.email).subscribe((response: any) => {
        localStorage.setItem('otp', JSON.stringify(response));
        this.notifyService.success(response.message)
      }, error => {
        this.notifyService.error(error.error);
      })
    }
  }

}
