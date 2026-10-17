import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';
import {RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [RouterLink],

})
export class Dashboard implements OnInit {
  userEmail = '';
  isLoggingOut = false;
  notice = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (user) => {
        this.userEmail = user.email;
      },
      error: () => {
        this.router.navigateByUrl('/login');
      }
    });
  }

  get userInitial(): string {
    return this.userEmail
      ? this.userEmail.charAt(0).toUpperCase()
      : 'U';
  }

  createAutomation(): void {
    this.notice = 'Your automation builder is coming soon.';
  }

  openFeature(feature: string): void {
    this.notice = `${feature} will be available soon.`;
  }

  logout(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout()
      .pipe(
        finalize(() => {
          this.isLoggingOut = false;
        })
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/login'),
        error: () => this.router.navigateByUrl('/login')
      });
  }
}
