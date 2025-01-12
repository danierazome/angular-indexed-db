import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideIndexedDb } from 'ngx-indexed-db';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { dbConfig } from '../indexed-db/indexed-db.db';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideIndexedDb(dbConfig)]
};
