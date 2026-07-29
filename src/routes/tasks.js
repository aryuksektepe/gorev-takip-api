'use strict';

const express = require('express');
const taskStore = require('../models/taskStore');
// BİLİNÇLİ BUG (ders 4.3): ../stats modülü burada import edilmiyor, bu yüzden
// tamamlama uç noktası stats.tamamlananiArttir()'i çağıramıyor. Öncelik filtresi
// (GET /tasks?priority=...) de henüz burada yok - ders 4.4'te TDD ile canlı eklenecek.

const router = express.Router();

const GECERLI_ONCELIKLER = ['high', 'medium', 'low'];

router.get('/', (req, res) => {
  res.json(taskStore.tumunuGetir());
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

  // BİLİNÇLİ BUG: burada stats.tamamlananiArttir() çağrılması gerekirdi, çağrılmıyor.
  // Bu yüzden /stats uç noktasındaki "tamamlanan" sayısı bu görev tamamlandıktan
  // sonra da değişmeden kalıyor.
  res.json(gorev);
});

module.exports = router;
