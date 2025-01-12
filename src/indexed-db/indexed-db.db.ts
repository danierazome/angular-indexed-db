import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'db1-test',
  version: 8,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: true } },
      ],
    },
    {
      store: 'data-01',
      storeConfig: { keyPath: 'usage_id', autoIncrement: true },
      storeSchema: [
        { name: 'client_id', keypath: 'client_id', options: { unique: false } },
        { name: 'usage', keypath: 'usage', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
      ],
    },
  ],
};
