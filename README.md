# gorev-takip-api

Basit bir görev takip API'si — Node.js + Express + Jest (Supertest ile).
**Claude Code ile Yazılım Geliştirme** kursunun **Bölüm 4**'ünde, ders 4.2'den 4.10'a kadar
ekranda tekrar tekrar kullanılan ortak kod tabanı budur. Aynı adımları kendiniz de
uygulamak isterseniz bu repoyu klonlayabilirsiniz.

## Kurulum ve çalıştırma

```bash
npm install
npm test          # Jest — 12 test, hepsi yeşil
npm start         # http://localhost:3000 · /tasks, /stats, /dashboard.html
```

## Derslere göre bilerek bırakılan boşluklar

Bu proje eğitim için hazırlandı; aşağıdakiler **kasıtlıdır**, hata bildirmeye gerek yok.

**Ders 4.3 — bilinçli bug.** Bir görev `POST /tasks/:id/tamamla` ile tamamlandığında
`GET /stats`'taki `tamamlanan` sayısı güncellenmiyor. Kök neden `src/stats.js`'te değil;
`src/routes/tasks.js`'teki tamamlama uç noktası `stats.tamamlananiArttir()`'i çağırmayı
atlıyor. `npm test` başlangıçta tamamen yeşil — çünkü bu senaryoyu sınayan bir test henüz
yok. Derste önce kırmızı test yazılıyor, sonra düzeltiliyor.

**Ders 4.4 — eksik özellik.** `GET /tasks?priority=high|medium|low` filtresi bilerek yok;
derste TDD ile (önce test, sonra kod) canlı ekleniyor.

**Ders 4.7 — tasarım farkı.** `public/dashboard.html` hedef tasarımdan küçük farklarla
ayrılıyor: 2 sütunlu grid (hedef 3 sütun), tutarsız boşluklar (hedef `1.5rem`), lacivert
başlık rengi (hedef mercan `#D97757`), görevler oluşturma sırasına göre listeleniyor
(hedef önceliğe göre sıralı).

**Ders 4.8 — refactor hedefi.** `src/utils/fileStorage.js` bilerek callback tabanlı
(`saveTasksToFile(gorevler, callback)`, `loadTasksFromFile(callback)`).
`test/fileStorage.test.js` bu davranışı zaten kapsıyor; derste aynı davranış korunarak
async/await'e taşınıyor.

**Ders 4.5 / 4.6 / 4.9 / 4.10 — git ve GitHub.** Branch, conflict, PR ve worktree
senaryoları bu proje üzerinden gösteriliyor. Branch'ler geçici olduğu için repoda durmuyor;
`main` her zaman yukarıdaki başlangıç durumunu taşır.

## Yapı

```
src/server.js            HTTP sunucusunu başlatır
src/app.js               Express uygulaması ve yönlendirme
src/routes/tasks.js      görev uç noktaları
src/routes/stats.js      istatistik uç noktası
src/models/taskStore.js  bellek içi görev deposu
src/stats.js             istatistik hesapları
src/utils/fileStorage.js dosyaya yazma/okuma (callback tabanlı)
public/dashboard.html    basit arayüz
test/                    Jest testleri
```

## Lisans

Eğitim amaçlı kullanım içindir.
