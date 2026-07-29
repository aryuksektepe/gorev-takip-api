'use strict';

const { uygulamaOlustur } = require('./app');

const PORT = process.env.PORT || 3000;

const baslangicGorevleri = [
  {
    id: 1,
    baslik: 'Kurs materyallerini gözden geçir',
    oncelik: 'high',
    tamamlandi: true,
    olusturmaTarihi: new Date().toISOString(),
  },
  {
    id: 2,
    baslik: 'Dashboard tasarımını mockup ile karşılaştır',
    oncelik: 'medium',
    tamamlandi: false,
    olusturmaTarihi: new Date().toISOString(),
  },
  {
    id: 3,
    baslik: "README dosyasını güncelle",
    oncelik: 'low',
    tamamlandi: false,
    olusturmaTarihi: new Date().toISOString(),
  },
  {
    id: 4,
    baslik: 'Ali ile görev önceliklerini gözden geçir',
    oncelik: 'medium',
    tamamlandi: true,
    olusturmaTarihi: new Date().toISOString(),
  },
];

const app = uygulamaOlustur({ baslangicGorevleri });

app.listen(PORT, () => {
  console.log(`gorev-takip-api http://localhost:${PORT} adresinde çalışıyor`);
});
