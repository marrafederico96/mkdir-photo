import { Component, inject } from '@angular/core';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'app-floating-button',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss',
})
export class FloatingButtonComponent {
  private cameraService = inject(CameraService);

  async openCamera() {
    try {
      const file = await this.cameraService.takePhoto();
      this.cameraService.savePhoto(file);
    } catch (err) {
      console.error('Foto annullata o errore:', err);
    }
  }
}
