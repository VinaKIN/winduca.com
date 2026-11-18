/* WINDUCA: danh sách Hệ cửa (115 hệ): tab hãng, tìm kiếm, lọc nhiều chọn, phân trang, hộp chi tiết có bản vẽ và thông số. */
(function () {
  var goc = document.getElementById('wd-hc');
  var nguon = document.getElementById('wd-hc-du-lieu');
  if (!goc || !nguon) return;
  var DU = JSON.parse(nguon.textContent);
  var ASSET = goc.getAttribute('data-assets');
  var LIEN_HE = goc.getAttribute('data-lien-he');
  var HOTLINE = goc.getAttribute('data-hotline');
  var TEL = goc.getAttribute('data-tel');

  var HANG = { romadio: 'Romadio', civro: 'Civro', ponzio: 'Ponzio' };
  var TAG = { cn: 'Cách nhiệt cao', an: 'An ninh cao', de: 'Dễ tiếp cận', sm: 'Thông minh / Có động cơ' };
  var KC = { t: 'Có cầu cách nhiệt', n: 'Không cầu nhiệt', tn: 'Có cả hai phiên bản' };
  var HE = { w: 'Cửa sổ', d: 'Cửa đi', s: 'Cửa trượt', l: 'Nâng trượt', f: 'Xếp gấp', v: 'Vách kính' };
  var NHOM = [
    ['h', 'Hệ thống', [['w', 'Cửa sổ'], ['d', 'Cửa đi'], ['s', 'Trượt'], ['l', 'Nâng trượt'], ['f', 'Xếp gấp'], ['v', 'Vách kính']]],
    ['k', 'Kết cấu', [['t', 'Có cầu nhiệt'], ['n', 'Không cầu nhiệt']]],
    ['f', 'Chức năng', [['cn', 'Cách nhiệt cao'], ['an', 'An ninh cao'], ['de', 'Dễ tiếp cận'], ['sm', 'Thông minh / Động cơ']]]
  ];
  var MOT = 12;
  var S = { b: '', h: [], k: [], f: [], q: '', p: 1 };

  function e(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function khop(r, boQuaHang) {
    if (!boQuaHang && S.b && r.hang !== S.b) return false;
    if (S.k.length && !S.k.some(function (k) { return r.ketCau === k || r.ketCau === 'tn'; })) return false;
    if (S.f.length && !S.f.some(function (f) { return r.tags.indexOf(f) >= 0; })) return false;
    if (S.h.length && !S.h.some(function (h) { return r.he.indexOf(h) >= 0; })) return false;
    if (S.q && (HANG[r.hang] + ' ' + r.ma + ' ' + r.loai).toLowerCase().indexOf(S.q.toLowerCase()) < 0) return false;
    return true;
  }
  function uVal(r) {
    var s = r.u || '';
    if (!s) return '';
    if (s.charAt(0) === '≥') return s;
    var m = s.replace(/\([^)]*\)/g, '').match(/\d+[.,]\d+|\d+/g) || [];
    if (!m.length) return '';
    if (m.length === 1) return m[0];
    m.sort(function (a, b) { return parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.')); });
    return m[0] === m[m.length - 1] ? m[0] : m[0] + '–' + m[m.length - 1];
  }
  function dbVal(r) {
    var n = (r.cachAm || '').replace(/\s*dB/i, '').trim();
    if (!n) return '';
    return /^đến /i.test(n) ? '≤ ' + n.replace(/^đến /i, '') : n;
  }
  function url(p) { return ASSET + p; }
  function anh(r) {
    var a = (r.anh.c && r.anh.c[0]) || (r.anh.d && r.anh.d[0]);
    return a ? '<img src="' + e(url(a)) + '" alt="' + e(HANG[r.hang] + ' ' + r.ma) + '" loading="lazy">' : '<span class="wd-hc-khong">Bản vẽ đang được cập nhật</span>';
  }
  function chiSo(r) {
    var ds = [['U-value', uVal(r)], ['Cách âm · dB', dbVal(r)], ['Kín nước', r.kinNuoc]];
    if (!ds.some(function (x) { return x[1]; })) return '<p class="wd-hc-chua">Hãng chưa công bố thông số</p>';
    return '<dl class="wd-hc-so">' + ds.map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + (e(x[1]) || '—') + '</dd></div>'; }).join('') + '</dl>';
  }

  function dung() {
    var ds = DU.filter(function (r) { return khop(r); });
    var soTrang = Math.max(1, Math.ceil(ds.length / MOT));
    if (S.p > soTrang) S.p = soTrang;
    var bd = (S.p - 1) * MOT;
    var h = '<div class="wd-hc-thanh"><div class="wd-hc-tab" role="group" aria-label="Lọc theo hãng">';
    [['', 'Tất cả'], ['romadio', 'Romadio'], ['civro', 'Civro'], ['ponzio', 'Ponzio']].forEach(function (t) {
      var n = DU.filter(function (r) { return khop(r, true) && (t[0] === '' || r.hang === t[0]); }).length;
      h += '<button type="button" data-b="' + t[0] + '" aria-pressed="' + (S.b === t[0]) + '">' + t[1] + ' <em>' + n + '</em></button>';
    });
    h += '</div><div class="wd-hc-tim"><span role="status" aria-live="polite">' + ds.length + ' / ' + DU.length + ' hệ</span>' +
      '<input type="search" id="wd-hc-q" placeholder="Tìm hệ: XW98, WS 75 THI…" aria-label="Tìm hệ cửa" value="' + e(S.q) + '"></div></div>';
    h += '<div class="wd-hc-loc">';
    NHOM.forEach(function (g) {
      h += '<fieldset><legend>' + g[1] + '</legend>';
      g[2].forEach(function (o) {
        h += '<button type="button" data-k="' + g[0] + '" data-v="' + o[0] + '" aria-pressed="' + (S[g[0]].indexOf(o[0]) >= 0) + '">' + o[1] + '</button>';
      });
      h += '</fieldset>';
    });
    if (S.h.length + S.k.length + S.f.length || S.b || S.q) h += '<button type="button" class="wd-hc-xoa" data-xoa="1">Xóa bộ lọc</button>';
    h += '</div><ul class="wd-hc-luoi">';
    ds.slice(bd, bd + MOT).forEach(function (r) {
      h += '<li><button type="button" class="wd-hc-the" data-id="' + r.id + '"><span class="wd-hc-anh">' + anh(r) + '</span>' +
        '<span class="wd-hc-hang">' + HANG[r.hang] + '</span><strong>' + e(r.ma) + '</strong><span class="wd-hc-loai">' + e(r.loai) + '</span>' + chiSo(r) +
        '<span class="wd-hc-tag">' + r.tags.map(function (t) { return '<i>' + TAG[t] + '</i>'; }).join('') + '</span></button></li>';
    });
    if (!ds.length) h += '<li class="wd-hc-rong">Chưa có hệ phù hợp với bộ lọc này. <a href="' + e(LIEN_HE) + '">Liên hệ để được tư vấn</a></li>';
    h += '</ul>';
    if (soTrang > 1) {
      h += '<nav class="wd-hc-trang" aria-label="Phân trang"><span>Hiển thị ' + (bd + 1) + '–' + Math.min(bd + MOT, ds.length) + ' / ' + ds.length + ' hệ</span>';
      for (var i = 1; i <= soTrang; i++) h += '<button type="button" data-p="' + i + '"' + (i === S.p ? ' aria-current="page"' : '') + '>' + i + '</button>';
      h += '</nav>';
    }
    var giu = document.activeElement && document.activeElement.id === 'wd-hc-q';
    goc.innerHTML = h;
    if (giu) { var q = document.getElementById('wd-hc-q'); q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
  }

  function mo(id) {
    var r = DU.filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    var anhs = (r.anh.c || []).concat(r.anh.d || []);
    var spec = [['U-value (W/m²K)', r.u], ['Kín khí', r.kinKhi], ['Cách âm', r.cachAm], ['Kín nước', r.kinNuoc], ['Chịu gió', r.chiuGio], ['Chống đột nhập', r.chongTrom]]
      .filter(function (x) { return x[1]; });
    var he = r.he.split('').map(function (c) { return HE[c]; }).filter(Boolean).join(' / ');
    var h = '<div class="wd-hc-nen" id="wd-hc-hop"><div class="wd-hc-hop" role="dialog" aria-modal="true" aria-label="' + e(HANG[r.hang] + ' ' + r.ma) + '">' +
      '<button type="button" class="wd-hc-dong" aria-label="Đóng">×</button><div class="wd-hc-trai">' +
      (anhs.length ? '<img id="wd-hc-lon" src="' + e(url(anhs[0])) + '" alt="' + e(r.ma) + '">' : '<span class="wd-hc-khong">Chưa có hình</span>') +
      (anhs.length > 1 ? '<div class="wd-hc-nho">' + anhs.map(function (a, i) { return '<button type="button" data-a="' + e(url(a)) + '" aria-label="Hình ' + (i + 1) + '"><img src="' + e(url(a)) + '" alt=""></button>'; }).join('') + '</div>' : '') +
      '</div><div class="wd-hc-phai"><p class="wd-hc-hang">' + e(he) + '</p><h3>' + e(r.ma) + '</h3><p>' + e(r.loai) + (r.ketCau ? ' · ' + KC[r.ketCau] : '') + '</p>' +
      (r.tags.length ? '<p class="wd-hc-tag">' + r.tags.map(function (t) { return '<i>' + TAG[t] + '</i>'; }).join('') + '</p>' : '') +
      chiSo(r) + (spec.length ? '<dl class="wd-hc-bang">' + spec.map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + e(x[1]) + '</dd></div>'; }).join('') + '</dl>' : '') +
      (r.ghiChu ? '<p>' + e(r.ghiChu) + '</p>' : '') +
      '<p class="wd-hc-luu-y">' + (r.them ? 'Thông tin lấy từ tài liệu hãng cung cấp' : 'Số liệu do hãng công bố') + ', mang tính tham khảo. Giá trị thực tế phụ thuộc kích thước, kính và cấu hình công trình; vui lòng liên hệ để được xác nhận.</p>' +
      '<p><a class="button primary" href="' + e(LIEN_HE) + '">Nhận tư vấn</a> <a class="button is-outline" href="' + e(TEL) + '">Gọi ' + e(HOTLINE) + '</a></p></div></div></div>';
    var d = document.createElement('div');
    d.innerHTML = h;
    document.body.appendChild(d.firstChild);
    document.body.style.overflow = 'hidden';
    document.querySelector('.wd-hc-dong').focus();
  }
  function dong() {
    var x = document.getElementById('wd-hc-hop');
    if (x) { x.parentNode.removeChild(x); document.body.style.overflow = ''; }
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target;
    var b = t.closest('[data-b]');
    if (b && goc.contains(b)) { S.b = b.getAttribute('data-b'); S.p = 1; return dung(); }
    var k = t.closest('[data-k]');
    if (k && goc.contains(k)) {
      var kk = k.getAttribute('data-k'), v = k.getAttribute('data-v'), i = S[kk].indexOf(v);
      if (i >= 0) S[kk].splice(i, 1); else S[kk].push(v);
      S.p = 1; return dung();
    }
    if (t.closest('[data-xoa]')) { S = { b: '', h: [], k: [], f: [], q: '', p: 1 }; return dung(); }
    var p = t.closest('[data-p]');
    if (p) { S.p = +p.getAttribute('data-p'); dung(); return goc.scrollIntoView({ behavior: 'smooth' }); }
    var th = t.closest('.wd-hc-the');
    if (th) return mo(+th.getAttribute('data-id'));
    var nh = t.closest('.wd-hc-nho button');
    if (nh) { document.getElementById('wd-hc-lon').src = nh.getAttribute('data-a'); return; }
    if (t.closest('.wd-hc-dong') || t.id === 'wd-hc-hop') dong();
  });
  document.addEventListener('input', function (ev) {
    if (ev.target.id === 'wd-hc-q') { S.q = ev.target.value.trim(); S.p = 1; dung(); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') dong(); });
  dung();
})();
