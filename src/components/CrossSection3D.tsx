"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Mặt cắt nhôm 3D tách lớp — dữ liệu MINH HỌA, không phải bản vẽ kỹ thuật.
 * Không có con số kỹ thuật nào ở đây: mọi thông số thật đang "chờ xác nhận".
 */

export type LopId = "nhom" | "cau" | "gioang" | "kinh";

export const LOP: { id: LopId; ten: string; mau: string; moTa: string }[] = [
  {
    id: "nhom",
    ten: "Khung nhôm anode",
    mau: "#bfa678",
    moTa: "Lớp ngoài cùng của bộ cửa. Bề mặt anode hóa giữ vẻ đẹp của nhôm trong thời gian dài.",
  },
  {
    id: "cau",
    ten: "Thanh cầu cách nhiệt",
    mau: "#f4f1ea",
    moTa: "Thanh polyamide nối hai nửa khung nhôm, ngăn nhiệt truyền thẳng từ ngoài vào trong.",
  },
  {
    id: "gioang",
    ten: "Gioăng EPDM",
    mau: "#4a4a4e",
    moTa: "Dải gioăng cao su ôm sát kính và khung, giúp bộ cửa kín khít hơn.",
  },
  {
    id: "kinh",
    ten: "Kính hộp",
    mau: "#dde3df",
    moTa: "Hai lớp kính ngăn cách bởi khoảng đệm khí, giúp căn phòng yên tĩnh và êm dịu hơn.",
  },
];

/** Hình chữ nhật có (hoặc không) lỗ rỗng */
function hinhChuNhat(x0: number, y0: number, x1: number, y1: number, lo?: [number, number, number, number]) {
  const s = new THREE.Shape();
  s.moveTo(x0, y0);
  s.lineTo(x1, y0);
  s.lineTo(x1, y1);
  s.lineTo(x0, y1);
  s.lineTo(x0, y0);
  if (lo) {
    const [hx0, hy0, hx1, hy1] = lo;
    const h = new THREE.Path();
    h.moveTo(hx0, hy0);
    h.lineTo(hx0, hy1);
    h.lineTo(hx1, hy1);
    h.lineTo(hx1, hy0);
    h.lineTo(hx0, hy0);
    s.holes.push(h);
  }
  return s;
}

function Khoi({
  shape,
  mau,
  vitri,
  mo,
  kim = 0.1,
  tho = 0.6,
  trongSuot = false,
}: {
  shape: THREE.Shape;
  mau: string;
  vitri: [number, number, number];
  mo: number; // 1 = sáng, thấp = mờ đi
  kim?: number;
  tho?: number;
  trongSuot?: boolean;
}) {
  const hinh = useMemo(
    () => new THREE.ExtrudeGeometry(shape, { depth: 2.6, bevelEnabled: false }),
    [shape],
  );
  return (
    <mesh geometry={hinh} position={[vitri[0], vitri[1], vitri[2] - 1.3]}>
      <meshStandardMaterial
        color={mau}
        metalness={kim}
        roughness={tho}
        transparent={trongSuot || mo < 1}
        opacity={trongSuot ? 0.45 * mo + 0.1 : mo}
      />
    </mesh>
  );
}

function MatCat({ tach, chon, mauNhom }: { tach: number; chon: LopId | null; mauNhom: string }) {
  const dim = (id: LopId) => (chon && chon !== id ? 0.18 : 1);

  const nhomNgoai = useMemo(() => hinhChuNhat(-3.4, -3.5, -0.6, 3.5, [-2.8, -2.6, -1.2, 2.6]), []);
  const nhomTrong = useMemo(() => hinhChuNhat(0.6, -3.5, 3.4, 3.5, [1.2, -2.6, 2.8, 2.6]), []);
  const cauTren = useMemo(() => hinhChuNhat(-0.6, 1.9, 0.6, 2.5), []);
  const cauDuoi = useMemo(() => hinhChuNhat(-0.6, -2.5, 0.6, -1.9), []);
  const gioangTren = useMemo(() => hinhChuNhat(3.4, 2.4, 3.9, 3.0), []);
  const gioangDuoi = useMemo(() => hinhChuNhat(3.4, -3.0, 3.9, -2.4), []);
  const kinh1 = useMemo(() => hinhChuNhat(3.9, -2.9, 4.15, 2.9), []);
  const kinh2 = useMemo(() => hinhChuNhat(4.5, -2.9, 4.75, 2.9), []);
  const dem = useMemo(() => hinhChuNhat(4.15, 2.6, 4.5, 2.9), []);
  const dem2 = useMemo(() => hinhChuNhat(4.15, -2.9, 4.5, -2.6), []);

  return (
    <group position={[-1.3, 0, 0]}>
      {/* Khung nhôm: hai nửa dạt ra hai bên khi tách lớp */}
      <Khoi shape={nhomNgoai} mau={mauNhom} vitri={[-1.8 * tach, 0, 0]} mo={dim("nhom")} kim={0.65} tho={0.42} />
      <Khoi shape={nhomTrong} mau={mauNhom} vitri={[1.8 * tach, 0, 0]} mo={dim("nhom")} kim={0.65} tho={0.42} />
      {/* Thanh cầu cách nhiệt: dạt lên/xuống */}
      <Khoi shape={cauTren} mau="#f4f1ea" vitri={[0, 1.6 * tach, 0]} mo={dim("cau")} />
      <Khoi shape={cauDuoi} mau="#f4f1ea" vitri={[0, -1.6 * tach, 0]} mo={dim("cau")} />
      {/* Gioăng EPDM */}
      <Khoi shape={gioangTren} mau="#4a4a4e" vitri={[1.8 * tach + 1.2 * tach, 0, 0]} mo={dim("gioang")} tho={0.85} />
      <Khoi shape={gioangDuoi} mau="#4a4a4e" vitri={[1.8 * tach + 1.2 * tach, 0, 0]} mo={dim("gioang")} tho={0.85} />
      {/* Kính hộp */}
      <Khoi shape={kinh1} mau="#dde3df" vitri={[1.8 * tach + 2.4 * tach, 0, 0]} mo={dim("kinh")} trongSuot />
      <Khoi shape={kinh2} mau="#dde3df" vitri={[1.8 * tach + 2.4 * tach, 0, 0]} mo={dim("kinh")} trongSuot />
      <Khoi shape={dem} mau="#c8c9c6" vitri={[1.8 * tach + 2.4 * tach, 0, 0]} mo={dim("kinh")} kim={0.7} />
      <Khoi shape={dem2} mau="#c8c9c6" vitri={[1.8 * tach + 2.4 * tach, 0, 0]} mo={dim("kinh")} kim={0.7} />
    </group>
  );
}

export default function CrossSection3D({
  tach,
  chon,
  tuXoay,
  mauNhom = "#bfa678",
}: {
  tach: number;
  chon: LopId | null;
  tuXoay: boolean;
  mauNhom?: string;
}) {
  return (
    <Canvas
      camera={{ position: [3, 2, 19], fov: 36 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
      aria-label="Mặt cắt nhôm 3D minh họa, kéo để xoay"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 8]} intensity={2.2} color="#fff1dc" />
      <directionalLight position={[-6, -3, 4]} intensity={0.8} color="#dde3df" />
      <MatCat tach={tach} chon={chon} mauNhom={mauNhom} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={tuXoay}
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
      />
    </Canvas>
  );
}
