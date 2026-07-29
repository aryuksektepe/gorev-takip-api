'use strict';

const express = require('express');
const stats = require('../stats');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(stats.istatistikleriGetir());
});

module.exports = router;
