const client = require('../client');
const util = require('../api/utils');

async function getFavoritebyId ({ customer_id, vendor_id, createed_at }) {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
        INSERT INTO favorite(customer_id, vendor_id, created_at)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [customer_id, vendor_id, createed_at]
    );
    return favorite;
  } catch (error) {
    throw error
  }
}



module.exports = { getFavoritebyId };
