import { Component, computed, inject } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private fileSystemService = inject(FileSystemService);

  rootDir = computed(() => this.fileSystemService.rootDirectory());

  async setRootDirectory() {
    const rootHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
    });

    this.fileSystemService.rootDirectory.set(rootHandle);
  }
}
