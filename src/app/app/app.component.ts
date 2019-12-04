import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crime-tester';
  deferredPrompt: any;


  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
   // if (environment.enablePWAInstallationPopup) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      this.addToHomeScreen();
   // }
  }

  addToHomeScreen() {
    this.deferredPrompt.prompt(); // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }

      this.deferredPrompt = null;
    });
  }
}
