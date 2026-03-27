import { Component, inject } from '@angular/core';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { CameraService } from '../../services/camera.service';
import { FileSystemService } from '../../services/file-system.service';
import { FolderDialogComponent } from '../folder-dialog/folder-dialog.component';

@Component({
  selector: 'app-floating-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss',
})
export class FloatingButtonComponent {
  private cameraService = inject(CameraService);
  private fileSystemService = inject(FileSystemService);
  private dialog = inject(MatDialog);

  currentDir = this.fileSystemService.currentDirHandle;
  rootDir = this.fileSystemService.rootDirectory;

  async openCamera() {
    try {
      const file = await this.cameraService.takePhoto();

      const dirHandle = this.currentDir();
      if (dirHandle) {
        const folderName = dirHandle.name;
        await this.cameraService.savePhoto(file, dirHandle, folderName);
        await this.fileSystemService.loadDirectories(dirHandle);
      }
    } catch (err) {
      console.error('Foto annullata o errore:', err);
    }
  }

  async openDialog() {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '400px',
      disableClose: true,
    });
    const name = await firstValueFrom(dialogRef.afterClosed());
    if (name) {
      await this.fileSystemService.createFolder(name);
    }
  }
}
