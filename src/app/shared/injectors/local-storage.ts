import { InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AppStorage {
  setItem(key: string, value: any): void;
  getItem<T>(key: string): T;
}

export function localStorageFactory(platformId: Object) {
  if (isPlatformBrowser(platformId)) {
    return window.localStorage;
  }

  throw new Error('Local storage is not implemented');
}

export const LOCAL_STORAGE = new InjectionToken('local-storage-wrapper');
