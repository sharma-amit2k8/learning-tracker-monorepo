import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { chatMessages } from '../../../models/chat-message.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ai-response',
  imports: [DatePipe],
  templateUrl: './ai-response.html',
  styleUrl: './ai-response.css',
})
export class AiResponse {
  chat = input<chatMessages[]>([])
  @ViewChild('chatContainer') chatContainer! :ElementRef

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (!this.chatContainer) return;
    this.chatContainer.nativeElement.scrollTop =
      this.chatContainer.nativeElement.scrollHeight;
  }
}
