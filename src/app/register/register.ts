import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  passwordVisible = false;

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    input.type = this.passwordVisible ? 'text' : 'password';
  }

  preventSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }
}
