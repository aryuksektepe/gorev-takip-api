'use strict';

const request = require('supertest');
const { uygulamaOlustur } = require('../src/app');

// NOT: Bu dosya bilinçli olarak eksik. "Bir görev tamamlandığında /stats'taki
// tamamlanan sayısı artar mı" senaryosu burada YOK - ders 4.3'ün canlı demosunda
// Claude tarafından (önce kırmızı, sonra yeşil) yazılacak. Bkz. src/stats.js'teki
// bilinçli bug notu.

describe('GET /stats', () => {
  test('baslangictaki tamamlanan ve bekleyen sayilarini dogru hesaplar', async () => {
    const app = uygulamaOlustur({
      baslangicGorevleri: [
        { id: 1, baslik: 'Gorev 1', oncelik: 'high', tamamlandi: true },
        { id: 2, baslik: 'Gorev 2', oncelik: 'medium', tamamlandi: false },
        { id: 3, baslik: 'Gorev 3', oncelik: 'low', tamamlandi: true },
      ],
    });

    const res = await request(app).get('/stats');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ toplam: 3, tamamlanan: 2, bekleyen: 1 });
  });

  test('gorev yokken sifir doner', async () => {
    const app = uygulamaOlustur({ baslangicGorevleri: [] });

    const res = await request(app).get('/stats');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ toplam: 0, tamamlanan: 0, bekleyen: 0 });
  });
});
