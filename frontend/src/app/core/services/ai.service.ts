import { inject, Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient)

  getAiSuggestion(prompt:any){
    return this.http.post(`${environment.baseURL}/ai/suggestion`, prompt)
    
    // const mockResponse =
    //   `🧠 AI Analysis

    //       You asked:
    //       "${prompt.trim()}"

    //       Suggestion:
    //       Focus on one difficult task first.
    //       Avoid multitasking.
    //       Take a 10 minute break every hour.
    //       `;

    // return of(mockResponse).pipe(delay(2000))
  }
}
