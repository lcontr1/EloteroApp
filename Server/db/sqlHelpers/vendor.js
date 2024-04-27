const client = require('../client');
const util = require('../api/utils');

async function createVendor ({ name, description }) {
  try {
    const {
      rows: [vendor],
    } = await client.query(
      `
        INSERT INTO vendor(name, description)
        VALUES ($1, $2)
        RETURNING *;
        `,
      [name, description]
    );
    return vendor;
  } catch (error) {
    throw error
  }
}

async function getVendorByName(name) {
  try {
    const {
      rows: [vendor],
    } = await client.query(`
        SELECT *
        FROM vendor
        WHERE vendor.name = '${name}';
        `);
    return vendor;
  } catch (error) {
    throw error;
  }
}

module.exports = { createVendor, getVendorByName };
