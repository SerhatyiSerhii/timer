import { Component } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public hours: string = '00';
  public minutes: string = '00';
  public seconds: string = '00';
  public source = timer(1000, 1000);
  public timer: Subscription;
  public timerRuns: boolean = false;

  private privateSeconds: number = 0;
  private privateMinutes: number = 0;
  private privateHours: number = 0;

  public start(): void {

    if (this.timer) {
      this.timer.unsubscribe();
    }

    this.timerRuns = true;

    this.timer = this.source.subscribe(() => {
      this.privateSeconds++
      if (this.privateSeconds == 60) {
        this.privateSeconds = 0;
        this.seconds = '0' + this.privateSeconds;
        this.privateMinutes++;
      }

      if (this.privateMinutes == 60) {
        this.privateMinutes = 0;
        this.minutes = '0' + this.privateMinutes;
        this.privateHours++
      }

      if (this.privateHours == 24) {
        this.privateHours = 0;
        this.hours = '0' + this.privateHours;
      }

      this.timeCheck();
    })
  }

  public stop(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }

    this.timerRuns = false;

    this.privateSeconds = 0;
    this.privateMinutes = 0;
    this.privateHours = 0;

    this.seconds = '0' + this.privateSeconds;
    this.minutes = '0' + this.privateMinutes;
    this.hours = '0' + this.privateHours;
  }

  public wait(): void {
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.timerRuns = false;
  }

  public reset(): void {
    this.stop();
    this.start();
  }

  private timeCheck(): void {
    if (this.privateSeconds < 10) {
      this.seconds = '0' + this.privateSeconds;
    } else {
      this.seconds = '' + this.privateSeconds;
    }

    if (this.privateMinutes < 10) {
      this.minutes = '0' + this.privateMinutes;
    } else {
      this.minutes = '' + this.privateMinutes;
    }

    if (this.privateHours < 10) {
      this.hours = '0' + this.privateHours;
    } else {
      this.hours = '' + this.privateHours;
    }
  }
}
