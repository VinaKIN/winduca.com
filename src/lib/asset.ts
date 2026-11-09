/**
 * Đường dẫn tới tệp trong public/. Khi xuất bản tĩnh lên GitHub Pages (có basePath "/winduca.com"),
 * ảnh không được tối ưu nên phải tự thêm tiền tố. Ở chế độ thường tiền tố là rỗng.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const BAN_XEM_THU_TINH = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";

export const asset = (duongDan: string) => `${BASE_PATH}${duongDan}`;
