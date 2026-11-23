// Calendly erst nach Klick laden (keine Verbindung zu Calendly ohne Zustimmung).
(function () {
  var btn = document.getElementById('calendly-load');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var frame = document.getElementById('calendly-frame');
    var lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    var src = btn.getAttribute('data-url') +
      '?embed_type=Inline&embed_domain=' + encodeURIComponent(location.hostname) +
      '&hide_gdpr_banner=1&locale=' + lang;
    var f = document.createElement('iframe');
    f.src = src;
    f.title = lang === 'en' ? 'Book a meeting (Calendly)' : 'Termin buchen (Calendly)';
    f.loading = 'lazy';
    f.setAttribute('allow', 'payment');
    frame.appendChild(f);
    frame.hidden = false;
    document.getElementById('calendly-consent').hidden = true;
  });
})();
