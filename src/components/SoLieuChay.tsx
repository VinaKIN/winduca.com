/**
 * Khối số liệu. Chưa có số được xác nhận nên hiện dấu "—" tĩnh, không đếm chạy (17/11/2026).
 * Khi có số thật, điền vào SO_LIEU_THAT trong lib/site.ts và hiển thị giá trị ở đây.
 */
export type SoLieu = { nhan: string; gia_tri: number; hau_to?: string; do_dai?: number };

export function SoLieuChay({ muc }: { muc: SoLieu[] }) {
  return (
    <dl className="mt-8 grid max-w-xl grid-cols-3 gap-6 border-t border-inox pt-6 md:mt-12 md:pt-8">
      {muc.map((s) => (
        <div key={s.nhan}>
          <dt className="text-sm text-than-chi/70">{s.nhan}</dt>
          <dd className="mt-2 text-4xl font-medium tabular-nums text-than-chi/40 md:text-5xl">—</dd>
          <dd className="mt-1 text-xs text-than-chi/70">Đang cập nhật</dd>
        </div>
      ))}
    </dl>
  );
}
