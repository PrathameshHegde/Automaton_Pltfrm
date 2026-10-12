
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  passwordVisible = false;
  isLoading = false;
  message = '';

  email = '';
  password = '';

  rememberMe = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  preventSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }

  onLogin(event: SubmitEvent): void {
    event.preventDefault();

    this.message = '';

    const form = event.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.isLoading = true;

    this.authService.login({
      email: this.email,
      password: this.password
    })
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
    .subscribe({
      next: () => {
        this.message = 'Login successful!';

        // Add dashboard navigation after authentication
        // and session management are implemented.
      },
      error: (error) => {
        if (error.status === 401) {
          this.message = 'Invalid email or password.';
        } else {
          this.message =
            'Unable to log in. Please try again.';
        }
      }
    });
  }
}
