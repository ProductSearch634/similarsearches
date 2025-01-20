import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-loader',
  imports: [CommonModule],
  templateUrl: './progress-loader.component.html',
  styleUrl: './progress-loader.component.css'
})
export class ProgressLoaderComponent {

  @Input() loading = false;
  progress = 0;
  currentMessage = '';
  private progressInterval: any;
  private startTime: number = 0;

  private messages = [
    { threshold: 0, text: 'Searching for products...' },
    { threshold: 25, text: 'Scanning through catalogs...' },
    { threshold: 50, text: 'Finding the best matches...' },
    { threshold: 75, text: 'Almost there...' },
    { threshold: 97, text: 'Finalizing the results, please hang on...' }
  ];

  ngOnInit() {
    this.resetProgress();
  }

  ngOnChanges() {
    if (this.loading) {
      this.startProgress();
    } else {
      this.completeProgress();
    }
  }

  private startProgress() {
    this.resetProgress();
    this.startTime = Date.now();
    this.updateMessage();
    
    this.progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime;
      
      if (this.progress < 97) {
        if (elapsedTime < 25000) {
          this.progress += 0.8;
        } else if (elapsedTime < 40000) {
          this.progress += 0.4;
        } else if (elapsedTime < 50000) {
          this.progress += 0.25;
        } else if (elapsedTime < 55000) {
          this.progress += 0.15;
        } else if (elapsedTime < 60000) {
          this.progress += 0.1;
        } else {
          this.progress += 0.05;
        }
      }
      
      this.progress = Math.min(97, this.progress);
      this.updateMessage();
    }, 100);
  }

  private updateMessage() {
    // Find the appropriate message based on current progress
    const currentMessageObj = [...this.messages]
      .reverse()
      .find(msg => this.progress >= msg.threshold);
    
    if (currentMessageObj && this.currentMessage !== currentMessageObj.text) {
      this.currentMessage = currentMessageObj.text;
    }
  }

  calculateOffset(): number {
    const circumference = 2 * Math.PI * 45; // 45 is the radius
    const offset = circumference - (this.progress / 100) * circumference;
    return offset;
  }

  private completeProgress() {
    clearInterval(this.progressInterval);
    this.progress = 100;
    this.currentMessage = 'Done!';
    
    // Reset after showing 100%
    setTimeout(() => {
      this.resetProgress();
    }, 500);
  }

  private resetProgress() {
    clearInterval(this.progressInterval);
    this.progress = 0;
    this.currentMessage = this.messages[0].text;
  }

  ngOnDestroy() {
    clearInterval(this.progressInterval);
  }

}
