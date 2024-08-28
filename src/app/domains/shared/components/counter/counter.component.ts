import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  ngOnInit() {
    this.counterRef = window.setInterval(() => {
      this.counter.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngOnDestroy() {
    window.clearInterval(this.counterRef);
  }
}
