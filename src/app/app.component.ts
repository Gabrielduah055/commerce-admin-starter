import { Component, inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ADMIN_CONFIG } from './core/admin.config';
import { RouterOutlet } from '@angular/router';
import { ToastOutletComponent } from './shared/toast-outlet.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastOutletComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: `${ADMIN_CONFIG.businessName} commerce administration` });
  }
}
