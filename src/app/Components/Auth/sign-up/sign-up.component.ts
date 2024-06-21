import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATH_AUTH } from '../../../Constants/path';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, SpinnerLoadingComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm: FormGroup;
  private toastService = inject(HotToastService);

  validationMessages = {
    username: {
      require: 'Username is required',
    },
    name: {
      require: 'Name is required',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.',
    },
    password: {
      required: 'Password is required.',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    // creating singup form
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.spinner.show();
      const signUpData = this.signupForm.value;
      setTimeout(() => {
        this.http
          .post('http://localhost:8888/api/v1/auth/register', {
            ...signUpData,
          })
          .subscribe(
            (res: any) => {
              if (res.success) {
                this.toastService.success(res.msg);
                this.spinner.hide();
                this.router.navigate([PATH_AUTH.signin]);
              } else {
                this.toastService.error(res.msg);
                this.spinner.hide();
              }
            },
            (error: HttpErrorResponse) => {
              this.toastService.error(error.error.msg);
              console.log('error', error);
              this.spinner.hide();
            }
          );
      }, 2000);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
