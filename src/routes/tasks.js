'use strict';

const express = require('express');
const taskStore = require('../models/taskStore');

const router = express.Router();

const GECERLI_ONCELIKLER = ['high', 'medium', 'low'];

router.get('/', (req, res) => {
  const { ara } = req.query;

  if (ara === undefined) {
    return res.json(taskStore.tumunuGetir());
  }

  const aranan = ara.trim().toLocaleLowerCase('tr');

  const eslesenler = taskStore
    .tumunuGetir()
    .filter((gorev) => gorev.baslik.toLocaleLowerCase('tr').includes(aranan));

  res.json(eslesenler);
});

router.post('/', (req, res) => {
  const { baslik, oncelik } = req.body || {};

  if (!baslik || typeof baslik !== 'string' || !baslik.trim()) {
    return res.status(400).json({ hata: 'baslik zorunludur' });
  }

  if (oncelik !== undefined && !GECERLI_ONCELIKLER.includes(oncelik)) {
    return res.status(400).json({
      hata: `oncelik su degerlerden biri olmali: ${GECERLI_ONCELIKLER.join(', ')}`,
    });
  }

  const gorev = taskStore.ekle({ baslik: baslik.trim(), oncelik });
  res.status(201).json(gorev);
});

router.post('/:id/tamamla', (req, res) => {
  const id = Number(req.params.id);
  const gorev = taskStore.tamamla(id);

  if (!gorev) {
    return res.status(404).json({ hata: 'gorev bulunamadi' });
  }

  res.json(gorev);
});

module.exports = router;
