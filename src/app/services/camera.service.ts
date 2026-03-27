import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CameraService {
  takePhoto(): Promise<File> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';

      input.onchange = () => {
        const file = input.files?.[0];
        if (file) resolve(file);
        else reject(new Error('Nessuna foto selezionata'));
      };

      input.oncancel = () => reject(new Error('Annullato'));
      input.click();
    });
  }

  savePhoto(file: File, fileName?: string): void {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName ?? `foto_${Date.now()}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
