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

## Bu bir eğitim projesi

Kursun Bölüm 4'ü boyunca bu kod tabanının üstünde çalışılıyor. Bazı yerler **bilerek**
eksik ya da hatalı bırakıldı — hata bildirmeye gerek yok. Neyin nerede eksik olduğunu,
neden öyle bırakıldığını ve nasıl düzeltildiğini ilgili dersin kendisinde göreceksiniz.

Boşlukların listesi ve kök nedenler bu depoda **hiçbir yerde yazmıyor** — ne bu dosyada,
ne kod yorumlarında. Bu bilinçli: derslerin yarısı "belirtiden kök nedene inme"
alıştırması, cevap burada yazsaydı Claude onu okur ve alıştırma buharlaşırdı.

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
