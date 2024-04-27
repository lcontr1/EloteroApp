const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { JWT_SECRET, COOKIE_SECRET } = require('dotenv').config({path: '../.env' })
require('dotenv').config({ path: './.env' });
const SALT = 10;


//this is going to probably get deleted and I'll just use square API
const { createVendor, getVendorByName } = require('../sqlHelpers/vendor');

//create user account otherwise known register
router.post('/register', async (req, res, next) => {
  try {
    const { customername, password, phone } = req.body;

    if (!username) {
      throw new Error('Username is required to create an account');
    } else if (!password) {
      throw new Error('Password is required to create an account');
    }

    const hashedPw = await bcrypt.hash(password, SALT);
    const customer = await createCustomer({ customername, password: hashedPw, phone });
    delete customer.password;

    if (typeof customer === 'string') {
      res.status(500).send({ error: player });
      return;
    }

    const token = jwt.sign(customer, process.env.JWT_SECRET);

    res.cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    });

    res.send({ token, player });
  } catch (error) {
    next(error);
  }
});

//POST - login player

router.post('/login', async (req, res, next) => {
  try {
    const { customername, phone, password } = req.body;
    const customer = await getCustomerbyphone(phone);
    const validPw = await bcrypt.compare(password, customer.password);

    delete customer.password;

    if (!player) {
      res.status(500).send('invalid username');
    } else if (!validPw) {
      //throw new Error("Invalid password");
      res.status(500).send('invalid password');
    }
    if (validPw) {
      const token = jwt.sign(customer, process.env.JWT_SECRET);

      res.cookie('token', token, {
        sameSite: 'strict',
        httpOnly: true,
        signed: true,
      });
      res.send({ token, customer });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
