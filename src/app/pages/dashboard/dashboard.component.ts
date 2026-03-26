import { Component, effect, inject, signal } from '@angular/core';
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

  contentDir = signal<FileSystemHandle[] | undefined>(undefined);

  constructor() {
    effect(async () => {
      const root = this.fileSystemService.rootDirectory();
      if (root) await this.loadDirectories(root);
    });
  }

  async loadDirectories(root: FileSystemDirectoryHandle) {
    if (root) {
      const items: FileSystemHandle[] = [];

      for await (const entry of root.values()) {
        items.push(entry);
      }

      const sortedItems = items.sort((a, b) => {
        if (a.kind !== b.kind) {
          return a.kind === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

      this.contentDir.set(sortedItems);
    }
  }
}
