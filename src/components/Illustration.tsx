import { NhanMinhHoa } from "./ui";

/**
 * Hình MINH HỌA phẳng (không gradient, không ảnh thật). Luôn kèm huy hiệu "Minh họa".
 * Dùng thay ảnh công trình cho tới khi có ảnh thật của WINDUCA.
 */

const BANG_MAU = [
  { troi: ["#2d2b2c", "#40372f", "#645241"], bien: "#33383a", nha: "#19191b" },
  { troi: ["#333030", "#4a3f38", "#6e5a47"], bien: "#2f3537", nha: "#171719" },
  { troi: ["#2b2c2c", "#383735", "#585149"], bien: "#34393a", nha: "#1b1b1d" },
  { troi: ["#302d2b", "#463c33", "#6a5744"], bien: "#363a38", nha: "#18181a" },
];

export function CanhMinhHoa({
  seed,
  nhan = true,
  className = "",
}: {
  seed: number;
  nhan?: boolean;
  className?: string;
}) {
  const m = BANG_MAU[seed % BANG_MAU.length];
  const rong = 180 + ((seed * 37) % 140);
  const x0 = (800 - rong) / 2 + ((seed * 53) % 60) - 30;
  const soO = 3 + (seed % 3);
  const buoc = (rong - 40) / soO;
  const sangThem = 0.38 + ((seed * 7) % 5) * 0.06;
  return (
    <div className={`relative overflow-hidden bg-than-chi ${className}`}>
      <svg viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
        <rect width="800" height="520" fill={m.troi[0]} />
        <rect y="120" width="800" height="50" fill={m.troi[1]} />
        <rect y="170" width="800" height="80" fill={m.troi[2]} />
        <circle cx={600 - ((seed * 41) % 220)} cy="250" r="46" fill="#bfa678" opacity="0.42" />
        <rect y="250" width="800" height="140" fill={m.bien} />
        <rect y="250" width="800" height="2" fill="#7a6f5f" />
        {/* mái đua mảnh + khối kính */}
        <rect x={x0 - 20} y="230" width={rong + 40} height="12" fill="#0f0f11" />
        <rect x={x0} y="242" width={rong} height="118" fill={m.nha} />
        <rect x={x0 + 20} y="256" width={rong - 40} height="92" fill="#bfa678" opacity={sangThem} />
        {Array.from({ length: soO + 1 }).map((_, i) => (
          <rect key={i} x={x0 + 20 + i * buoc - 2} y="256" width="4" height="92" fill={m.nha} />
        ))}
        <rect y="360" width="800" height="160" fill="#1a1a1c" />
        <rect x={x0} y="388" width={rong} height="26" fill="#3b4244" />
      </svg>
      {nhan && <NhanMinhHoa className="left-3 top-3" />}
    </div>
  );
}

/** Mặt cắt 2D nét mảnh có đường kích thước — mọi giá trị "chờ xác nhận". */
export function MatCat2D({ className = "" }: { className?: string }) {
  const mau = "#bfa678";
  return (
    <div className={`relative border border-inox/25 bg-[#232325] ${className}`}>
      <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Mặt cắt nhôm 2D minh họa có đường kích thước">
        <defs>
          <marker id="tick" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0 0 L6 6 M0 6 L6 0" stroke={mau} strokeWidth="0.8" />
          </marker>
        </defs>
        <g transform="translate(70 40)" fill="none" stroke={mau} strokeWidth="1.2">
          {/* nửa khung ngoài */}
          <rect x="0" y="0" width="86" height="150" />
          <rect x="18" y="22" width="50" height="106" strokeWidth="0.7" />
          {/* nửa khung trong */}
          <rect x="124" y="0" width="86" height="150" />
          <rect x="142" y="22" width="50" height="106" strokeWidth="0.7" />
          {/* thanh cầu cách nhiệt */}
          <rect x="86" y="26" width="38" height="14" fill="#f4f1ea" fillOpacity="0.85" stroke="none" />
          <rect x="86" y="110" width="38" height="14" fill="#f4f1ea" fillOpacity="0.85" stroke="none" />
          {/* gioăng + kính */}
          <rect x="210" y="8" width="14" height="20" fill="#4a4a4e" stroke="none" />
          <rect x="210" y="122" width="14" height="20" fill="#4a4a4e" stroke="none" />
          <rect x="224" y="12" width="7" height="126" fill="#dde3df" fillOpacity="0.55" stroke="none" />
          <rect x="242" y="12" width="7" height="126" fill="#dde3df" fillOpacity="0.55" stroke="none" />
        </g>
        {/* đường kích thước (giá trị chờ xác nhận) */}
        <g stroke={mau} strokeWidth="0.8" fill={mau} fontSize="9" fontFamily="sans-serif">
          <line x1="70" y1="222" x2="280" y2="222" markerStart="url(#tick)" markerEnd="url(#tick)" />
          <line x1="70" y1="196" x2="70" y2="226" strokeOpacity="0.4" />
          <line x1="280" y1="196" x2="280" y2="226" strokeOpacity="0.4" />
          <text x="175" y="215" textAnchor="middle" stroke="none">Bề rộng — chờ xác nhận</text>
          <line x1="40" y1="40" x2="40" y2="190" markerStart="url(#tick)" markerEnd="url(#tick)" />
          <text x="34" y="115" textAnchor="middle" transform="rotate(-90 34 115)" stroke="none">Chiều cao — chờ xác nhận</text>
        </g>
      </svg>
      <p className="absolute left-4 top-4 rounded-sm bg-than-chi/85 px-2 py-1 text-[11px] text-nga/90">
        Minh họa — không phải bản vẽ kỹ thuật
      </p>
    </div>
  );
}
