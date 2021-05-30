import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {PlatformLocation} from '@angular/common';
import {AuthObject} from '../../shared/models/authObject';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
  });

  constructor(private auth: AuthService,
              private platformLocation: PlatformLocation,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const authObject = new AuthObject();
    authObject.state = this.route.snapshot.queryParamMap.get('state');
    authObject.code = this.route.snapshot.queryParamMap.get('code').replace('/', '%2F');
    console.log(authObject.code.replace('/', '%2F'));
    console.log(authObject.state);
    if (authObject.state && authObject.code) {
      this.auth.getGoogleJWT(authObject).subscribe(response => {
        console.log(response);
      });
    }

  }

  submit(): void {

  }

  signByGoogle(): void {
    this.auth.makeAuthRequest(this.platformLocation.href).subscribe(response => {
      window.location.href = response?.authorization_url;
    });
  }

  signByFacebook(): void {

  }

  signUp(): void {

  }
}
