import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

interface DamageMark {
  x: number;
  y: number;
}

@Component({
  selector: 'app-damage-marker',
  templateUrl: './damage-marker.component.html',
  styleUrl: './damage-marker.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class DamageMarkerComponent {
  damageMarks: DamageMark[] = [];

  constructor(
    public dialogRef: MatDialogRef<DamageMarkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addMarker(event: MouseEvent) {
    const image = event.target as HTMLImageElement;
    if (!image || image.tagName !== 'IMG') return; // Ensure only image clicks count
  
    const rect = image.getBoundingClientRect(); // Get image position and size
  
    // Correct way to get position relative to the image
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
  
    this.damageMarks.push({ x, y });
  }
  
  
  
  removeMarker(index: number) {
    this.damageMarks.splice(index, 1);
  }
  
  
  /** Closes dialog and returns the markers */
  save() {
    this.dialogRef.close(this.damageMarks);
  }

  /** Closes dialog without saving */
  close() {
    this.dialogRef.close();
  }
}
