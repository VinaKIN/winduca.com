import { HeroDoors } from "@/components/HeroDoors";
import { CrossSection } from "@/components/CrossSection";
import {
  CongTrinhMinhHoa,
  FaqVaForm,
  KhoiChuNha,
  KhoiKTS,
  KhoiNhaThau,
  QuyTrinh,
  TuyenNgonVaBaThe,
} from "@/components/HomeSections";

/** Trang chủ — 9 khối: Hero · Ba thẻ · KTS · 3D · Chủ nhà · Nhà thầu · Quy trình · Công trình · FAQ + Form */
export default function Home() {
  return (
    <>
      <HeroDoors />
      <TuyenNgonVaBaThe />
      <KhoiKTS />
      <CrossSection />
      <KhoiChuNha />
      <KhoiNhaThau />
      <QuyTrinh />
      <CongTrinhMinhHoa />
      <FaqVaForm />
    </>
  );
}
