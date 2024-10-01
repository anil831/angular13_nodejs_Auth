import { Component, OnInit } from '@angular/core';
import {ToasterService} from "../../core/services/toaster.service";
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),  // Start from below
        animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 })) // Slide in
      ]),
      transition(':leave', [
        animate('1ms ease-out', style({ transform: 'translateY(0%)', opacity: 0 })) // Slide out
      ])
    ])
  ]
})
export class ToasterComponent implements OnInit {

  messages:Array<{text:string, type:string}> = [];

  constructor(private toastService:ToasterService) { }

  ngOnInit(): void {
    this.addMessages();

  }

  addMessages(){
    this.toastService.getMessages().subscribe({
      next: message => {
        this.messages.push(message);

        setTimeout(()=>{
          this.removeMessages(message);
        },5000)
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  removeMessages(message:{text:string, type:string}){
    this.messages = this.messages.filter(msg => msg!=message)
  }

  getIconSymbol(type: string): string {
    switch (type) {
      case 'success':
        return '\u2705'; // Check mark for success (✅)
      case 'error':
        return '\u274C'; // Cross mark for error (❌)
      case 'info':
        return '\u2139'; // Info symbol (ℹ️)
      default:
        return '';
    }
  }
}





/**
 * 
 * animation explanation:
 * 
 * trigger('slideInOut', [...]): This sets up the animation trigger named slideInOut.
 * To use the slideInOut animation in your Angular template, you would apply it to an element using the @ syntax.
   
   :enter: This transition is activated when an element is added to the DOM.
   :leave: This transition is activated when an element is removed from the DOM.
   style({ transform: 'translateY(100%)', opacity: 0 })
   The element starts off 100% below its final position (i.e., off-screen) and fully transparent (opacity 0).

   animate('500ms ease-in', style({ transform: 'translateY(0)', opacity: 1 }))
   Over 500 milliseconds, the element slides up to its final position (0% translateY) and becomes fully opaque (opacity 1).


   500ms: The animation will also take 500 milliseconds to complete.
   animate('500ms ease-out', style({ transform: 'translateY(0%)', opacity: 0 }))
    Over 500 milliseconds, the element transitions from its current position to fully transparent, sliding out.
 */