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
  }

  async initRoot(root: FileSystemDirectoryHandle): Promise<void> {
    this.historyStack.set([]);
    this.currentDirHandle.set(root);
    await this.loadDirectories(root);
  }

  async navigateTo(dirHandle: FileSystemDirectoryHandle): Promise<void> {
    const current = this.currentDirHandle();
    if (current) this.historyStack.update((s) => [...s, current]);
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

  async navigateToRoot(): Promise<void> {
    this.historyStack.set([]);
    const root = this.rootDirectory();
    if (root) {
      this.currentDirHandle.set(root);
      await this.loadDirectories(root);
    }
  }
}
