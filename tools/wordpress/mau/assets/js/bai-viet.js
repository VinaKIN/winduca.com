/* Trang bài viết: thanh tiến độ đọc và mục lục nổi đánh dấu mục đang đọc. */
(function () {
  var bar = document.querySelector('[data-tien-do]');
  var than = document.getElementById('than-bai');
  if (bar && than) {
    var chay = bar.firstElementChild;
    var cuon = function () {
      var r = than.getBoundingClientRect();
      var tong = r.height - window.innerHeight * 0.5;
      var p = Math.min(1, Math.max(0, -r.top / Math.max(1, tong)));
      chay.style.transform = 'scaleX(' + p + ')';
      bar.setAttribute('aria-valuenow', Math.round(p * 100));
    };
    cuon();
    window.addEventListener('scroll', cuon, { passive: true });
    window.addEventListener('resize', cuon);
  }
  var mucLuc = document.querySelector('[data-muc-luc]');
  if (mucLuc && 'IntersectionObserver' in window) {
    var links = mucLuc.querySelectorAll('a');
    var dat = function (id) {
      Array.prototype.forEach.call(links, function (a) {
        var dang = a.getAttribute('href') === '#' + id;
        a.classList.toggle('border-accent', dang);
        a.classList.toggle('font-semibold', dang);
        a.classList.toggle('text-than-chi', dang);
        a.classList.toggle('border-transparent', !dang);
        a.classList.toggle('text-than-chi/70', !dang);
        if (dang) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    };
    var ob = new IntersectionObserver(function (es) {
      var t = es.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
      if (t) dat(t.target.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    Array.prototype.forEach.call(links, function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) ob.observe(el);
    });
    if (links[0]) dat(links[0].getAttribute('href').slice(1));
  }
})();
