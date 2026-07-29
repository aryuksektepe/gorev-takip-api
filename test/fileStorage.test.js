'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { saveTasksToFile, loadTasksFromFile } = require('../src/utils/fileStorage');

// Ders 4.8'in refactor hedefi bu modül: callback tabanlı davranış burada
// sabitleniyor, async/await'e geçişten sonra da bu testler yeşil kalmalı.

describe('fileStorage (callback tabanlı)', () => {
  let testDosyaYolu;

  beforeEach(() => {
    testDosyaYolu = path.join(os.tmpdir(), `gorev-takip-test-${Date.now()}-${Math.random()}.json`);
  });

  afterEach((done) => {
    fs.unlink(testDosyaYolu, () => done());
  });

  test('saveTasksToFile gorevleri dosyaya yazar, loadTasksFromFile geri okur', (done) => {
    const gorevler = [{ id: 1, baslik: 'Test gorevi', tamamlandi: false }];

    saveTasksToFile(gorevler, (hata) => {
      expect(hata).toBeNull();

      loadTasksFromFile((okumaHatasi, okunanGorevler) => {
        expect(okumaHatasi).toBeNull();
        expect(okunanGorevler).toEqual(gorevler);
        done();
      }, testDosyaYolu);
    }, testDosyaYolu);
  });

  test('dosya yoksa loadTasksFromFile bos dizi doner', (done) => {
    const olmayanDosya = path.join(os.tmpdir(), 'gorev-takip-hic-olmayan-dosya.json');

    loadTasksFromFile((hata, gorevler) => {
      expect(hata).toBeNull();
      expect(gorevler).toEqual([]);
      done();
    }, olmayanDosya);
  });
});
