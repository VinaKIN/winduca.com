/* WINDUCA theme: menu toàn màn hình (Esc đóng, giữ focus, khóa cuộn) và các mục con. */
(function () {
  var menu = document.getElementById('menu-toan-man-hinh');
  var nutMo = document.querySelector('[data-mo-menu]');
  if (!menu || !nutMo) return;

  function dsFocus() {
    return Array.prototype.slice.call(menu.querySelectorAll('a[href], button:not([disabled])')).filter(function (e) { return e.offsetParent !== null; });
  }
  function mo() {
    menu.hidden = false;
    nutMo.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var d = menu.querySelector('[data-dong-menu]');
    if (d) d.focus();
  }
  function dong() {
    menu.hidden = true;
    nutMo.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    nutMo.focus();
  }
  nutMo.addEventListener('click', mo);
  menu.querySelector('[data-dong-menu]').addEventListener('click', dong);
  document.addEventListener('keydown', function (e) {
    if (menu.hidden) return;
    if (e.key === 'Escape') { dong(); return; }
    if (e.key !== 'Tab') return;
    var ds = dsFocus();
    if (!ds.length) return;
    var dau = ds[0], cuoi = ds[ds.length - 1];
    if (e.shiftKey && document.activeElement === dau) { e.preventDefault(); cuoi.focus(); }
    else if (!e.shiftKey && document.activeElement === cuoi) { e.preventDefault(); dau.focus(); }
  });

  // Mục con: bấm dấu cộng mở/đóng, rê chuột trên màn hình có chuột cũng mở
  function datMuc(nut, mo) {
    var hop = document.getElementById(nut.getAttribute('data-muc-con'));
    if (!hop) return;
    nut.setAttribute('aria-expanded', mo ? 'true' : 'false');
    hop.classList.toggle('grid-rows-[1fr]', mo);
    hop.classList.toggle('grid-rows-[0fr]', !mo);
    var ul = hop.querySelector('ul');
    ul.classList.toggle('invisible', !mo);
    ul.setAttribute('aria-hidden', mo ? 'false' : 'true');
    Array.prototype.forEach.call(ul.querySelectorAll('a'), function (a) { a.tabIndex = mo ? 0 : -1; });
    var dau = nut.querySelector('[data-dau-cong]');
    if (dau) dau.style.transform = mo ? 'scaleY(0)' : '';
  }
  var cacNut = menu.querySelectorAll('[data-muc-con]');
  Array.prototype.forEach.call(cacNut, function (nut) {
    nut.addEventListener('click', function () { datMuc(nut, nut.getAttribute('aria-expanded') !== 'true'); });
    var li = nut.closest('li');
    if (li && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      li.addEventListener('mouseenter', function () {
        Array.prototype.forEach.call(cacNut, function (n) { datMuc(n, n === nut); });
      });
    }
  });
})();
