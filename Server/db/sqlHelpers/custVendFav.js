const client = require('../client');
const util = require('../api/utils');


//its too late and this function is incorrect it should not be creating something new it should be getting all the favorites for the customer by customer_id
async function getFavoritesByCustomerId ({ customer_id, vendor_id }) {
  try {
    const {
      rows: [favorite],
    } = await client.query(
      `
        INSERT INTO favorite(customer_id, vendor_id)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [customer_id, vendor_id]
    );
    return customer;
  } catch (error) {
    throw error;
  }
}

// Come back to this once I fully understand this - ideally it should be getting all customers that have favorited a vendor and dont forget to export
// async function getFavoritebyVendor(vendor_id) {
//   try {
//     const {
//       rows: [customer],
//     } = await client.query(`
//         SELECT *
//         FROM customer
//         WHERE customer.vendor_id = '${vendor_id}';
//         `);
//     return customer;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = { getFavoritesByCustomerId  };
