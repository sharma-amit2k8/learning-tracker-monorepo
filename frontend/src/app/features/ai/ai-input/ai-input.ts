import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-input',
  imports: [FormsModule],
  templateUrl: './ai-input.html',
  styleUrl: './ai-input.css',
})
export class AiInput {
  loading = input()
  query = signal('')
  askAI = output<string>()

  getSuggestion(){
    const value = this.query().trim();
    if (!value) return;
    this.askAI.emit(value);
    this.query.set('');
  }

  onEnter(event: Event){
    event.preventDefault(); // prevents newline in textarea
    this.getSuggestion()
  }

}
