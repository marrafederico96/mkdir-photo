import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private stream: MediaStream | null = null;
  private imageCapture: ImageCapture | null = null;

  async start(facingMode: 'environment' | 'user' = 'environment'): Promise<MediaStream> {
    this.stop();

    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: facingMode },
      },
      audio: true,
    });

    const track = this.stream.getVideoTracks()[0];
    this.imageCapture = new ImageCapture(track);
    return this.stream;
  }

  async takePhoto(): Promise<Blob> {
    if (!this.imageCapture) throw new Error('Camera non attiva');
    return this.imageCapture.takePhoto();
  }

  stop(): void {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.imageCapture = null;
  }

  isActive(): boolean {
    return !!this.stream;
  }
}
