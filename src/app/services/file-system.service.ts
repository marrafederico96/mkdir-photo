/// <reference types="@types/wicg-file-system-access" />

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  rootDirectory = signal<FileSystemDirectoryHandle | undefined>(undefined);
}
