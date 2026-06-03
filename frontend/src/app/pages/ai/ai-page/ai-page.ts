import { Component, effect, inject, signal } from '@angular/core';
import { AiInput } from '../../../features/ai/ai-input/ai-input';
import { AiResponse } from '../../../features/ai/ai-response/ai-response';
import { AiService } from '../../../core/services/ai.service';
import { SnackbarService } from '../../../core/services/snackbar.service';
// import { Loader } from '../../../shared/components/loader/loader';
import { chatMessages } from '../../../models/chat-message.model';
@Component({
  selector: 'app-ai-page',
  imports: [AiInput, AiResponse],
  templateUrl: './ai-page.html',
  styleUrl: './ai-page.css',
})
export class AiPage {
  response = signal('')
  loading = signal(false)
  aiService = inject(AiService)
  snackbar = inject(SnackbarService)
  // chatMessage : chatMessages[]= []
  chatMessage = signal<chatMessages[]>([])

  saveMessage = effect(()=>{
          localStorage.setItem('chatHistory', JSON.stringify(this.chatMessage()))
    })

  ngOnInit() {
    const savedMessages = localStorage.getItem('chatHistory')

    if(savedMessages){
      // this.chatMessage() = JSON.parse(savedMessages)
      this.chatMessage.set(JSON.parse(savedMessages))
    }

  }

  handleQuery( query: string){
    this.loading.set(true)
    this.response.set('')

    const prompt = {
      prompt : query
    }

    // this.chatMessage.push( {
    //   role : 'user' ,
    //   message : `🧑 You : ${query}`,
    //   createdAt : new Date()
    // })

    // this.saveMessage()

    this.chatMessage.update(messages => [
      ...messages,
      {
      role : 'user' ,
      message : `🧑 You : ${query}`,
      createdAt : new Date()
      }
    ])

    this.aiService.getAiSuggestion(prompt).subscribe({
      next : (response:any)=> {
        this.response.set(response.suggestion)
        // this.snackbar.showSnackBar(response.message)
        this.loading.set(false)
        // this.chatMessage.push({
        //   role : 'ai',
        //   message : `🤖 AI: ${response.suggestion}`,
        //   createdAt: new Date()
        // })
        // this.saveMessage()
        this.chatMessage.update(currentVal => [
          ...currentVal,
          {
          role : 'ai',
          message : `🤖 AI: ${response.suggestion}`,
          createdAt: new Date()
        }
        ])
      },
      error :(error)=> {
        console.log(error);
        this.chatMessage.update(currentVal => [
          ...currentVal,
          {
          role: 'ai',
          message : '❌ AI service unavailable. Please try again.',
          createdAt: new Date()
        }
        ]

        )
        // this.chatMessage.push({
        //   role: 'ai',
        //   message : '❌ AI service unavailable. Please try again.',
        //   createdAt: new Date()
        // })
        // this.saveMessage()
        this.snackbar.showSnackBar('Something went wrong, please try again!!!')
        this.loading.set(false)
      }
    })

  }

  // saveMessage (){
  //   localStorage.setItem('chatHistory', JSON.stringify(this.chatMessage))
  // }

  clearChatHistory(){
    this.chatMessage.set([])
    localStorage.removeItem('chatHistory')
  }
}
