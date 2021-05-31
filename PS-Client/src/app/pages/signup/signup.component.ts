import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    passwordConfirm: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {

  }
}
