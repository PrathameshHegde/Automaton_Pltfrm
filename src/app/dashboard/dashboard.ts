import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <main class="dashboard">
      <header class="dashboard-header">
        <div class="brand">
          <span class="brand-icon">A</span>
          <span>Auto<span class="brand-accent">AI</span></span>
        </div>

        <button
          type="button"
          class="logout-button"
          (click)="logout()"
          [disabled]="isLoggingOut"
        >
          {{ isLoggingOut ? 'Logging out...' : 'Logout' }}
        </button>
      </header>

      <section class="welcome-section">
        <p class="eyebrow">YOUR AUTOMATION WORKSPACE</p>
        <h1>Welcome to AutoAI<span class="brand-accent">.</span></h1>
        <p class="subtitle">
          Automate repetitive tasks and focus on what matters.
        </p>

        <div class="user-card">
          <div class="avatar">
            {{ userEmail.charAt(0).toUpperCase() || 'U' }}
          </div>
          <div>
            <p class="user-label">Logged in as</p>
            <p class="user-email">
              {{ userEmail || 'Loading account...' }}
            </p>
          </div>
        </div>
      </section>

      <section class="dashboard-grid">
        <article class="feature-card">
          <div class="feature-icon">⚡</div>
          <h2>Automations</h2>
          <p>
            Create workflows that handle repetitive tasks automatically.
          </p>
          <span class="status">Coming soon</span>
        </article>

        <article class="feature-card">
          <div class="feature-icon">🔗</div>
          <h2>Integrations</h2>
          <p>
            Connect your favorite apps and services in one workspace.
          </p>
          <span class="status">Coming soon</span>
        </article>

        <article class="feature-card">
          <div class="feature-icon">📊</div>
          <h2>Activity</h2>
          <p>
            Monitor your workflow activity and automation performance.
          </p>
          <span class="status">Coming soon</span>
        </article>
      </section>
    </main>
  `,
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  userEmail = '';
  isLoggingOut = false;

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
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: () => {
          this.router.navigateByUrl('/login');
        }
      });
  }
}
