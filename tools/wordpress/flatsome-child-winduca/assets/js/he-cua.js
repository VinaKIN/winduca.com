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
  var CMP = [];
  var BUOC = 1;

  function e(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function khop(r, boQua) {
    if (boQua === true) boQua = 'b';
    if (boQua !== 'b' && S.b && r.hang !== S.b) return false;
    if (boQua !== 'k' && S.k.length && !S.k.some(function (k) { return r.ketCau === k || r.ketCau === 'tn'; })) return false;
    if (boQua !== 'f' && S.f.length && !S.f.some(function (f) { return r.tags.indexOf(f) >= 0; })) return false;
    if (boQua !== 'h' && S.h.length && !S.h.some(function (h) { return r.he.indexOf(h) >= 0; })) return false;
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

  function dsHtml() {
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
      h += '<li><label class="wd-hc-sosanh"><input type="checkbox" data-c="' + r.id + '"' + (CMP.indexOf(r.id) >= 0 ? ' checked' : '') + ' aria-label="So sánh ' + e(HANG[r.hang] + ' ' + r.ma) + '"><span>So sánh</span></label><button type="button" class="wd-hc-the" data-id="' + r.id + '"><span class="wd-hc-anh">' + anh(r) + '</span>' +
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
    if (CMP.length) {
      h += '<div class="wd-hc-bar" role="status">Đã chọn ' + CMP.length + '/3 hệ <button type="button" data-ss="1"' + (CMP.length < 2 ? ' disabled' : '') + '>So sánh</button> <button type="button" data-bo="1">Bỏ chọn</button></div>';
    }
    return h;
  }

  var BUOC_TEN = [['Hãng', 'Chọn hãng', 'Bỏ trống để xem cả ba hãng.'], ['Loại hệ', 'Chọn loại hệ', 'Chọn một hoặc nhiều loại hệ cửa.'],
    ['Đặc điểm', 'Chọn đặc điểm', 'Kết cấu và chức năng bạn quan tâm, hoặc tìm theo mã hệ.'], ['Danh sách', 'Danh sách hệ cửa', 'Bấm thẻ để xem thông số, tích ô góc thẻ để so sánh.'],
    ['So sánh', 'So sánh và tư vấn', 'Đặt tối đa 3 hệ cạnh nhau hoặc nhận tư vấn.']];
  var ANH_HANG = { '': '/images/he-cua/mau-goc/civro-xw65-g1.webp', romadio: '/images/he-cua/mau-goc/romadio-rd80fd-g1.webp', civro: '/images/he-cua/mau-goc/civro-xd65-g1.webp', ponzio: '/images/he-cua/mau-goc/ponzio-ws-65-thi-g1.webp' };
  var ANH_HE = { w: '/images/he-cua/mau-goc/civro-xw65-g1.webp', d: '/images/he-cua/mau-goc/civro-xd65-g1.webp', s: '/images/he-cua/mau-goc/civro-pd65-enfini-pro-g1.webp', l: '/images/he-cua/mau-goc/romadio-rd120ls-ss-g1.webp', f: '/images/he-cua/mau-goc/romadio-rd80fd-g1.webp', v: '/images/he-cua/mau-goc/romadio-rct65-g1.webp' };
  var MO_TA = { t: 'Khung nhôm có thanh cầu ngăn dẫn nhiệt.', n: 'Khung nhôm liền, gọn nhẹ.', cn: 'U-value thấp theo số liệu hãng.', an: 'Chống đột nhập từ cấp RC2 trở lên.', de: 'Ngưỡng thấp, dễ đi qua.', sm: 'Vận hành bằng động cơ.' };

  function demHang(h) { return DU.filter(function (r) { return khop(r, 'b') && (h === '' || r.hang === h); }).length; }
  function demNhom(g, v) {
    return DU.filter(function (r) {
      if (!khop(r, g)) return false;
      if (g === 'h') return r.he.indexOf(v) >= 0;
      if (g === 'k') return r.ketCau === v || r.ketCau === 'tn';
      return r.tags.indexOf(v) >= 0;
    }).length;
  }
  function theChon(attrs, bat, anhP, ten, n, mota) {
    return '<button type="button" class="wd-hc-chon" ' + attrs + ' aria-pressed="' + bat + '"' + (n === 0 && !bat ? ' disabled' : '') + '>' +
      (anhP ? '<span class="wd-hc-chon-anh"><img src="' + e(url(anhP)) + '" alt="" loading="lazy"></span>' : '') +
      '<strong>' + e(ten) + '</strong>' + (mota ? '<span class="wd-hc-chon-mt">' + e(mota) + '</span>' : '') + '<em>' + n + ' hệ</em></button>';
  }
  function buocHtml() {
    var h = '';
    if (BUOC === 1) {
      h += '<div class="wd-hc-chon-luoi">';
      [['', 'Tất cả hãng'], ['romadio', 'Romadio'], ['civro', 'Civro'], ['ponzio', 'Ponzio']].forEach(function (t) {
        h += theChon('data-b="' + t[0] + '"', S.b === t[0], ANH_HANG[t[0]], t[1], demHang(t[0]));
      });
      return h + '</div>';
    }
    if (BUOC === 2) {
      h += '<div class="wd-hc-chon-luoi wd-hc-chon-6">';
      NHOM[0][2].forEach(function (o) { h += theChon('data-k="h" data-v="' + o[0] + '"', S.h.indexOf(o[0]) >= 0, ANH_HE[o[0]], o[1], demNhom('h', o[0])); });
      return h + '</div>';
    }
    if (BUOC === 3) {
      [1, 2].forEach(function (i) {
        var g = NHOM[i];
        h += '<h4 class="wd-hc-chon-tieu">' + g[1] + '</h4><div class="wd-hc-chon-luoi wd-hc-chon-4">';
        g[2].forEach(function (o) { h += theChon('data-k="' + g[0] + '" data-v="' + o[0] + '"', S[g[0]].indexOf(o[0]) >= 0, '', o[1], demNhom(g[0], o[0]), MO_TA[o[0]]); });
        h += '</div>';
      });
      return h + '<div class="wd-hc-tim wd-hc-tim-buoc"><span>Tìm theo mã hệ</span><input type="search" id="wd-hc-q" placeholder="XW98, WS 75 THI…" aria-label="Tìm hệ cửa" value="' + e(S.q) + '"></div>';
    }
    if (BUOC === 4) return dsHtml();
    var ds = CMP.length;
    h += '<div class="wd-hc-b5"><div class="wd-hc-b5-tt"><h4>So sánh các hệ đã chọn</h4><p>' + (ds ? 'Bạn đã chọn ' + ds + '/3 hệ ở bước danh sách.' : 'Bạn chưa tích ô so sánh ở bước danh sách. Quay lại bước 4 và tích tối đa 3 hệ.') + '</p>' +
      '<p><button type="button" class="button primary" data-ss="1"' + (ds < 2 ? ' disabled' : '') + '>Xem bảng so sánh</button></p></div>' +
      '<div class="wd-hc-b5-tt"><h4>Bước tiếp theo</h4><p>Gửi nhu cầu cho đội ngũ WINDUCA, kèm hệ bạn quan tâm, để được tư vấn theo công trình.</p>' +
      '<p><a class="button primary" href="' + e(LIEN_HE) + '">Nhận tư vấn</a> <a class="button is-outline" href="' + e(TEL) + '">Gọi ' + e(HOTLINE) + '</a></p></div></div>';
    return h;
  }
  function dung() {
    var n = DU.filter(function (r) { return khop(r); }).length;
    var h = '<ol class="wd-hc-buoc" aria-label="Các bước chọn hệ">';
    BUOC_TEN.forEach(function (b, i) {
      h += '<li><button type="button" data-buoc="' + (i + 1) + '"' + (BUOC === i + 1 ? ' aria-current="step"' : '') + '><i>' + (i + 1) + '</i><span>' + b[0] + '</span></button></li>';
    });
    h += '</ol><div class="wd-hc-buoc-dau"><p class="wd-hc-hang">Bước ' + BUOC + ' / 5</p><h3>' + BUOC_TEN[BUOC - 1][1] + '</h3><p>' + BUOC_TEN[BUOC - 1][2] + '</p></div>';
    h += buocHtml();
    if (BUOC !== 4) {
      h += '<div class="wd-hc-dieu"><button type="button" class="button is-outline" data-lui="1"' + (BUOC === 1 ? ' disabled' : '') + '>Quay lại</button>' +
        '<span role="status" aria-live="polite">' + n + ' / ' + DU.length + ' hệ phù hợp</span>' +
        '<button type="button" class="button primary" data-tien="1"' + (BUOC === 5 ? ' disabled' : '') + '>' + (BUOC === 3 ? 'Xem ' + n + ' hệ' : 'Tiếp theo') + '</button></div>';
    } else {
      h += '<div class="wd-hc-dieu"><button type="button" class="button is-outline" data-lui="1">Quay lại</button><span></span><button type="button" class="button primary" data-tien="1">So sánh và tư vấn</button></div>';
    }
    if (CMP.length && BUOC !== 4) h += '<div class="wd-hc-bar" role="status">Đã chọn ' + CMP.length + '/3 hệ <button type="button" data-ss="1"' + (CMP.length < 2 ? ' disabled' : '') + '>So sánh</button> <button type="button" data-bo="1">Bỏ chọn</button></div>';
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
  function soSanh() {
    var ds = CMP.map(function (id) { return DU.filter(function (x) { return x.id === id; })[0]; }).filter(Boolean);
    var dong6 = [['U-value (W/m²K)', 'u'], ['Kín khí', 'kinKhi'], ['Cách âm', 'cachAm'], ['Kín nước', 'kinNuoc'], ['Chịu gió', 'chiuGio'], ['Chống đột nhập', 'chongTrom']]
      .filter(function (d) { return ds.some(function (r) { return r[d[1]]; }); });
    var h = '<div class="wd-hc-nen" id="wd-hc-hop"><div class="wd-hc-hop wd-hc-hop-rong" role="dialog" aria-modal="true" aria-label="So sánh các hệ đã chọn"><button type="button" class="wd-hc-dong" aria-label="Đóng">×</button><div class="wd-hc-phai"><p class="wd-hc-hang">So sánh</p><h3>Các hệ đã chọn</h3><div class="wd-hc-cuon"><table class="wd-hc-bang-ss"><thead><tr><th></th>' +
      ds.map(function (r) { return '<th><span class="wd-hc-hang">' + HANG[r.hang] + '</span><br>' + e(r.ma) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      dong6.map(function (d) { return '<tr><th>' + d[0] + '</th>' + ds.map(function (r) { return '<td>' + (e(r[d[1]]) || '—') + '</td>'; }).join('') + '</tr>'; }).join('') +
      '<tr><th>Nhãn</th>' + ds.map(function (r) { return '<td>' + (r.tags.map(function (t) { return TAG[t]; }).join(' · ') || '—') + '</td>'; }).join('') + '</tr></tbody></table></div>' +
      '<p class="wd-hc-luu-y">Mọi số liệu do hãng công bố, điều kiện thử có thể khác nhau giữa các hệ. Liên hệ để được tư vấn theo công trình.</p>' +
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
    var bu = t.closest('[data-buoc]');
    if (bu && goc.contains(bu)) { BUOC = +bu.getAttribute('data-buoc'); dung(); return goc.scrollIntoView({ behavior: 'smooth' }); }
    if (t.closest('[data-tien]') && goc.contains(t)) { BUOC = Math.min(5, BUOC + 1); dung(); return goc.scrollIntoView({ behavior: 'smooth' }); }
    if (t.closest('[data-lui]') && goc.contains(t)) { BUOC = Math.max(1, BUOC - 1); dung(); return goc.scrollIntoView({ behavior: 'smooth' }); }
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
    if (t.closest('[data-ss]')) return soSanh();
    if (t.closest('[data-bo]')) { CMP = []; return dung(); }
    if (t.closest('.wd-hc-dong') || t.id === 'wd-hc-hop') dong();
  });
  document.addEventListener('change', function (ev) {
    var c = ev.target.closest && ev.target.closest('[data-c]');
    if (!c || !goc.contains(c)) return;
    var id = +c.getAttribute('data-c'), i = CMP.indexOf(id);
    if (c.checked) { if (CMP.length >= 3) { c.checked = false; alert('Chỉ so sánh tối đa 3 hệ.'); return; } if (i < 0) CMP.push(id); }
    else if (i >= 0) CMP.splice(i, 1);
    dung();
  });
  document.addEventListener('input', function (ev) {
    if (ev.target.id === 'wd-hc-q') { S.q = ev.target.value.trim(); S.p = 1; dung(); }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') dong(); });
  dung();
})();
