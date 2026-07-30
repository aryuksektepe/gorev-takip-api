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

Bu proje eğitim için hazırlandı. Aşağıdaki eksikler ve hatalar **kasıtlıdır**, hata bildirmeye
gerek yok. Belirtileri yazıyoruz; kök nedenleri yazmıyoruz — derslerin yarısı zaten "belirtiden
kök nedene inme" alıştırması, cevabı burada okursanız o alıştırma buharlaşır.

| Ders | Ne var / ne yok | Nasıl görünür |
|---|---|---|
| 4.3 | Bilinçli bug | Bir görev tamamlanınca `GET /stats`'taki `tamamlanan` sayısı artmıyor. `npm test` yine de tamamen yeşil — bu senaryoyu sınayan test yok. |
| 4.4 | Eksik özellik | `GET /tasks?priority=high\|medium\|low` filtresi yok; derste TDD ile canlı ekleniyor. |
| 4.7 | Tasarım farkı | `public/dashboard.html`, hedef tasarımdan birkaç noktada ayrılıyor. Farkları Claude'a buldurmak dersin kendisi. |
| 4.8 | Refactor hedefi | `src/utils/fileStorage.js` callback tabanlı. `test/fileStorage.test.js` davranışı zaten kapsıyor; derste davranış korunarak async/await'e taşınıyor. |
| 4.5 · 4.6 · 4.9 · 4.10 | Git ve GitHub | Branch, conflict, PR ve worktree senaryoları bu proje üzerinden gösteriliyor. Branch'ler geçici olduğu için repoda durmuyor; `main` her zaman yukarıdaki başlangıç durumunu taşır. |

<details>
<summary>Eğitmen / takıldıysanız: kök nedenler (spoiler)</summary>

- **4.3** — Kök neden `src/stats.js`'te değil; `src/routes/tasks.js`'teki tamamlama uç noktası
  `stats.tamamlananiArttir()` çağrısını atlıyor. Belirti ile neden farklı dosyada.
- **4.7** — Dört fark: 2 sütunlu grid (hedef 3 sütun), tutarsız boşluklar (hedef `1.5rem`),
  lacivert başlık (hedef mercan `#D97757`), oluşturma sırası (hedef öncelik sırası).

</details>

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
