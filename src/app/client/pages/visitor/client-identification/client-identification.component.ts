import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-identification',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-identification.component.html',
  styleUrls: ['./client-identification.component.scss']
})
export class ClientIdentificationComponent {
  authForm: FormGroup;
  isSignUp = false;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
    if (!this.isSignUp) {
      this.authForm.get('confirmPassword')?.reset();
    }
  }

  onSubmit() {
    if (this.authForm.valid) {
      if (this.isSignUp) {
        // Handle sign up logic
        console.log('Sign Up', this.authForm.value);
      } else {
        // Handle sign in logic
        console.log('Sign In', this.authForm.value);
      }
    }
  }
}