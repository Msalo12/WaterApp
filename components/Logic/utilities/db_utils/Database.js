import * as SQLite from 'expo-sqlite';
import { STORAGE } from '../../../../constants/server';

const db = SQLite.openDatabase(STORAGE.str);

export const initDatabase = () => {

  db.transaction((tx) => {
    // Create tables if they don't exist
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${STORAGE.tblcn} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mask TEXT, token TEXT)`,
      [],
      () => {
        console.log('Database and tables initialized.');
      },
      (_, error) => {
        console.error('Error initializing database:', error);
      }
    );
  });

  db.transaction((tx) => {
    // Create tables if they don't exist
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS vendor_objects (
        id_cl INT PRIMARY KEY,
        company_name VARCHAR(255),
        is_active INT,
        is_favorite INT,
        n_comments INT,
        rating FLOAT,
        dTo_recommended DATE,
        lat FLOAT,
        lng FLOAT,
        opts TEXT,
        gallery_image_urls TEXT,
        bns TEXT)`,
      [],
      () => {
        console.log('Database and tables initialized.');
      },
      (_, error) => {
        console.error('Error initializing database:', error);
      }
    );
  });
};

export default db;