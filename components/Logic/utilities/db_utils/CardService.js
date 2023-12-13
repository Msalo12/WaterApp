
import db, { initDatabase } from './Database';
import { STORAGE } from '../../../../constants/server';


export const getCards = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            const query = `SELECT id, name, mask, token FROM ${STORAGE.tblcn}`;
            tx.executeSql(
                query,
                [],
                (_, result) => {
                    const data = [];
                    for (let i = 0; i < result.rows.length; i++) {
                      const { id, name, mask, token } = result.rows.item(i);
                      data.push({ id, name, mask, token });
                    }
                    resolve(data);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
      });
}

export const addCard = (name, mask, token) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO ${STORAGE.tblcn} (name, mask, token) VALUES (?, ?, ?)`,
                [name, mask, token],
                (_, result) => {
                    resolve(result.insertId);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
      });
};

export const deleteCard = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${STORAGE.tblcn} WHERE id = ?`,
                [id],
                (_, result) => {
                    resolve(`Успішно видалено карту!`);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
      });
};

export const updateCard = (id, name) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE ${STORAGE.tblcn} SET name = ? WHERE id = ?`,
                [name, id],
                (_, result) => {
                    resolve(`Успішно змінено ім'я карти!`);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
      });
}

export const readCard = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT id, name, mask, token FROM ${STORAGE.tblcn} WHERE id = ?`,
          [id],
          (_, result) => {
            if (result.rows.length === 1) {
              const { id, name, mask, token } = result.rows.item(0);
              resolve({ id, name, mask, token });
            } else {
              reject(new Error('Card not found.'));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };