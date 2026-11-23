# eosconsulting.de

Website der eosconsulting GmbH – statische Seite (HTML/CSS, keine Build-Pipeline), ausgeliefert mit nginx im Docker-Container über Coolify auf Vordock (Hetzner, DE).

## Struktur

```
site/                 Website-Inhalte (wird 1:1 ausgeliefert)
  index.html          Startseite: Schriftfeld, Leistungen, Profil, Kontakt
  impressum/          Impressum
  datenschutz/        Datenschutzerklärung
  404.html            Fehlerseite
  assets/style.css    Gestaltung (Taubenblau #7f95ae, Schieferblau #1c2633)
  assets/fonts/       Archivo (variabel), selbst gehostet, SIL OFL 1.1
nginx.conf            Server-Konfiguration inkl. 301-Umleitungen der alten Jimdo-URLs
Dockerfile            nginx:alpine-Image
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
