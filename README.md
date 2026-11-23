# eosconsulting.de

Website der eosconsulting GmbH – statische Seite (HTML/CSS, keine Build-Pipeline), ausgeliefert mit nginx im Docker-Container über Coolify auf Vordock (Hetzner, DE).

## Struktur

1:1-Nachbau der bisherigen Jimdo-Creator-Seite (Inhalte, Bilder, Layout, Schriften, Farben, URLs).

```
site/                      Website (wird 1:1 ausgeliefert)
  index.html               Service (Startseite)
  service/…, profil/…      Unterseiten mit denselben URLs wie bei Jimdo
  klienten/, kommunikation/, karriere/, kontakt/
  about/                   Impressum (Original-URL)
  datenschutz/             Datenschutzerklärung (neu, ersetzt /j/privacy)
  assets/jimdo.css         Layout nach Original-CSS (Georgia-Navigation, Exo-Überschriften #75a0ca, Lucida-Text #6f6f6f)
  assets/img/              Original-Bilder aus Jimdo
  assets/fonts/            Exo, Open Sans, Lora – selbst gehostet (SIL OFL 1.1)
  assets/kontakt.js        Kontaktformular -> öffnet Mail an haucke@eosconsulting.de
nginx.conf                 Server-Konfiguration inkl. Umleitungen (/j/privacy, /impressum)
Dockerfile                 nginx:alpine-Image
```

Keine Cookies, kein Tracking, keine externen Ressourcen, keine Zugriffsprotokolle.

## Deployment (Coolify)

1. Coolify → Projekt → **New Resource → Public Repository** → `https://github.com/mirko-cdx/eosconsulting`, Branch `main`.
2. Build Pack: **Dockerfile**, Port: **80**.
3. Domains: `https://eosconsulting.de,https://www.eosconsulting.de` (www wird von nginx auf die Hauptdomain umgeleitet).
4. Optional: Auto-Deploy bei Push aktivieren (Webhook).

## DNS (bleibt bei Strato)

Nur die Web-Einträge ändern – Mail-Einträge (MX, SPF, DKIM, Autodiscover für Microsoft 365) **nicht anfassen**:

| Name | Typ | Wert |
|---|---|---|
| `@` | A | `46.225.220.100` |
| `@` | AAAA | entfernen (zeigt noch auf alten Server) |
| `www` | CNAME → A | `46.225.220.100` (CNAME auf `web.jimdo.com` ersetzen) |

## Lokal ansehen

```
docker build -t eosconsulting . && docker run --rm -p 8080:80 eosconsulting
```
