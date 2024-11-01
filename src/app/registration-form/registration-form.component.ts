import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/validators/password-match.validator';
import { uniqueUsernameValidator } from '../shared/validators/unique-username.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
          [uniqueUsernameValidator()],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
        age: [
          '',
          [Validators.required, Validators.min(18), Validators.max(65)],
        ],
        address: this.fb.group({
          street: [''],
          city: ['', Validators.required],
          zip: ['', [Validators.required, Validators.minLength(5)]],
        }),
        phones: this.fb.array([]),
      },
      {
        validators: passwordMatchValidator,
      }
    );
  }

  get phones(): FormArray {
    return this.registrationForm.get('phones') as FormArray;
  }

  addPhone() {
    const phoneControl = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^\+49\s?(\d{1,4})\s?(\d{3,10})$/),
    ]);
    this.phones.push(phoneControl);
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}
