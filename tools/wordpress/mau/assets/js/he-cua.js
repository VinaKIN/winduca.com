/* WINDUCA: trang Hệ cửa (115 hệ). Bản vanilla JS của HeCuaDanhSach.tsx: tab hãng, tìm kiếm, lọc nhiều chọn, phân trang,
   so sánh tối đa 3 hệ, hộp chi tiết có thư viện ảnh, bộ lọc điện thoại và hộp "Chọn hệ" 5 bước. */
(function () {
  var nguon = document.getElementById('wd-he-cua');
  var goc = document.getElementById('wd-he-cua-app');
  if (!nguon || !goc) return;
  var DU = JSON.parse(nguon.textContent);
  var ASSET = goc.getAttribute('data-assets');
  var LIEN_HE = goc.getAttribute('data-lien-he');
  var HOTLINE = goc.getAttribute('data-hotline');
  var HOTLINE_TEL = goc.getAttribute('data-tel');

  var TEN_HANG = { romadio: 'Romadio', civro: 'Civro', ponzio: 'Ponzio' };
  var TEN_TAG = { cn: 'Cách nhiệt cao', an: 'An ninh cao', de: 'Dễ tiếp cận', sm: 'Thông minh / Có động cơ' };
  var TEN_KET_CAU = { t: 'Có cầu cách nhiệt', n: 'Không cầu nhiệt', tn: 'Có cả hai phiên bản' };
  var TEN_HE = { w: 'Cửa sổ', d: 'Cửa đi', s: 'Cửa trượt', l: 'Nâng trượt', f: 'Xếp gấp', v: 'Vách kính' };
  var TAB_HANG = [['', 'Tất cả'], ['romadio', 'Romadio'], ['civro', 'Civro'], ['ponzio', 'Ponzio']];
  var NHOM_LOC = [
    { k: 'h', ten: 'Hệ thống', o: [['w', 'Cửa sổ'], ['d', 'Cửa đi'], ['s', 'Trượt'], ['l', 'Nâng trượt'], ['f', 'Xếp gấp'], ['v', 'Vách kính']] },
    { k: 'k', ten: 'Kết cấu', o: [['t', 'Có cầu nhiệt'], ['n', 'Không cầu nhiệt']] },
    { k: 'f', ten: 'Chức năng', o: [['cn', 'Cách nhiệt cao'], ['an', 'An ninh cao'], ['de', 'Dễ tiếp cận'], ['sm', 'Thông minh / Động cơ']] }
  ];
  var SAN_KHAU = 'bg-[radial-gradient(ellipse_at_50%_36%,#ffffff_0%,#f2f5f9_50%,#dfe5ee_100%)]';
  var NHAN_NHO = 'text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]';
  var KHONG_CONG_BO = 'Hãng chưa công bố';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function url(u) { return /^https?:/.test(u) ? u : ASSET + u; }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- trạng thái ---------- */
  var loc = docLoc();
  var cmp = [];
  var chiTiet = null; // id hệ đang xem
  function docLoc() {
    var p = new URLSearchParams(location.search);
    function ds(k) { return (p.get(k) || '').split(',').filter(Boolean); }
    var b = p.get('b');
    return { b: b && TEN_HANG[b] ? b : '', k: ds('k'), f: ds('f'), h: ds('h'), q: p.get('q') || '', p: Math.max(1, Number(p.get('p')) || 1) };
  }
  function ghiUrl() {
    var p = new URLSearchParams();
    if (loc.b) p.set('b', loc.b);
    if (loc.k.length) p.set('k', loc.k.join(','));
    if (loc.f.length) p.set('f', loc.f.join(','));
    if (loc.h.length) p.set('h', loc.h.join(','));
    if (loc.q) p.set('q', loc.q);
    if (loc.p > 1) p.set('p', loc.p);
    var s = p.toString();
    history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
  }

  /* ---------- lọc và định dạng ---------- */
  function khop(r, l, boQuaHang) {
    if (!boQuaHang && l.b && r.hang !== l.b) return false;
    if (l.k.length && !l.k.some(function (k) { return r.ketCau === k || r.ketCau === 'tn'; })) return false;
    if (l.f.length && !l.f.some(function (f) { return r.tags.indexOf(f) >= 0; })) return false;
    if (l.h.length && !l.h.some(function (h) { return r.he.indexOf(h) >= 0; })) return false;
    if (l.q) {
      var t = (TEN_HANG[r.hang] + ' ' + r.ma + ' ' + r.loai).toLowerCase();
      if (t.indexOf(l.q.toLowerCase()) < 0) return false;
    }
    return true;
  }
  function so(s) { return (s.replace(/\([^)]*\)/g, '').match(/\d+[.,]\d+|\d+/g) || []); }
  function uVal(r) {
    var s = r.u; if (!s) return '';
    if (s.charAt(0) === '≥') return s;
    var m = so(s); if (!m.length) return '';
    if (m.length === 1) return m[0];
    var a = m.slice().sort(function (x, y) { return parseFloat(x.replace(',', '.')) - parseFloat(y.replace(',', '.')); });
    return a[0] === a[a.length - 1] ? a[0] : a[0] + '–' + a[a.length - 1];
  }
  function dbVal(r) {
    var n = r.cachAm.replace(/\s*dB/i, '').trim(); if (!n) return '';
    return /^đến /i.test(n) ? '≤ ' + n.replace(/^đến /i, '') : n;
  }
  function giaTri(v) { var t = (v || '').trim(); if (!t) return null; if (/^n\/?a$/i.test(t)) return 'Không áp dụng'; return t; }
  function tenHe(r) { return r.he.split('').map(function (c) { return TEN_HE[c]; }).filter(Boolean); }
  function ketQuaLoc() { return DU.filter(function (r) { return khop(r, loc); }); }
  function soThe() { return window.innerWidth < 620 ? 4 : window.innerWidth < 850 ? 8 : 12; }

  /* ---------- chú thích ---------- */
  var MAU_CT = {
    nhiet: 'bg-[#eef1f5] text-[#374151] [&>svg]:text-[#6b7280]',
    'an-ninh': 'bg-[#1b1d22] text-white [&>svg]:text-white/80',
    kinh: 'bg-[#eef1f5] text-[#374151] [&>svg]:text-[#6b7280]',
    'tien-ich': 'bg-[#eef1f5] text-[#374151] [&>svg]:text-[#6b7280]',
    'thong-minh': 'bg-accent/10 text-accent-dam [&>svg]:text-accent'
  };
  var NHAN_KET_CAU = { t: ['Cầu cách nhiệt', 'Có cầu cách nhiệt'], n: ['Không cầu nhiệt', 'Không có cầu cách nhiệt'], tn: ['Cầu nhiệt tùy chọn', 'Có cả hai phiên bản: có và không có cầu cách nhiệt'] };
  var LOAI_TAG = { cn: 'nhiet', an: 'an-ninh', de: 'tien-ich', sm: 'thong-minh' };
  var NHAN_TAG = { cn: 'Cách nhiệt cao', an: 'An ninh cao', de: 'Dễ tiếp cận', sm: 'Thông minh' };
  function chuThichThe(r) {
    var ds = [];
    if (r.ketCau && NHAN_KET_CAU[r.ketCau]) ds.push({ loai: 'nhiet', nhan: NHAN_KET_CAU[r.ketCau][0], day: NHAN_KET_CAU[r.ketCau][1] });
    var rcm = /RC\d(?:\/RC\d)?/.exec(r.chongTrom); var rc = rcm ? rcm[0] : '';
    if (rc) ds.push({ loai: 'an-ninh', nhan: rc, day: 'Chống đột nhập ' + r.chongTrom });
    var kinh = /^Kính áp dụng:\s*(.+)$/.exec((r.ghiChu || '').trim());
    if (kinh) ds.push({ loai: 'kinh', nhan: 'Kính ' + kinh[1].replace(/\s*mm$/, ''), day: 'Độ dày kính áp dụng: ' + kinh[1] });
    r.tags.forEach(function (t) { if (t === 'an' && rc) return; ds.push({ loai: LOAI_TAG[t], nhan: NHAN_TAG[t], day: TEN_TAG[t] }); });
    return ds;
  }
  function bieuTuongCT(loai) {
    var a = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    if (loai === 'an-ninh') return a + '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>';
    if (loai === 'kinh') return a + '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 3v18M15 3v18"/></svg>';
    if (loai === 'thong-minh') return a + '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>';
    if (loai === 'tien-ich') return a + '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></svg>';
    return a + '<path d="M12 3v11.5a3.5 3.5 0 1 1-3 0V3a1.5 1.5 0 0 1 3 0Z"/></svg>';
  }
  function hangChuThich(r, max, lop) {
    var ds = chuThichThe(r); if (!ds.length) return '';
    var h = ds.slice(0, max).map(function (c) {
      return '<li title="' + esc(c.day) + '" class="inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium leading-none ' + MAU_CT[c.loai] + '">' + bieuTuongCT(c.loai) + '<span class="sr-only">' + esc(c.day) + '. </span><span aria-hidden="true">' + esc(c.nhan) + '</span></li>';
    }).join('');
    var du = ds.slice(max);
    if (du.length) h += '<li title="' + esc(du.map(function (c) { return c.day; }).join('; ')) + '" class="inline-flex h-7 items-center rounded-full border border-dashed border-[#c3cad4] px-2.5 text-[12px] font-medium leading-none text-[#4b5563]">+' + du.length + '</li>';
    return '<ul class="' + lop + '" aria-label="Chú thích đặc điểm">' + h + '</ul>';
  }

  /* ---------- ảnh thẻ ---------- */
  function laAnhChup(u) { return /-p\d\.webp$/.test(u); }
  function hinhMinhHoa() { return '<svg viewBox="0 0 240 200" class="h-[78%] w-[56%]" aria-hidden="true"><rect x="50" y="26" width="140" height="146" rx="3" fill="#20242a"/><rect x="62" y="38" width="116" height="122" fill="#cfd8e0"/></svg>'; }
  function anhThe(r, lopMau) {
    var ten = TEN_HANG[r.hang] + ' ' + r.ma, c = r.anh.c, abs = 'style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0"';
    if (c[0]) {
      var chup = laAnhChup(c[0]); var lop = chup ? 'object-cover' : 'object-contain p-0 md:p-1';
      return (chup ? '' : '<span class="pointer-events-none absolute bottom-[9%] left-1/2 h-4 w-[46%] -translate-x-1/2 rounded-full bg-[#0f1115]/15 blur-md transition-all duration-500 group-hover:w-[52%] group-hover:bg-[#0f1115]/20" aria-hidden="true"></span>') +
        '<img src="' + esc(url(c[0])) + '" alt="Mẫu góc ' + esc(ten) + '" loading="lazy" decoding="async" ' + abs + ' class="' + lop + ' transition-all duration-500 ' + (c[1] ? 'group-hover:opacity-0 ' : '') + lopMau + '">' +
        (c[1] ? '<img src="' + esc(url(c[1])) + '" alt="" aria-hidden="true" loading="lazy" decoding="async" ' + abs + ' class="' + lop + ' opacity-0 transition-all duration-500 group-hover:opacity-100 ' + lopMau + '">' : '');
    }
    if (r.anh.d[0]) return '<img src="' + esc(url(r.anh.d[0])) + '" alt="Bản vẽ mặt cắt ' + esc(ten) + '" loading="lazy" ' + abs + ' class="object-contain p-4 opacity-80 invert ' + lopMau + '">';
    return hinhMinhHoa();
  }

  /* ---------- hộp thoại dùng chung ---------- */
  var hopMo = [];
  function moHop(html, o) {
    o = o || {};
    var truoc = document.activeElement;
    var ngoai = document.createElement('div');
    ngoai.className = 'fixed inset-0 z-[70] flex justify-center bg-[#0a0c0f]/70 backdrop-blur-[2px] ' + (o.duoi ? 'items-end p-0' : 'items-center p-4');
    var trong = document.createElement('div');
    trong.setAttribute('role', 'dialog'); trong.setAttribute('aria-modal', 'true'); trong.setAttribute('aria-label', o.ten || '');
    trong.className = 'relative w-full overflow-auto bg-white ' + (o.duoi ? 'max-h-[85svh] rounded-b-none rounded-t-[22px]' : 'max-h-[90svh] rounded-[22px]') + ' ' + (o.rong ? 'max-w-[1120px] md:grid md:h-[min(620px,90svh)] md:grid-cols-[6fr_5fr] md:overflow-hidden' : 'max-w-[860px]');
    trong.innerHTML = '<button type="button" data-dong aria-label="Đóng" class="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-3xl leading-none text-[#697280] hover:text-than-chi"><span aria-hidden="true">×</span></button>' + html;
    ngoai.appendChild(trong); document.body.appendChild(ngoai);
    var cu = document.body.style.overflow; document.body.style.overflow = 'hidden';
    var h = { ngoai: ngoai, trong: trong, o: o };
    function dong() {
      document.removeEventListener('keydown', phim, true);
      ngoai.remove(); hopMo = hopMo.filter(function (x) { return x !== h; });
      if (!hopMo.length) document.body.style.overflow = cu;
      if (truoc && truoc.focus) try { truoc.focus(); } catch (e) {}
      if (o.khiDong) o.khiDong();
    }
    function phim(e) {
      if (hopMo[hopMo.length - 1] !== h) return;
      if (e.key === 'Escape') { if ($('#zoom-he-cua')) return; e.preventDefault(); dong(); return; }
      if (e.key !== 'Tab') return;
      var ds = $$('button, a[href], input, [tabindex]:not([tabindex="-1"])', trong).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
      if (!ds.length) return;
      var dau = ds[0], cuoi = ds[ds.length - 1];
      if (e.shiftKey && document.activeElement === dau) { e.preventDefault(); cuoi.focus(); }
      else if (!e.shiftKey && document.activeElement === cuoi) { e.preventDefault(); dau.focus(); }
    }
    h.dong = dong;
    document.addEventListener('keydown', phim, true);
    ngoai.addEventListener('click', function (e) { if (e.target === ngoai) dong(); });
    trong.addEventListener('click', function (e) { if (e.target.closest('[data-dong]')) dong(); });
    hopMo.push(h);
    var nut = $('[data-dong]', trong); if (nut) nut.focus();
    return h;
  }

  /* ---------- thẻ và lưới ---------- */
  var DOM = {
    tabs: $('[data-tabs]', goc), dem: $('[data-trang-thai]', goc), tim: $('[data-tim]', goc), loc: $('[data-loc]', goc),
    luoi: $('[data-luoi]', goc), phanTrang: $('[data-phan-trang]', goc), xoaTatCa: $('[data-xoa-tat-ca]', goc),
    soChon: $('[data-so-chon]', goc), thanhSS: $('[data-thanh-so-sanh]'), nutLoc: $('[data-nut-loc]')
  };
  function soLoc() { return loc.k.length + loc.f.length + loc.h.length; }
  function dangLoc() { return soLoc() > 0 || loc.b !== '' || loc.q !== ''; }
  function demHang(id) { return DU.filter(function (r) { return khop(r, loc, true) && (!id || r.hang === id); }).length; }
  function doi(p) { for (var k in p) loc[k] = p[k]; loc.p = p.p || 1; veLai(); }
  function bat(nhom, v) {
    var a = loc[nhom], i = a.indexOf(v);
    loc[nhom] = i >= 0 ? a.filter(function (x) { return x !== v; }) : a.concat(v); loc.p = 1; veLai();
  }

  function theHe(r, i) {
    var chon = cmp.indexOf(r.id) >= 0, ten = TEN_HANG[r.hang] + ' ' + r.ma;
    return '<li style="animation-delay:' + (i * 35) + 'ms" class="the-hien group relative mb-5 grid grid-rows-subgrid row-span-3 gap-y-0 overflow-hidden rounded-[22px] lg:mb-7 border border-[#e3e7ec] bg-white shadow-[0_4px_18px_rgba(15,17,21,0.04)] transition-[border-color,box-shadow,transform] duration-300 focus-within:border-than-chi hover:-translate-y-1 hover:border-than-chi hover:shadow-[0_24px_50px_rgba(15,17,21,0.14)]">' +
      '<div class="' + SAN_KHAU + ' relative flex aspect-[1/0.9] items-center justify-center border-b border-[#e3e7ec]">' +
      '<span class="absolute left-[18px] top-4 z-[1] flex items-center gap-[7px] text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]"><i class="h-1.5 w-1.5 bg-accent" aria-hidden="true"></i>' + esc(TEN_HANG[r.hang]) + '</span>' +
      '<span class="goc-do pointer-events-none absolute inset-0" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' + anhThe(r, 'group-hover:scale-[1.04]') +
      '<label class="absolute right-2 top-1.5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center" title="So sánh"><input type="checkbox" data-ss="' + r.id + '" ' + (chon ? 'checked' : '') + ' aria-label="So sánh ' + esc(ten) + '" class="peer sr-only"><span class="relative block h-7 w-7 rounded-[8px] border border-[#b6bec9] bg-white peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-than-chi"><span class="absolute left-[9px] top-[4px] h-3 w-1.5 rotate-45 border-b-2 border-r-2 border-white ' + (chon ? '' : 'hidden') + '" aria-hidden="true"></span></span></label></div>' +
      '<div class="px-4 pt-4 md:px-5 md:pt-[18px]"><p class="text-[12px] font-medium uppercase tracking-[0.12em] text-[#697280]">' + esc(r.loai) + '</p>' +
      '<h3 class="mt-1.5 text-[clamp(1.0625rem,1.5vw,1.25rem)] font-bold leading-tight tracking-[-0.01em]"><button type="button" data-xem="' + r.id + '" aria-haspopup="dialog" class="text-left after:absolute after:inset-0 after:z-[1] after:content-[\'\'] focus-visible:outline-none"><span class="sr-only">' + esc(TEN_HANG[r.hang]) + ' </span>' + esc(r.ma) + '</button></h3>' +
      hangChuThich(r, 3, 'mt-3 flex flex-wrap content-start gap-1.5') + '</div>' +
      '<div class="flex items-end px-4 pb-4 pt-4 md:px-5 md:pb-5"><span class="inline-flex items-center gap-2 text-[13px] font-bold text-than-chi transition-colors group-hover:text-accent">Xem thông số <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div></li>';
  }

  function veLai(giuTim) {
    var kq = ketQuaLoc(), mot = soThe();
    var soTrang = Math.max(1, Math.ceil(kq.length / mot));
    if (loc.p > soTrang) loc.p = soTrang;
    var batDau = (loc.p - 1) * mot, hien = kq.slice(batDau, batDau + mot);

    DOM.tabs.innerHTML = TAB_HANG.map(function (t) {
      var on = loc.b === t[0];
      return '<button type="button" role="radio" data-hang="' + t[0] + '" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" class="flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-[9px] px-3 py-2 text-sm md:flex-none md:px-4 ' + (on ? 'bg-white font-bold text-than-chi shadow-[0_1px_3px_rgba(15,17,21,0.12),0_0_0_1px_#e3e7ec]' : 'text-[#4b5563] hover:text-than-chi') + '">' + t[1] + '<em class="text-xs not-italic ' + (on ? 'text-accent-text' : 'text-[#697280]') + '">' + demHang(t[0]) + '</em></button>';
    }).join('');
    DOM.dem.textContent = kq.length + ' / ' + DU.length + ' hệ';
    if (!giuTim && document.activeElement !== DOM.tim) DOM.tim.value = loc.q;
    DOM.xoaTatCa.hidden = !dangLoc();
    $('[data-so-chon-nut]', goc).innerHTML = dangLoc() ? '<em class="rounded-full bg-white/90 px-1.5 text-[12px] not-italic text-accent-dam">' + (soLoc() + (loc.b ? 1 : 0)) + '</em>' : '';
    if (DOM.nutLoc) DOM.nutLoc.querySelector('[data-so-loc]').innerHTML = soLoc() > 0 ? '<em class="rounded-full bg-accent px-2 py-0.5 text-[12px] not-italic">' + soLoc() + '</em>' : '';

    DOM.loc.innerHTML = '<span class="mr-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]"><i class="h-px w-4 bg-accent" aria-hidden="true"></i>Lọc theo</span>' + NHOM_LOC.map(function (g) {
      var n = loc[g.k].length, m = DOM.loc.getAttribute('data-mo') === g.k;
      return '<div class="relative"><button type="button" data-nhom="' + g.k + '" aria-expanded="' + m + '" class="flex min-h-11 items-center gap-2 rounded-[10px] border px-4 py-2 text-[13px] ' + (n ? 'border-than-chi bg-than-chi/5 font-bold' : 'border-[#d5dbe3] bg-white hover:border-than-chi') + '">' + g.ten + (n ? '<em class="rounded-full bg-accent px-1.5 text-[12px] not-italic text-white">' + n + '</em>' : '') + '<svg viewBox="0 0 12 8" class="h-2 w-3 transition-transform ' + (m ? 'rotate-180' : '') + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m1 1.5 5 5 5-5"/></svg></button>' +
        '<div role="group" aria-label="' + g.ten + '" ' + (m ? '' : 'hidden') + ' class="absolute left-0 top-[calc(100%+8px)] z-30 flex min-w-[220px] flex-col gap-0.5 rounded-[14px] bg-[#0f1115]/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur">' + g.o.map(function (o) {
          var b = loc[g.k].indexOf(o[0]) >= 0;
          return '<button type="button" data-chon="' + g.k + ':' + o[0] + '" aria-pressed="' + b + '" class="min-h-11 rounded-[8px] px-3 py-2 text-left text-[13px] ' + (b ? 'bg-accent font-bold text-white' : 'text-[#e6e9ee] hover:bg-white/15') + '">' + o[1] + '</button>';
        }).join('') + '</div></div>';
    }).join('') + (soLoc() > 0 ? '<button type="button" data-xoa-loc class="min-h-11 px-2 text-[13px] text-[#697280] underline underline-offset-4 hover:text-than-chi">Xóa lọc</button>' : '');

    DOM.luoi.innerHTML = hien.length ? hien.map(theHe).join('') :
      '<li class="py-16 text-center text-[#697280] sm:col-span-2 lg:col-span-3"><p>Chưa có hệ phù hợp với bộ lọc này.</p><a href="' + esc(LIEN_HE) + '" class="nut nut-chinh mt-5">Liên hệ để được tư vấn</a></li>';

    var pt = '';
    if (kq.length) {
      pt = '<p class="mb-4 text-[13px] tracking-[0.04em] text-[#697280]">Hiển thị ' + (batDau + 1) + '–' + Math.min(batDau + mot, kq.length) + ' / ' + kq.length + ' hệ</p>';
      if (soTrang > 1) {
        pt += '<ul class="inline-flex flex-wrap items-center justify-center gap-2"><li><button type="button" data-trang="' + (loc.p - 1) + '" ' + (loc.p < 2 ? 'disabled' : '') + ' aria-label="Trang trước" class="h-11 w-11 rounded-[10px] border border-[#e3e7ec] bg-white text-[15px] hover:border-than-chi disabled:opacity-35 disabled:hover:border-[#e3e7ec]">‹</button></li>';
        for (var p = 1; p <= soTrang; p++) pt += '<li><button type="button" data-trang="' + p + '" aria-label="Trang ' + p + '" ' + (p === loc.p ? 'aria-current="page"' : '') + ' class="h-11 w-11 rounded-[10px] border text-[15px] ' + (p === loc.p ? 'border-than-chi bg-than-chi text-white' : 'border-[#e3e7ec] bg-white hover:border-than-chi') + '">' + p + '</button></li>';
        pt += '<li><button type="button" data-trang="' + (loc.p + 1) + '" ' + (loc.p >= soTrang ? 'disabled' : '') + ' aria-label="Trang sau" class="h-11 w-11 rounded-[10px] border border-[#e3e7ec] bg-white text-[15px] hover:border-than-chi disabled:opacity-35 disabled:hover:border-[#e3e7ec]">›</button></li></ul>';
      }
    }
    DOM.phanTrang.innerHTML = pt;
    ghiUrl(); capNhatThanhSS();
  }

  /* ---------- so sánh ---------- */
  function capNhatThanhSS() {
    if (!cmp.length) { DOM.thanhSS.hidden = true; return; }
    DOM.thanhSS.hidden = false;
    $('[data-so-ss]', DOM.thanhSS).textContent = 'Đã chọn ' + cmp.length + '/3 hệ';
    $('[data-mo-ss]', DOM.thanhSS).disabled = cmp.length < 2;
  }
  function chonSoSanh(r, bat_) {
    var i = cmp.indexOf(r.id);
    if (bat_ && i < 0) { if (cmp.length >= 3) { $('[data-thong-bao]').textContent = 'Chỉ so sánh tối đa 3 hệ cùng lúc.'; return false; } cmp.push(r.id); }
    if (!bat_ && i >= 0) cmp.splice(i, 1);
    $('[data-thong-bao]').textContent = '';
    capNhatThanhSS();
    $$('[data-ss="' + r.id + '"]').forEach(function (c) {
      c.checked = cmp.indexOf(r.id) >= 0;
      var tick = c.nextElementSibling.firstElementChild; if (tick) tick.classList.toggle('hidden', !c.checked);
    });
    return true;
  }
  function theoId(id) { return DU.filter(function (r) { return r.id === id; })[0]; }
  function bangSoSanh() {
    var ds = cmp.map(theoId);
    if (ds.length < 2) return;
    var dong6 = [['U-value (W/m²K)', 'u'], ['Kín khí', 'kinKhi'], ['Cách âm', 'cachAm'], ['Kín nước', 'kinNuoc'], ['Chịu gió', 'chiuGio'], ['Chống đột nhập', 'chongTrom']];
    var h = '<div class="p-6 md:p-9"><p class="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-text">So sánh</p><h3 class="mt-2.5 text-[clamp(1.75rem,3vw,2.125rem)] font-light leading-[1.15] tracking-[-0.02em]">Các hệ đã chọn</h3><div class="mt-5 overflow-x-auto"><table class="w-full border-collapse text-sm"><thead><tr><th scope="col" class="p-3 text-left font-light text-[#697280]"><span class="sr-only">Thông số</span></th>' +
      ds.map(function (r) { return '<th scope="col" class="border-b border-[#e3e7ec] p-3 text-left font-bold"><span class="block text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]">' + esc(TEN_HANG[r.hang]) + '</span>' + esc(r.ma) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      dong6.filter(function (d) { return ds.some(function (r) { return r[d[1]]; }); }).map(function (d) {
        return '<tr><th scope="row" class="border-b border-[#e3e7ec] p-3 text-left font-light text-[#697280]">' + d[0] + '</th>' + ds.map(function (r) { return '<td class="border-b border-[#e3e7ec] p-3 align-top font-light">' + (esc(r[d[1]]) || '—') + '</td>'; }).join('') + '</tr>';
      }).join('') +
      '<tr><th scope="row" class="border-b border-[#e3e7ec] p-3 text-left font-light text-[#697280]">Nhãn</th>' + ds.map(function (r) { return '<td class="border-b border-[#e3e7ec] p-3 align-top font-light">' + (r.tags.length ? esc(r.tags.map(function (t) { return TEN_TAG[t]; }).join(' · ')) : '—') + '</td>'; }).join('') + '</tr></tbody></table></div>' +
      '<p class="mt-4 text-[13px] leading-[1.75] text-[#697280]">Mọi số liệu do hãng công bố, điều kiện thử có thể khác nhau giữa các hệ. Liên hệ để được tư vấn theo công trình.</p>' +
      '<div class="mt-4 flex flex-wrap gap-3"><a href="' + esc(LIEN_HE) + '" class="nut nut-chinh">Nhận tư vấn</a><a href="' + esc(HOTLINE_TEL) + '" class="nut nut-vien">Gọi ' + esc(HOTLINE) + '</a></div></div>';
    moHop(h, { ten: 'So sánh các hệ đã chọn' });
  }

  /* ---------- hộp chi tiết ---------- */
  function chiSoKyThuat(r) {
    var chinh = [['U-value', giaTri(uVal(r)), 'W/m²K'], ['Cách âm', giaTri(dbVal(r)), 'dB'], ['Kín nước', giaTri(r.kinNuoc), '']];
    var them = [['Kín khí', giaTri(r.kinKhi)], ['Chịu gió', giaTri(r.chiuGio)], ['Chống đột nhập', giaTri(r.chongTrom)]];
    var co = chinh.concat(them).filter(function (x) { return x[1] && x[1] !== 'Không áp dụng'; }).length;
    return { chinh: chinh, them: them, co: co };
  }
  function moChiTiet(id) {
    var ds = ketQuaLoc(), idx = ds.map(function (r) { return r.id; }).indexOf(id);
    var r = theoId(id), tab = 0, k = 0, h = null;
    var loai = [['Mẫu góc', r.anh.c], ['Bản vẽ 2D', r.anh.d], ['Công trình', r.ctr.map(function (x) { return x.src; })]].filter(function (x) { return x[1].length; });
    var ten = TEN_HANG[r.hang] + ' ' + r.ma, cs = chiSoKyThuat(r), ct = chuThichThe(r);

    function khungHinh() {
      var tenTab = loai[tab] && loai[tab][0], banVe = tenTab === 'Bản vẽ 2D', congTrinh = tenTab === 'Công trình';
      var anh = loai[tab] && loai[tab][1][k], thongTin = congTrinh ? r.ctr[k] : null;
      var truoc = idx > 0 ? ds[idx - 1].id : null, sau = idx >= 0 && idx < ds.length - 1 ? ds[idx + 1].id : null;
      var nutDieu = [['Hệ trước', truoc, 'm15 6-6 6 6 6'], ['Hệ sau', sau, 'm9 6 6 6-6 6']].map(function (n) {
        return '<button type="button" aria-label="' + n[0] + '" ' + (n[1] == null ? 'disabled' : 'data-sang="' + n[1] + '"') + ' class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/60 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + n[2] + '"/></svg></button>';
      }).join('');
      var h = '<div class="relative flex min-h-[320px] flex-col bg-[#0c0d10] md:h-full md:min-h-0"><div class="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_50%_38%,rgba(227,25,55,0.26),transparent_62%)]" aria-hidden="true"></div><div class="luoi-ban-ve-toi pointer-events-none absolute inset-0 opacity-70" aria-hidden="true"></div>' +
        '<i class="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-white/40" aria-hidden="true"></i><i class="pointer-events-none absolute bottom-4 right-4 hidden h-5 w-5 border-b border-r border-white/40 md:block" aria-hidden="true"></i>' +
        '<div class="relative z-10 flex items-center justify-between gap-3 pl-5 pr-16 pt-5 md:pr-5"><span class="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white/75"><i class="h-1.5 w-1.5 bg-accent" aria-hidden="true"></i>' + esc(TEN_HANG[r.hang]) + '</span><div class="flex items-center gap-1.5 text-white/80"><span class="mr-1 text-[12px] tabular-nums tracking-[0.12em]" aria-live="polite">' + (idx >= 0 ? (idx + 1) + ' / ' + ds.length : '') + '</span>' + nutDieu + '</div></div>';
      if (anh) {
        h += '<button type="button" data-phong aria-label="Phóng to ảnh" class="relative z-10 mx-5 mt-2 block h-[clamp(240px,46svh,470px)] shrink-0 cursor-zoom-in md:h-auto md:min-h-0 md:flex-1 md:shrink"><span class="relative block h-full w-full"><img src="' + esc(url(anh)) + '" alt="' + esc(tenTab + ' ' + ten) + '" style="position:absolute;inset:0;width:100%;height:100%" class="anh-doi ' + (congTrinh ? 'rounded-[10px] object-cover' : 'object-contain ' + (banVe ? 'p-3 drop-shadow-[0_0_14px_rgba(230,235,244,0.18)]' : 'drop-shadow-[0_26px_30px_rgba(0,0,0,0.55)]')) + '"></span></button>';
        if (thongTin) h += '<p class="relative z-10 mx-5 mt-2 text-[12px] leading-snug text-white/70">' + esc(thongTin.chuThich) + ' · ' + (thongTin.dungMa ? 'Dự án có dùng hệ này theo hãng' : 'Công trình tiêu biểu của hãng') + ' · Nguồn: <a href="' + esc(thongTin.nguon) + '" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-white">' + esc(thongTin.tenNguon) + '</a></p>';
        h += '<div class="relative z-10 mt-auto flex flex-col items-center gap-2 px-5 pb-4 pt-2 md:flex-row md:justify-between md:gap-4">';
        if (loai.length > 1) h += '<div role="tablist" aria-label="Loại hình" class="flex flex-wrap justify-center gap-2">' + loai.map(function (l, i) { return '<button type="button" role="tab" data-tab="' + i + '" aria-selected="' + (tab === i) + '" class="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[13px] transition-colors ' + (tab === i ? 'border-white bg-white font-bold text-than-chi' : 'border-white/25 text-white/80 hover:border-white') + '">' + l[0] + '<span class="text-[12px] tabular-nums ' + (tab === i ? 'text-than-chi/60' : 'text-white/50') + '">' + l[1].length + '</span></button>'; }).join('') + '</div>';
        if (loai[tab][1].length > 1) h += '<ul class="flex flex-wrap justify-center gap-1.5" aria-label="Chọn hình">' + loai[tab][1].map(function (u, i) { return '<li><button type="button" data-hinh="' + i + '" aria-label="Hình ' + (i + 1) + '" ' + (i === k ? 'aria-current="true"' : '') + ' class="relative h-11 w-14 overflow-hidden rounded-[8px] border bg-white/[0.06] transition-colors ' + (i === k ? 'border-accent' : 'border-white/20 hover:border-white/50') + '"><img src="' + esc(url(u)) + '" alt="" style="position:absolute;inset:0;width:100%;height:100%" class="' + (congTrinh ? 'object-cover' : 'object-contain p-1') + '"></button></li>'; }).join('') + '</ul>';
        h += '</div>';
      } else h += '<div class="relative z-10 flex flex-1 items-center justify-center">' + hinhMinhHoa() + '</div>';
      return h + '</div>';
    }
    function thongTinHe() {
      var dang = cmp.indexOf(r.id) >= 0;
      return '<div class="flex min-h-0 flex-col p-5 md:p-7"><p class="text-[12px] font-bold uppercase tracking-[0.2em] text-accent-text">' + esc(tenHe(r).join(' / ')) + '</p><h3 class="mt-1.5 text-[clamp(1.6rem,2.6vw,2.1rem)] font-light leading-[1.1] tracking-[-0.02em]">' + esc(r.ma) + '</h3><p class="mt-1 truncate text-[14px] text-[#697280]">' + esc(r.loai) + (r.ketCau ? ' · ' + esc(TEN_KET_CAU[r.ketCau]) : '') + '</p>' +
        hangChuThich(r, 3, 'mt-2.5 flex flex-wrap gap-1.5') +
        '<div class="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1"><h4 class="' + NHAN_NHO + ' whitespace-nowrap">Thông số kỹ thuật</h4><p class="flex items-center gap-3 text-[12.5px] text-[#697280]"><span class="flex gap-1" aria-hidden="true">' + [0, 1, 2, 3, 4, 5].map(function (i) { return '<i class="h-1.5 w-5 rounded-full ' + (i < cs.co ? 'bg-accent' : 'bg-[#dfe3e9]') + '"></i>'; }).join('') + '</span><span class="whitespace-nowrap">' + cs.co + '/6 do hãng công bố</span></p></div>' +
        '<dl class="mt-2 grid grid-cols-3 overflow-hidden rounded-[14px] border border-[#e3e7ec] bg-[linear-gradient(180deg,#fff,#f7f8fa)]">' +
        cs.chinh.map(function (c) { return '<div class="border-r border-[#e3e7ec] px-3.5 py-3.5 last:border-r-0"><dt class="' + NHAN_NHO + '">' + c[0] + '</dt><dd class="mt-1">' + (c[1] ? '<span class="block whitespace-nowrap text-[clamp(1.05rem,5vw,1.25rem)] font-light leading-tight tracking-[-0.02em] md:text-[1.9rem]">' + esc(c[1]) + (c[2] && c[1] !== 'Không áp dụng' ? '<small class="ml-1 text-[12px] text-[#697280]">' + c[2] + '</small>' : '') + '</span>' : '<span class="block text-[12.5px] leading-snug text-[#8a93a0]">' + KHONG_CONG_BO + '</span>') + '</dd></div>'; }).join('') +
        cs.them.map(function (c) { return '<div class="border-r border-t border-[#e3e7ec] px-3.5 py-3 last:border-r-0"><dt class="' + NHAN_NHO + '">' + c[0] + '</dt><dd class="mt-1 text-[14px] leading-snug ' + (c[1] ? 'font-medium' : 'text-[#8a93a0]') + '">' + esc(c[1] || KHONG_CONG_BO) + '</dd></div>'; }).join('') + '</dl>' +
        (r.ghiChu ? '<p class="mt-2 line-clamp-2 text-[13px] leading-snug text-[#4b5563]">' + esc(r.ghiChu) + '</p>' : '') +
        '<p class="mt-2.5 text-[12px] leading-snug text-[#697280]">' + (r.them ? 'Tài liệu hãng cung cấp' : 'Số liệu do hãng công bố') + ', mang tính tham khảo; liên hệ để được xác nhận theo cấu hình công trình.</p>' +
        '<div class="mt-auto flex flex-wrap items-center gap-2.5 pt-4"><a href="' + esc(LIEN_HE) + '" class="nut nut-chinh">Nhận tư vấn</a><button type="button" data-ss-chi="' + r.id + '" aria-pressed="' + dang + '" class="nut ' + (dang ? 'nut-dac' : 'nut-vien-sang') + '">' + (dang ? 'Đã thêm so sánh' : 'So sánh') + '</button><a href="' + esc(HOTLINE_TEL) + '" aria-label="Gọi ' + esc(HOTLINE) + '" class="nut nut-vien-sang !px-4">Gọi</a></div></div>';
    }
    function ve() { h.trong.innerHTML = '<button type="button" data-dong aria-label="Đóng" class="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-3xl leading-none text-[#697280] hover:text-than-chi"><span aria-hidden="true">×</span></button>' + khungHinh() + thongTinHe(); }
    h = moHop('', { ten: ten + ', ' + r.loai, rong: true });
    ve();
    h.trong.addEventListener('click', function (e) {
      var t;
      if ((t = e.target.closest('[data-tab]'))) { tab = +t.getAttribute('data-tab'); k = 0; ve(); }
      else if ((t = e.target.closest('[data-hinh]'))) { k = +t.getAttribute('data-hinh'); ve(); }
      else if ((t = e.target.closest('[data-sang]'))) { var n = theoId(+t.getAttribute('data-sang')); h.dong(); moChiTiet(n.id); }
      else if ((t = e.target.closest('[data-ss-chi]'))) { chonSoSanh(r, cmp.indexOf(r.id) < 0); ve(); }
      else if (e.target.closest('[data-phong]')) {
        var anh = loai[tab][1][k], z = document.createElement('div');
        z.id = 'zoom-he-cua'; z.setAttribute('role', 'dialog'); z.setAttribute('aria-modal', 'true'); z.setAttribute('aria-label', 'Ảnh phóng to');
        var banVe = loai[tab][0] === 'Bản vẽ 2D';
        z.className = 'fixed inset-0 z-[80] flex cursor-zoom-out items-center justify-center p-4 ' + (banVe ? 'bg-[#0c0d10]' : 'bg-white');
        z.innerHTML = '<img src="' + esc(url(anh)) + '" alt="" class="max-h-full max-w-full object-contain"><button type="button" aria-label="Đóng ảnh phóng to" class="absolute right-4 top-3 flex h-11 w-11 items-center justify-center text-4xl ' + (banVe ? 'text-white' : 'text-than-chi') + '"><span aria-hidden="true">×</span></button>';
        z.addEventListener('click', function () { z.remove(); });
        document.body.appendChild(z); z.querySelector('button').focus();
      }
    });
  }

  /* ---------- hộp "Chọn hệ" 5 bước ---------- */
  var buoc = 1;
  var TEN_BUOC = ['Hãng', 'Loại hệ', 'Đặc điểm', 'Kết quả', 'So sánh'];
  function dem(nhom, v) {
    if (nhom === 'hang') return DU.filter(function (r) { return khop(r, loc, true) && (!v || r.hang === v); }).length;
    var l = { b: loc.b, k: loc.k.slice(), f: loc.f.slice(), h: loc.h.slice(), q: loc.q };
    if (nhom === 'h') l.h = [];
    if (nhom === 'k') l.k = [];
    if (nhom === 'f') l.f = [];
    return DU.filter(function (r) {
      if (!khop(r, l)) return false;
      if (nhom === 'h') return r.he.indexOf(v) >= 0;
      if (nhom === 'k') return r.ketCau === v || r.ketCau === 'tn';
      return r.tags.indexOf(v) >= 0;
    }).length;
  }
  function tomTatBuoc() {
    var dacDiem = loc.k.length + loc.f.length + (loc.q ? 1 : 0);
    return [loc.b ? TEN_HANG[loc.b] : 'Tất cả', loc.h.length ? loc.h.map(function (m) { return TEN_HE[m]; }).join(', ') : 'Tất cả', dacDiem ? dacDiem + ' đã chọn' : 'Tất cả', ketQuaLoc().length + ' hệ', cmp.length + '/3 hệ'];
  }
  var hopChon = null;
  function veChon() {
    var kq = ketQuaLoc(), tt = tomTatBuoc(), t = hopChon.trong.querySelector('[data-chon-nd]');
    var h = '<ol class="mb-6 grid grid-cols-5 gap-1.5" aria-label="Các bước">' + TEN_BUOC.map(function (n, i) {
      var on = buoc === i + 1;
      return '<li><button type="button" data-buoc="' + (i + 1) + '" ' + (on ? 'aria-current="step"' : '') + ' class="block w-full rounded-[10px] border px-2 py-2 text-left ' + (on ? 'border-than-chi bg-than-chi text-white' : 'border-[#e3e7ec] bg-white hover:border-than-chi') + '"><span class="block text-[12px] font-bold tabular-nums ' + (on ? 'text-white/70' : 'text-accent-text') + '">' + (i + 1) + '</span><span class="block truncate text-[12px] font-bold">' + n + '</span><span class="block truncate text-[12px] ' + (on ? 'text-white/80' : 'text-[#697280]') + '">' + esc(tt[i]) + '</span></button></li>';
    }).join('') + '</ol>';
    function chip(k, v, ten, n, bat_) { return '<button type="button" data-' + k + '="' + v + '" aria-pressed="' + bat_ + '" class="min-h-11 rounded-[10px] border px-4 py-2 text-left text-[14px] ' + (bat_ ? 'border-accent bg-accent font-bold text-white' : 'border-[#d5dbe3] bg-white hover:border-than-chi') + '">' + ten + ' <span class="text-[12px] opacity-70">' + n + '</span></button>'; }
    if (buoc === 1) h += '<h4 class="text-[1.4rem] font-light">Bạn quan tâm hãng nào?</h4><div class="mt-4 flex flex-wrap gap-2.5">' + TAB_HANG.map(function (x) { return chip('c-hang', x[0], x[1], dem('hang', x[0]), loc.b === x[0]); }).join('') + '</div>';
    if (buoc === 2) h += '<h4 class="text-[1.4rem] font-light">Bạn cần loại hệ nào?</h4><div class="mt-4 flex flex-wrap gap-2.5">' + NHOM_LOC[0].o.map(function (x) { return chip('c-h', x[0], x[1], dem('h', x[0]), loc.h.indexOf(x[0]) >= 0); }).join('') + '</div>';
    if (buoc === 3) h += '<h4 class="text-[1.4rem] font-light">Đặc điểm cần có</h4><p class="mt-4 ' + NHAN_NHO + '">Kết cấu</p><div class="mt-2 flex flex-wrap gap-2.5">' + NHOM_LOC[1].o.map(function (x) { return chip('c-k', x[0], x[1], dem('k', x[0]), loc.k.indexOf(x[0]) >= 0); }).join('') + '</div><p class="mt-5 ' + NHAN_NHO + '">Chức năng</p><div class="mt-2 flex flex-wrap gap-2.5">' + NHOM_LOC[2].o.map(function (x) { return chip('c-f', x[0], x[1], dem('f', x[0]), loc.f.indexOf(x[0]) >= 0); }).join('') + '</div><label class="mt-5 block"><span class="' + NHAN_NHO + '">Tìm theo mã hệ</span><input type="search" data-c-q value="' + esc(loc.q) + '" placeholder="XW98, WS 75 THI…" class="mt-2 w-full rounded-[12px] border border-[#e3e7ec] bg-white py-3 px-3.5 text-[15px] outline-none focus:border-than-chi"></label>';
    if (buoc === 4) {
      h += '<h4 class="text-[1.4rem] font-light">' + kq.length + ' hệ phù hợp</h4>';
      h += kq.length ? '<ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">' + kq.slice(0, 6).map(function (r) { return '<li><button type="button" data-c-xem="' + r.id + '" class="group block w-full overflow-hidden rounded-[16px] border border-[#e3e7ec] bg-white text-left transition-[border-color,box-shadow] hover:border-than-chi hover:shadow-[0_14px_34px_rgba(15,17,21,0.1)]"><span class="' + SAN_KHAU + ' relative block aspect-[1/0.8]">' + anhThe(r, 'group-hover:scale-[1.04]') + '</span><span class="block px-3.5 py-2.5"><span class="block text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]">' + esc(TEN_HANG[r.hang]) + '</span><span class="block truncate text-[15px] font-bold">' + esc(r.ma) + '</span></span></button></li>'; }).join('') + '</ul>' : '<p class="mt-4 rounded-[16px] border border-dashed border-[#c3cad4] p-8 text-center text-[#697280]">Chưa có hệ phù hợp. Quay lại để bỏ bớt lựa chọn.</p>';
      h += '<button type="button" data-c-xem-het class="nut nut-dac mt-5">Xem cả ' + kq.length + ' hệ trên trang</button>';
    }
    if (buoc === 5) {
      h += '<h4 class="text-[1.4rem] font-light">So sánh (' + cmp.length + '/3 hệ)</h4>';
      h += cmp.length ? '<ul class="mt-4 space-y-2">' + cmp.map(theoId).map(function (r) { return '<li class="flex items-center justify-between gap-3 rounded-[12px] border border-[#e3e7ec] px-4 py-3"><span><span class="block text-[12px] font-bold uppercase tracking-[0.14em] text-[#697280]">' + esc(TEN_HANG[r.hang]) + '</span><span class="font-bold">' + esc(r.ma) + '</span></span><button type="button" data-c-bo="' + r.id + '" class="min-h-11 text-[13px] underline underline-offset-4">Bỏ</button></li>'; }).join('') + '</ul>' : '<p class="mt-4 text-[#697280]">Chưa chọn hệ nào. Quay lại bước 4 rồi tích ô "So sánh" trên thẻ.</p>';
      h += '<div class="mt-4 flex flex-wrap gap-3"><button type="button" data-c-mo-ss ' + (cmp.length < 2 ? 'disabled' : '') + ' class="nut nut-chinh disabled:opacity-50">Mở bảng so sánh</button><button type="button" data-c-ve-ds class="nut nut-vien-sang">Về danh sách</button></div>';
    }
    h += '<div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3e7ec] pt-5"><button type="button" data-c-lui ' + (buoc === 1 ? 'disabled' : '') + ' class="nut nut-vien-sang disabled:opacity-40">← Quay lại</button><div class="flex flex-wrap items-center gap-3">' + (dangLoc() ? '<button type="button" data-c-xoa class="min-h-11 text-[14px] text-[#4b5563] underline underline-offset-4 hover:text-than-chi">Xóa lựa chọn</button>' : '') + (buoc < 5 ? '<button type="button" data-c-toi class="nut nut-chinh">Tiếp theo: ' + TEN_BUOC[buoc] + (buoc === 3 ? ' · ' + kq.length + ' hệ' : '') + ' →</button>' : '<button type="button" data-c-dong class="nut nut-dac">Đóng</button>') + '</div></div>';
    t.innerHTML = h;
  }
  function moChon() {
    hopChon = moHop('<div class="p-5 pb-6 pt-14 md:p-7 md:pt-14" data-chon-nd></div>', { ten: 'Chọn hệ cửa theo 5 bước', khiDong: function () { hopChon = null; } });
    veChon();
    var hc = hopChon;
    hc.trong.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      var a = function (n) { return t.hasAttribute(n); }, v = function (n) { return t.getAttribute(n); };
      if (a('data-buoc')) buoc = +v('data-buoc');
      else if (a('data-c-hang')) { loc.b = v('data-c-hang'); loc.p = 1; }
      else if (a('data-c-h')) bat('h', v('data-c-h'));
      else if (a('data-c-k')) bat('k', v('data-c-k'));
      else if (a('data-c-f')) bat('f', v('data-c-f'));
      else if (a('data-c-lui')) buoc = Math.max(1, buoc - 1);
      else if (a('data-c-toi')) buoc = Math.min(5, buoc + 1);
      else if (a('data-c-xoa')) { loc = { b: '', k: [], f: [], h: [], q: '', p: 1 }; }
      else if (a('data-c-dong')) { hc.dong(); return; }
      else if (a('data-c-xem')) { hc.dong(); moChiTiet(+v('data-c-xem')); return; }
      else if (a('data-c-xem-het')) { hc.dong(); veLai(); DOM.tabs.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      else if (a('data-c-bo')) chonSoSanh(theoId(+v('data-c-bo')), false);
      else if (a('data-c-mo-ss')) { hc.dong(); bangSoSanh(); return; }
      else if (a('data-c-ve-ds')) buoc = 4;
      else return;
      veLai(); if (hopChon) veChon();
    });
    hc.trong.addEventListener('input', function (e) { if (e.target.hasAttribute('data-c-q')) { loc.q = e.target.value; loc.p = 1; veLai(true); var s = hc.trong.querySelector('[data-c-toi]'); } });
  }

  /* ---------- tấm bộ lọc điện thoại ---------- */
  function moTamLoc() {
    var h = moHop('<div class="px-5 pb-28 pt-5" data-tam></div><div class="sticky bottom-0 flex items-center gap-3 border-t border-[#e3e7ec] bg-white px-5 py-3" data-tam-chan></div>', { ten: 'Bộ lọc hệ cửa', duoi: true });
    function ve() {
      $('[data-tam]', h.trong).innerHTML = '<p class="text-[18px] font-bold">Bộ lọc</p>' + NHOM_LOC.map(function (g) {
        return '<fieldset class="mt-5"><legend class="mb-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4b5563]">' + g.ten + '</legend><div class="flex flex-wrap gap-2">' + g.o.map(function (o) { var on = loc[g.k].indexOf(o[0]) >= 0; return '<button type="button" data-t="' + g.k + ':' + o[0] + '" aria-pressed="' + on + '" class="min-h-11 rounded-[10px] border px-3.5 py-2 text-[14px] ' + (on ? 'border-accent bg-accent font-bold text-white' : 'border-[#d5dbe3] bg-white text-than-chi') + '">' + o[1] + '</button>'; }).join('') + '</div></fieldset>';
      }).join('');
      $('[data-tam-chan]', h.trong).innerHTML = (soLoc() > 0 ? '<button type="button" data-t-xoa class="min-h-11 text-[14px] text-[#4b5563] underline underline-offset-4">Xóa lọc</button>' : '') + '<button type="button" data-t-xong class="nut nut-chinh ml-auto flex-1 md:flex-none">Xem ' + ketQuaLoc().length + ' hệ</button>';
    }
    ve();
    h.trong.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.hasAttribute('data-t')) { var p = t.getAttribute('data-t').split(':'); bat(p[0], p[1]); ve(); }
      else if (t.hasAttribute('data-t-xoa')) { loc.k = []; loc.f = []; loc.h = []; loc.p = 1; veLai(); ve(); }
      else if (t.hasAttribute('data-t-xong')) h.dong();
    });
  }

  /* ---------- sự kiện trang ---------- */
  goc.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-hang]'))) { doi({ b: t.getAttribute('data-hang') }); }
    else if ((t = e.target.closest('[data-nhom]'))) { var k = t.getAttribute('data-nhom'); DOM.loc.setAttribute('data-mo', DOM.loc.getAttribute('data-mo') === k ? '' : k); veLai(); }
    else if ((t = e.target.closest('[data-chon]'))) { var p = t.getAttribute('data-chon').split(':'); bat(p[0], p[1]); }
    else if (e.target.closest('[data-xoa-loc]')) doi({ k: [], f: [], h: [] });
    else if (e.target.closest('[data-xoa-tat-ca]')) { loc = { b: '', k: [], f: [], h: [], q: '', p: 1 }; veLai(); }
    else if ((t = e.target.closest('[data-xem]'))) moChiTiet(+t.getAttribute('data-xem'));
    else if ((t = e.target.closest('[data-trang]'))) { loc.p = +t.getAttribute('data-trang'); veLai(); DOM.tabs.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else if (e.target.closest('[data-mo-chon]')) { buoc = 1; moChon(); }
    else if (!e.target.closest('[data-loc]') && DOM.loc.getAttribute('data-mo')) { DOM.loc.setAttribute('data-mo', ''); veLai(); }
  });
  goc.addEventListener('change', function (e) {
    var c = e.target.closest('[data-ss]'); if (!c) return;
    var r = theoId(+c.getAttribute('data-ss'));
    if (!chonSoSanh(r, c.checked)) { c.checked = false; var tick = c.nextElementSibling.firstElementChild; if (tick) tick.classList.add('hidden'); }
  });
  DOM.tim.addEventListener('input', function () { loc.q = DOM.tim.value; loc.p = 1; veLai(true); });
  DOM.tabs.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var ds = $$('[role=radio]', DOM.tabs), i = ds.indexOf(document.activeElement); if (i < 0) return;
    e.preventDefault(); var n = ds[(i + (e.key === 'ArrowRight' ? 1 : ds.length - 1)) % ds.length]; doi({ b: n.getAttribute('data-hang') }); var m = $$('[role=radio]', DOM.tabs)[ds.indexOf(n)]; if (m) m.focus();
  });
  DOM.thanhSS.addEventListener('click', function (e) {
    if (e.target.closest('[data-mo-ss]')) bangSoSanh();
    else if (e.target.closest('[data-bo-chon]')) { cmp.slice().forEach(function (id) { chonSoSanh(theoId(id), false); }); }
  });
  if (DOM.nutLoc) DOM.nutLoc.addEventListener('click', moTamLoc);
  window.addEventListener('resize', function () { veLai(true); });
  veLai();
})();
