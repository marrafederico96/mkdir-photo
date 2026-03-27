import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// Material component
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-folder-dialog',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './folder-dialog.component.html',
  styleUrl: './folder-dialog.component.scss',
})
export class FolderDialogComponent {
  private dialogRef = inject(MatDialogRef<FolderDialogComponent>);

  folderName = new FormControl('', Validators.required);

  close() {
    this.dialogRef.close(null);
  }

  create() {
    if (this.folderName.valid) {
      this.dialogRef.close(this.folderName.value);
    }
  }
}
