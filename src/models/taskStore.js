'use strict';

// Görevler bellekte, basit bir dizide tutulur (ders 4.2'nin keşif demosunda
// Claude'un bulduğu tam olarak budur: "görevler bellekte bir dizi olarak tutuluyor").

let gorevler = [];
let sonrakiId = 1;

function tumunuGetir() {
  return gorevler;
}

function idIleBul(id) {
  return gorevler.find((gorev) => gorev.id === id);
}

function ekle({ baslik, oncelik = 'medium' }) {
  const gorev = {
    id: sonrakiId++,
    baslik,
    oncelik,
    tamamlandi: false,
    olusturmaTarihi: new Date().toISOString(),
  };
  gorevler.push(gorev);
  return gorev;
}

function tamamla(id) {
  const gorev = idIleBul(id);
  if (!gorev) return null;
  gorev.tamamlandi = true;
  return gorev;
}

// Test'lerde ve sunucu başlangıcında depoyu bilinen bir duruma sıfırlamak için.
function sifirla(baslangicGorevleri = []) {
  gorevler = baslangicGorevleri.map((gorev) => ({ ...gorev }));
  sonrakiId = gorevler.reduce((max, gorev) => Math.max(max, gorev.id + 1), 1);
}

module.exports = { tumunuGetir, idIleBul, ekle, tamamla, sifirla };
