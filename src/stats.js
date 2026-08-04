'use strict';

const taskStore = require('./models/taskStore');

// Tamamlanan görev sayısı, her istekte listeyi baştan taramak yerine bir modül
// değişkeninde tutulur.
let tamamlananSayaci = 0;

function sayaciHesapla() {
  tamamlananSayaci = taskStore.tumunuGetir().filter((gorev) => gorev.tamamlandi).length;
}

// Bir görev tamamlandığında sayacı bir artırır.
function tamamlananiArttir() {
  tamamlananSayaci += 1;
}

function istatistikleriGetir() {
  const tumGorevler = taskStore.tumunuGetir();
  return {
    toplam: tumGorevler.length,
    tamamlanan: tamamlananSayaci,
    bekleyen: tumGorevler.length - tamamlananSayaci,
  };
}

module.exports = { sayaciHesapla, tamamlananiArttir, istatistikleriGetir };
