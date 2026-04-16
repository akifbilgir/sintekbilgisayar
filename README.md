# Sintek Bilgisayar — Kurumsal Web Sitesi

Saf HTML + CSS + JS ile oluşturulmuş statik kurumsal web sitesi. GitHub Pages üzerinden yayınlanır.

## Yayınlama (GitHub Pages)

1. Yeni bir GitHub repo oluşturun (public)
2. Bu klasörün tüm içeriğini `main` branch'e push edin
3. Repo → **Settings** → **Pages** → Source: `Deploy from a branch` → `main` / `/ (root)`
4. 1–2 dakika sonra `https://kullaniciadi.github.io/repo-adi/` adresinde yayında

## Özel Domain Eklemek

1. DNS sağlayıcınızda `CNAME` kaydı oluşturun → `kullaniciadi.github.io`
2. Bu klasöre `CNAME` adlı bir dosya ekleyin, içine yalnızca domain adını yazın: `www.firmaadiniz.com.tr`
3. Repo → Settings → Pages → Custom domain alanına domain adını girin

## Güncellenecek Alanlar

Aşağıdaki `[PLACEHOLDER]` ifadelerini tüm dosyalarda arayıp gerçek bilgilerle değiştirin:

| Placeholder | Açıklama |
|---|---|
| `Sintek Bilgisayar` | Firmanızın adı |
| `[TELEFON]` / `+90XXXXXXXXXX` | Telefon ve WhatsApp numarası |
| `info@sintekbilgisayar.com.tr` | Kurumsal e-posta |
| `[ŞEHİR]`, `[İLÇE]`, `[Adres]` | Adres bilgileri |
| `[YIL]` | Kuruluş yılı |

## Logo ve Görseller

- `assets/img/logo.svg` — Firma logosu (SVG önerilir, PNG de çalışır)
- `assets/img/partners/link.svg` — Link logosu
- `assets/img/partners/mysoft.svg` — Mysoft logosu
- `assets/img/partners/arkimza.svg` — Arkimza logosu
- `assets/img/` — Diğer görseller

## Dosya Yapısı

```
gun2/
├── index.html          Anasayfa
├── hakkimizda.html     Hakkımızda
├── hizmetler.html      Hizmetler
├── e-donusum.html      e-Dönüşüm
├── is-ortaklari.html   İş Ortakları
├── referanslar.html    Referanslar
├── iletisim.html       İletişim
├── 404.html            Hata sayfası
├── blog/
│   ├── index.html
│   ├── e-fatura-gecis-rehberi.html
│   ├── erp-secim-kriterleri.html
│   ├── e-defter-saklama.html
│   └── kvkk-ve-muhasebe.html
├── assets/
│   ├── css/            base.css, layout.css, components.css
│   ├── js/             main.js, cookie-kvkk.js
│   └── img/            Görseller ve logolar
└── favicon.svg
```

## Yerel Test

```bash
python -m http.server 8000
# Tarayıcıda: http://localhost:8000
```
