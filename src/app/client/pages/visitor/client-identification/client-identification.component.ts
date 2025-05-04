import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthLoginRequest, loginRequest } from 'src/app/shared/ngrx/auth/login/login.actions';
import { interval, tap } from 'rxjs';
import { selectLoginState } from 'src/app/shared/ngrx/auth/login/login.selectors';

@Component({
  selector: 'app-client-identification',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-identification.component.html',
  standalone: true,
  styleUrls: ['./client-identification.component.scss']
})



export class ClientIdentificationComponent implements OnInit {
  authForm: FormGroup;
  isSignUp = false;
  private store = inject(Store);

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }
  ngOnInit(): void {
    if (!this.isSignUp) {
      this.authForm.removeControl('confirmPassword');
      this.authForm.clearValidators();
      this.authForm.updateValueAndValidity();
    }
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;

    if (this.isSignUp) {
      this.authForm.addControl('confirmPassword', this.fb.control('', Validators.required));

      this.authForm.setValidators(this.passwordMatchValidatorFactory());
    } else {
      this.authForm.clearValidators();

      this.authForm.removeControl('confirmPassword');
    }

    this.authForm.updateValueAndValidity();
  }


  // Custom validator to check if confirmPassword matches password
passwordMatchValidatorFactory(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}


  onSubmit() {
    if (this.authForm.valid) {
      if (this.isSignUp) {
        // Handle sign up logic
        console.log('Sign Up', this.authForm.value);
      } else {
        // Handle sign in logic
        console.log('Sign In', this.authForm.value);
        let credentials: AuthLoginRequest = { username: '', password: '' };
        credentials.username = this.authForm.get('username')?.value || '';
        credentials.password = this.authForm.get('password')?.value || '';
        this.store.dispatch(loginRequest({credentials}))
      }
    }
  }
}
