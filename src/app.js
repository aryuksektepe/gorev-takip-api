'use strict';

const path = require('path');
const express = require('express');
const taskStore = require('./models/taskStore');
const stats = require('./stats');
const tasksRouter = require('./routes/tasks');
const statsRouter = require('./routes/stats');

// uygulamaOlustur, testlerin (supertest ile) ve server.js'in ortak kullandığı
// fabrika fonksiyonudur. baslangicGorevleri verilirse depo o veriyle sıfırlanır -
// bu, testlerin her seferinde bilinen bir durumdan başlamasını sağlar.
function uygulamaOlustur({ baslangicGorevleri } = {}) {
  if (baslangicGorevleri) {
    taskStore.sifirla(baslangicGorevleri);
  }
  stats.sayaciHesapla();

  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use('/tasks', tasksRouter);
  app.use('/stats', statsRouter);

  return app;
}

module.exports = { uygulamaOlustur };
