import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  passwordVisible = false;

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  preventSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }
}
