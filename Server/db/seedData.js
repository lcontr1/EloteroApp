const client = require('./client');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    await client.query(`
      DROP TABLE IF EXISTS customer;
      DROP TABLE IF EXISTS vendor;
      DROP TABLE IF EXISTS favorite;
      DROP TABLE IF EXISTS customer_vendor_favorite;
    `)
    console.log('tables dropped!')
  } catch (error) {
    console.log('error dropping tables... ')
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Building All Tables...');
    await client.query(`
      CREATE TABLE customer (
        id SERIAL PRIMARY KEY,
        customername VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) UNIQUE
        );

      CREATE TABLE vendor (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT
        );

      CREATE TABLE favorite (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customer(id),
        vendor_id INT REFERENCES vendor(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

    CREATE TABLE customer_vendor_favorite (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customer(id),
        vendor_id INT REFERENCES vendor(id),
        CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customer(id),
        CONSTRAINT fk_vendor FOREIGN KEY (vendor_id) REFERENCES vendor(id),
        UNIQUE(customer_id, vendor_id)
        ); 
        `)
        console.log('tables built!')
  } catch (error) {
    throw error;
  }
}

async function createInitialData() {
  try {
    console.log('Creating Initial Data...');
    await client.query(`
      INSERT INTO vendor (name, description)
      VALUES
        ('el elotero', 'sells elotes'), ('el frutero', 'sells fruits'), ('el panadero', 'sells pan')
        `);
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialData();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  rebuildDB,
};
