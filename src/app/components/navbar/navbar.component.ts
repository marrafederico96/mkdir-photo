import { Component, computed, inject } from '@angular/core';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileSystemService } from '../../services/file-system.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
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
