import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errors: string[];

  form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    confirm: new FormControl('', null),
  });

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(field => {
      if (field.password !== field.confirm) {
        this.form.get('confirm').setErrors({mismatch: true});
      } else {
        this.form.get('confirm').setErrors(null);
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      const user = new User();
      user.username = this.form.get('login')?.value;
      user.password = this.form.get('password')?.value;
      user.email = this.form.get('email')?.value;
      user.first_name = this.form.get('firstName')?.value;
      user.last_name = this.form.get('lastName')?.value;
      this.userService.createUser(user).subscribe(response => {
        this.router.navigate(['/auth']);
      }, error => {
        this.errors = [];
        Object.keys(error.error).forEach(p => {
          this.errors.push(error.error[p][0]);
        });
      });
    }
  }
}
