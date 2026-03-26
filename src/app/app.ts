import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Material component
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FloatingButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private matIconReg: MatIconRegistry) {}

  ngOnInit(): void {
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
