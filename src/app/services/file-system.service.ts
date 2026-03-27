/// <reference types="@types/wicg-file-system-access" />

import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  rootDirectory = signal<FileSystemDirectoryHandle | undefined>(undefined);
  currentDirHandle = signal<FileSystemDirectoryHandle | undefined>(undefined);
  contentDir = signal<FileSystemHandle[]>([]);
  canGoBack = computed(() => this.historyStack().length > 0);

  private historyStack = signal<FileSystemDirectoryHandle[]>([]);
  thumbnailCache = signal<Map<string, string>>(new Map());
  private objectUrls: string[] = [];

  async loadDirectories(root: FileSystemDirectoryHandle): Promise<void> {
    const items: FileSystemHandle[] = [];

    for await (const entry of root.values()) {
      items.push(entry);
    }

    const sortedItems = items.sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'directory' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    this.contentDir.set(sortedItems);
    await this.loadThumbnails(sortedItems);
  }

  async initRoot(root: FileSystemDirectoryHandle): Promise<void> {
    this.historyStack.set([]);
    this.currentDirHandle.set(root);
    await this.loadDirectories(root);
  }

  async navigateTo(dirHandle: FileSystemDirectoryHandle): Promise<void> {
    const current = this.currentDirHandle();
    if (current) this.historyStack.update((s) => [...s, current]);
    history.pushState({ inApp: true }, '');
    this.currentDirHandle.set(dirHandle);
    await this.loadDirectories(dirHandle);
  }

  async navigateBack(): Promise<void> {
    const stack = this.historyStack();
    const previous = stack.at(-1);
    if (previous) {
      this.historyStack.update((s) => s.slice(0, -1));
      this.currentDirHandle.set(previous);
      await this.loadDirectories(previous);
    }
  }

  async createFolder(name: string) {
    const current = this.currentDirHandle();
    if (!current) throw new Error('Nessuna directory corrente');
    await current.getDirectoryHandle(name, { create: true });
    await this.loadDirectories(current);
  }

  async navigateToRoot(): Promise<void> {
    this.historyStack.set([]);
    const root = this.rootDirectory();
    if (root) {
      this.currentDirHandle.set(root);
      await this.loadDirectories(root);
    }
  }

  private async loadThumbnails(items: FileSystemHandle[]): Promise<void> {
    const fileItems = items.filter((i) => i.kind === 'file') as FileSystemFileHandle[];
    await Promise.all(
      fileItems.map(async (handle) => {
        if (this.thumbnailCache().has(handle.name)) return;
        try {
          const file = await handle.getFile();
          const isImage =
            file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(handle.name);
          if (!isImage) return;
          const url = URL.createObjectURL(file);
          this.thumbnailCache.update((cache) => new Map(cache).set(handle.name, url));
          this.objectUrls.push(url);
        } catch (e) {
          console.error('errore thumbnail:', handle.name, e);
        }
      }),
    );
  }

  getThumbnail(name: string): string | undefined {
    return this.thumbnailCache().get(name);
  }

  revokeAllThumbnails(): void {
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.objectUrls = [];
    this.thumbnailCache.set(new Map()); // reset del signal
  }
}
