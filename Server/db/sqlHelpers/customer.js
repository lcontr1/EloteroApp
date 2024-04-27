const client = require('../client');
const util = require('../api/utils');

async function createCustomer ({ customername, password, phone }) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
        INSERT INTO customer(customername, password, phone)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [customername, password, phone]
    );
    return customer;
  } catch (error) {
    if (error?.constraint === 'customer_customername_key') {
      return 'Username already taken';
    }
  }
}

async function getCustomerbyphone(phone) {
  try {
    const {
      rows: [customer],
    } = await client.query(`
        SELECT *
        FROM customer
        WHERE customer.phone = '${phone}';
        `);
    return customer;
  } catch (error) {
    throw error;
  }
}

module.exports = { createCustomer, getCustomerbyphone };
