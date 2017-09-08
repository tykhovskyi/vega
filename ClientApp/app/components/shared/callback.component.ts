import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-callback',
  template: `
    <div class="loading">
      <img src="/loading.svg" alt="loading">
    </div>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
