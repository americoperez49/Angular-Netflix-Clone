import { Component, Input, ModelSignal, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input({ required: true }) id: string = '';
  @Input({ required: true }) label: string = '';
  @Input() type: string = '';
  value: ModelSignal<string | undefined> = model();

  // inside your component
}
