import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  errors: string[];
  continue: boolean;

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
  });

  constructor(private auth: AuthService,
              private platformLocation: PlatformLocation,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.continue = Boolean(this.route.snapshot.paramMap.get('continue'));
  }

  submit(): void {
    if (this.form.valid) {
      const user = new User();
      user.username = this.form.get('login')?.value;
      user.password = this.form.get('password')?.value;
      this.auth.login(user).subscribe(response => {
        this.router.navigate(['/dashboard']);
      }, error => {
        this.errors = [];
        Object.keys(error.error).forEach(p => {
          this.errors.push(error.error[p]);
        });
      });
    }
  }

  signByGoogle(): void {
    this.auth.loginByGoogle();
  }

  signByFacebook(): void {
    this.auth.loginByFacebook();
  }

  signUp(): void {
    this.router.navigate(['/signup']);
  }
}

