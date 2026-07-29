'use strict';

const taskStore = require('./models/taskStore');

// BİLİNÇLİ BUG (ders 4.3'ün konusu):
// tamamlananSayaci, uygulama başladığında (ya da sifirla() çağrıldığında) bir
// kere hesaplanip degiskende tutuluyor. Bir görev tamamlandiginda bu degisken
// GÜNCELLENMİYOR - çünkü routes/tasks.js'teki tamamlama uç noktasi
// tamamlananiArttir()'i çağırmayı unutuyor. Belirti burada (/stats yanlış sayı
// döner) ama kök neden routes/tasks.js'teki tamamlama fonksiyonunda.
let tamamlananSayaci = 0;

function sayaciHesapla() {
  tamamlananSayaci = taskStore.tumunuGetir().filter((gorev) => gorev.tamamlandi).length;
}

// Bu fonksiyon routes/tasks.js'teki tamamlama uç noktasından çağrılmalıydı.
// Kasıtlı olarak hiçbir yerden çağrılmıyor - ders 4.3'te öğrenciler/Claude bu
// eksik çağrıyı bulup ekleyecek.
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
