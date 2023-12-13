import db, { initDatabase } from './Database';
import { STORAGE } from '../../../../constants/server';


export const getWashes = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            const query = `SELECT id_cl, company_name, is_active, is_favorite, n_comments, rating, dTo_recommended, lat, lng, opts, gallery_image_urls, bns FROM vendor_objects`;
            tx.executeSql(
                query,
                [],
                (_, result) => {
                    const data = [];
                    for (let i = 0; i < result.rows.length; i++) {
                      const { id_cl, company_name, is_active, is_favorite, n_comments, rating, dTo_recommended, lat, lng, opts, gallery_image_urls, bns } = result.rows.item(i);
                      data.push({id_cl, company_name, is_active, is_favorite, n_comments, rating, dTo_recommended, lat, lng, opts, gallery_image_urls, bns });
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
