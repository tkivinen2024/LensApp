import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'flash-messages-angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

import { User } from '../../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };

  constructor(
    private flashMessagesService: FlashMessagesService,
    private validateService: ValidateService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  private showFlashMessageAlert(text: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.flashMessagesService.show(text, {
      cssClass: 'alert-danger',
      timeout: 3000,
    });
  }

  private showFlashMessageSuccess(text: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.flashMessagesService.show(text, {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }

  onLoginSubmit(): void {
    if (!this.validateService.validateCredentials(this.user)) {
      this.showFlashMessageAlert('Username or password is empty');
      return;
    }

    const onError = (err: any): void => {
      this.showFlashMessageAlert('Wrong username or password');
    };

    const onSuccess = (value: any): void => {
      this.showFlashMessageSuccess('You are now logged in!');
      this.authService.storeAuthenticatedUser(value.user, value.token);
      this.router.navigate(['/']);
    };

    this.apiService.authenticate(this.user).subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
