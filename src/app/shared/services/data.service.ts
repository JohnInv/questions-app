import { Inject, Injectable } from '@angular/core';
import { AppStorage, LOCAL_STORAGE } from '../injectors/local-storage';

export enum DataServiceKeys {
  questions = 'questions'
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(@Inject(LOCAL_STORAGE) private storage: AppStorage) {}

  public get<T>(key: DataServiceKeys): T {
    try {
      const value = this.storage.getItem(key) as string;

      return JSON.parse(value);
    } catch {
      throw new Error('DataService.get: wrong value format');
    }
  }

  public set(key: DataServiceKeys, value: any): void {
    try {
      const preparedValue = JSON.stringify(value);

      this.storage.setItem(key, preparedValue);
    } catch {
      throw new Error('DataService.set: wrong value format');
    }
  }
}
