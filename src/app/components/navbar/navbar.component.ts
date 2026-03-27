import { Component, inject } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private fileSystemService = inject(FileSystemService);

  rootDir = this.fileSystemService.rootDirectory;

  async setRootDirectory() {
    const rootHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
    });

    this.fileSystemService.rootDirectory.set(rootHandle);
  }

  async navigateToRoot() {
    await this.fileSystemService.navigateToRoot();
  }
}
