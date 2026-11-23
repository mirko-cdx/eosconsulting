// Kontaktformular ohne Server: erzeugt eine fertige E-Mail im Mailprogramm des Besuchers.
(function () {
  var f = document.getElementById('kontaktformular');
  if (!f) return;
  var en = f.getAttribute('data-lang') === 'en';
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = f.elements['Name'].value.trim();
    var mail = f.elements['E-Mail'].value.trim();
    var msg = f.elements['Nachricht'].value.trim();
    var subject = (en ? 'Enquiry via eosconsulting.de' : 'Anfrage über eosconsulting.de') + (name ? ' – ' + name : '');
    var body = msg + '\n\n--\n' + name + '\n' + mail;
    window.location.href = 'mailto:haucke@eosconsulting.de?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
