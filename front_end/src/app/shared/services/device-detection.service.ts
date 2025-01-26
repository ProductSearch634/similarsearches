import { Injectable } from '@angular/core';
import * as UAParser from 'ua-parser-js';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionService {

  private parser: UAParser.UAParser;

  constructor() {
    this.parser = new UAParser.UAParser();
  }

  getDeviceInfo() {
    const result = this.parser.getResult();
    return {
      browser: `${result.browser.name} ${result.browser.version}`,
      os: `${result.os.name} ${result.os.version}`,
      device: result.device.type || 'desktop',
      userAgent: navigator.userAgent
    };
  }

  // Optional: Additional methods for specific details
  getBrowserName(): string {
    return this.parser.getBrowser().name || 'Unknown';
  }

  getOperatingSystem(): string {
    return this.parser.getOS().name || 'Unknown';
  }

}
