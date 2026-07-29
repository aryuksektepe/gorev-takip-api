'use strict';

const request = require('supertest');
const { uygulamaOlustur } = require('../src/app');

function testAppOlustur(baslangicGorevleri = []) {
  return uygulamaOlustur({ baslangicGorevleri });
}

describe('GET /tasks', () => {
  test('mevcut görevleri listeler', async () => {
    const app = testAppOlustur([
      { id: 1, baslik: 'Ali icin rapor hazirla', oncelik: 'high', tamamlandi: false },
    ]);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].baslik).toBe('Ali icin rapor hazirla');
  });

  test('görev yoksa boş dizi döner', async () => {
    const app = testAppOlustur([]);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /tasks', () => {
  test('gecerli baslikla yeni gorev olusturur', async () => {
    const app = testAppOlustur([]);

    const res = await request(app).post('/tasks').send({ baslik: 'Riza ile toplanti planla' });

    expect(res.status).toBe(201);
    expect(res.body.baslik).toBe('Riza ile toplanti planla');
    expect(res.body.tamamlandi).toBe(false);
    expect(res.body.oncelik).toBe('medium');
  });

  test('gecerli oncelik degeri kabul edilir', async () => {
    const app = testAppOlustur([]);

    const res = await request(app).post('/tasks').send({ baslik: 'Sunum hazirla', oncelik: 'high' });

    expect(res.status).toBe(201);
    expect(res.body.oncelik).toBe('high');
  });

  test('baslik eksikse 400 doner', async () => {
    const app = testAppOlustur([]);

    const res = await request(app).post('/tasks').send({});

    expect(res.status).toBe(400);
    expect(res.body.hata).toMatch(/baslik/);
  });

  test('gecersiz oncelik degerinde 400 doner', async () => {
    const app = testAppOlustur([]);

    const res = await request(app).post('/tasks').send({ baslik: 'Test gorevi', oncelik: 'acil' });

    expect(res.status).toBe(400);
    expect(res.body.hata).toMatch(/oncelik/);
  });
});

describe('POST /tasks/:id/tamamla', () => {
  test('mevcut gorevi tamamlandi olarak isaretler', async () => {
    const app = testAppOlustur([
      { id: 5, baslik: 'aryuksektepe icin demo hazirla', oncelik: 'medium', tamamlandi: false },
    ]);

    const res = await request(app).post('/tasks/5/tamamla');

    expect(res.status).toBe(200);
    expect(res.body.tamamlandi).toBe(true);
  });

  test('olmayan gorev icin 404 doner', async () => {
    const app = testAppOlustur([]);

    const res = await request(app).post('/tasks/999/tamamla');

    expect(res.status).toBe(404);
  });
});
