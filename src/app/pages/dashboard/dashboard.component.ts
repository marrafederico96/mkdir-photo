import { Component, effect, inject } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private fileSystemService = inject(FileSystemService);

  contentDir = this.fileSystemService.contentDir;
  canGoBack = this.fileSystemService.canGoBack;

  constructor() {
    effect(async () => {
      const root = this.fileSystemService.rootDirectory();
      if (root) await this.fileSystemService.initRoot(root);
    });
    window.addEventListener('popstate', async (event: PopStateEvent) => {
      if (this.canGoBack()) {
        await this.goBack();
      }
    });
  }

  async deleteItem(event: MouseEvent, handle: FileSystemHandle) {
    event.stopPropagation();
    await this.fileSystemService.deleteFileOrDirectory(handle);
  }

  async openItem(handle: FileSystemHandle) {
    if (handle.kind === 'directory') {
      await this.fileSystemService.navigateTo(handle as FileSystemDirectoryHandle);
    }
  }

  async goBack() {
    await this.fileSystemService.navigateBack();
  }
}
