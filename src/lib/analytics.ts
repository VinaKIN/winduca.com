/** Gửi sự kiện GA4 nếu GA4 đã được nạp (cần đồng ý cookie). Không bao giờ truyền thông tin cá nhân vào đây. */
type Gtag = (lenh: "event", ten: string, tham_so?: Record<string, string | number>) => void;

export function suKien(ten: string, thamSo?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g === "function") g("event", ten, thamSo);
}
