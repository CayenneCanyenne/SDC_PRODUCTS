const fs = require('fs');
const path = require('path');
const { parse, format } = require('fast-csv');
const { Client, Pool } = require('pg');
const pgtools = require('pgtools');

const CreateNewdB = false;
const schemaName = 'public';

// create a new database if needed
if (CreateNewdB) {
  const config = {
    user: 'pscha',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
  };

  pgtools.createdb(config, 'SDC')
    .then((res) => console.log('database created!', res))
    .catch((err) => {
      console.log(err);
      return process.exit(-1);
    });
}

// establish a client
const client = new Client({
  user: 'pscha',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

// define tables
const productTable = `CREATE TABLE IF NOT EXISTS ${schemaName}.products (
  id INTEGER PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price INTEGER NOT NULL
)`;

const styleTable = `CREATE TABLE IF NOT EXISTS ${schemaName}.styles (
  id INTEGER PRIMARY KEY NOT NULL,
  productId INTEGER NOT NULL,
  name TEXT NOT NULL,
  sale_price DECIMAL NOT NULL,
  original_price INTEGER NOT NULL,
  default_style BOOL NOT NULL,
  FOREIGN KEY(productId) REFERENCES products(id)
)`;

const photoTable = `CREATE TABLE IF NOT EXISTS ${schemaName}.photos (
  id INTEGER PRIMARY KEY NOT NULL,
  styleId INTEGER NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  FOREIGN KEY(styleId) REFERENCES styles(id)
)`;

const featureTable = `CREATE TABLE IF NOT EXISTS ${schemaName}.features (
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  feature TEXT NOT NULL,
  value TEXT,
  FOREIGN KEY(product_id) REFERENCES products(id)
)`;

const skusTable = `CREATE TABLE IF NOT EXISTS ${schemaName}.skus (
  id INTEGER PRIMARY KEY NOT NULL,
  productId INTEGER NOT NULL,
  styleId INTEGER NOT NULL,
  size TEXT NOT NULL,
  quantity TEXT NOT NULL,
  FOREIGN KEY(productId) REFERENCES products(id)
)`;

const relatedTable = `CREATE TABLE IF NOT EXISTS ${schemaName}.related(
  id INTEGER PRIMARY KEY NOT NULL,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL,
  FOREIGN KEY(current_product_id) REFERENCES products(id)
)`;

// connect to postgress and create a schema
client.connect()
  .then(() => console.log('connected'))
  .then(() => {
    const createSchema = `CREATE SCHEMA IF NOT EXISTS ${schemaName}`;
    client.query(createSchema)
      .catch((err) => new Error(err))
      .then(() => console.log('schema created!'));
  })
  .then(() => {
    client.query(productTable)
      .catch(() => new Error('create productTable failed!'))
      .then(() => console.log('product Table created!'));
  })
  .then(() => {
    client.query(styleTable)
      .catch(() => new Error('create styleTable failed!'))
      .then(() => console.log('product Table created!'));
  })
  .then(() => {
    client.query(featureTable)
      .catch(() => new Error('create featuresTable failed!'))
      .then(() => console.log('fetures Table created!'));
  })
  .then(() => {
    client.query(photoTable)
      .catch(() => new Error('create photosTable failed!'))
      .then(() => console.log('photos Table created!'));
  })
  .then(() => {
    client.query(skusTable)
      .catch(() => new Error('create skusTable failed!'))
      .then(() => console.log('skus Table created!'));
  })
  .then(() => {
    client.query(relatedTable)
      .catch(() => new Error('create relatedTable failed!'))
      .then(() => console.log('related Table created!'));
  })
  .catch(() => new Error('Error Connection Failed!'));
