'use strict';

const fs = require('fs');
const path = require('path');

// Ders 4.8'in refactor hedefi tam olarak bu dosya: callback tabanlı fonksiyonlar,
// aynı davranışla async/await'e taşınacak. Şimdilik BİLİNÇLİ olarak callback
// stilinde bırakıldı - mevcut testler (test/fileStorage.test.js) bu davranışı
// zaten kapsıyor, refactor sırasında kırılmamaları gerekiyor.

const VARSAYILAN_DOSYA = path.join(__dirname, '..', '..', 'data', 'gorevler.json');

function saveTasksToFile(gorevler, callback, dosyaYolu = VARSAYILAN_DOSYA) {
  const klasor = path.dirname(dosyaYolu);
  fs.mkdir(klasor, { recursive: true }, (mkdirHatasi) => {
    if (mkdirHatasi) return callback(mkdirHatasi);
    fs.writeFile(dosyaYolu, JSON.stringify(gorevler, null, 2), 'utf8', (yazmaHatasi) => {
      if (yazmaHatasi) return callback(yazmaHatasi);
      callback(null);
    });
  });
}

function loadTasksFromFile(callback, dosyaYolu = VARSAYILAN_DOSYA) {
  fs.readFile(dosyaYolu, 'utf8', (okumaHatasi, veri) => {
    if (okumaHatasi) {
      if (okumaHatasi.code === 'ENOENT') return callback(null, []);
      return callback(okumaHatasi);
    }
    try {
      callback(null, JSON.parse(veri));
    } catch (ayristirmaHatasi) {
      callback(ayristirmaHatasi);
    }
  });
}

module.exports = { saveTasksToFile, loadTasksFromFile, VARSAYILAN_DOSYA };
