const fs=require("fs"),path=require("path");
const sharp=require(process.cwd()+"/node_modules/sharp");
const S=process.argv[2];
const all=JSON.parse(fs.readFileSync(S+"/wb-he-cua/all.json","utf8"));
const other=JSON.parse(fs.readFileSync(S+"/wb-he-cua/other.json","utf8")).urls.map(u=>path.basename(u));
const BO=new Set([59,60,61,62].map(i=>other[i])); // bản vẽ Ponzio có logo in trên hình
const LOCAL=JSON.parse(fs.readFileSync(S+"/local-list.json","utf8"));
const slug=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
async function catDai(buf){
  const {data,info}=await sharp(buf).flatten({background:"#fff"}).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const {width:w,height:h}=info;const dRed=y=>{let n=0;for(let x=0;x<w;x+=2){const i=(y*w+x)*3;if(data[i]>150&&data[i+1]<70&&data[i+2]<90)n++;}return n/(w/2)};
  let y=h-1;while(y>0&&dRed(y)<0.3)y--;if(y<h*0.5)return buf;
  let top=y;while(top>0&&dRed(top-1)>=0.3)top--;if(y-top<h*0.03)return buf;
  return sharp(buf).extract({left:0,top:0,width:w,height:Math.max(1,top-2)}).toBuffer();}
fs.rmSync("public/images/he-cua",{recursive:true,force:true});
fs.mkdirSync("public/images/he-cua/ban-ve",{recursive:true});fs.mkdirSync("public/images/he-cua/mau-goc",{recursive:true});
const out=[];let nd=0,nc=0;
const RENDER_SACH={30:"INFINITY 19H_nobg.png",31:"RCT65 3_nobg.png"}; // ảnh 3D đã kiểm tra không có logo (bản của chính thư mục ảnh)
(async()=>{
for(const r of all){
  const id=out.length;const key=`${r.hang}-${slug(r.ma)}`;
  const d=[];let n=0;
  if(r.idx!==31){for(const u of (r.anh.d||[])){const bn=path.basename(u);if(BO.has(bn))continue;
    const dir=fs.existsSync(S+"/wb-img-romadio/"+bn)?"/wb-img-romadio/":"/wb-img-other/";let buf=fs.readFileSync(S+dir+bn);
    if(r.hang==="civro")buf=await catDai(buf);n++;const f=`${key}-${n}.webp`;
    await sharp(buf).flatten({background:"#fff"}).resize({width:1600,withoutEnlargement:true}).webp({quality:80}).toFile("public/images/he-cua/ban-ve/"+f);d.push("/images/he-cua/ban-ve/"+f);nd++;}}
  const c=[];
  if(RENDER_SACH[r.idx]){const p=LOCAL.find(x=>x.includes(RENDER_SACH[r.idx]));const f=`${key}-g1.webp`;
    await sharp(p).resize({width:1400,withoutEnlargement:true}).webp({quality:82,alphaQuality:90}).toFile("public/images/he-cua/mau-goc/"+f);c.push("/images/he-cua/mau-goc/"+f);nc++;}
  out.push({id,hang:r.hang,ma:r.ma,loai:r.loai,he:r.he,ketCau:r.ketCau||"",tags:r.tags?r.tags.split(","):[],u:r.uValue||"",kinKhi:r.kinKhi||"",cachAm:r.cachAm||"",kinNuoc:r.kinNuoc||"",chiuGio:r.apLucGio||"",chongTrom:r.chongTrom||"",ghiChu:r.ghiChu||"",anh:{c,d},them:false});
}
const them=(o)=>out.push({id:out.length,tags:[],u:"",kinKhi:"",cachAm:"",kinNuoc:"",chiuGio:"",chongTrom:"",ghiChu:"",ketCau:"",anh:{c:[],d:[]},them:true,...o});
them({hang:"civro",ma:"ACW120",loai:"Vách kính (Curtain wall)",he:"v",ketCau:"t",u:"2.2",cachAm:"35 dB",kinKhi:"0.21 m³/(m·h)",kinNuoc:"700 Pa",chiuGio:"≤ 4.0 kPa",ghiChu:"Mặt đứng 60 mm; chiều sâu thanh đứng 166 mm, thanh ngang 125 mm; kính 24 mm."});
them({hang:"civro",ma:"AWG140 / NWG110",loai:"Nhà kính (Conservatory)",he:"v",ketCau:"tn",u:"2.2",cachAm:"35 dB",ghiChu:"AWG140 có cầu nhiệt (kính 28 mm), NWG110 không cầu nhiệt. Mái song song, mái dốc một phía hoặc mái nhiều dốc (AWG140). Chỉ số U và cách âm trong bảng là của AWG140. Hãng chưa công bố thông số hiệu năng cho NWG110."});
them({hang:"civro",ma:"USL",loai:"Cửa mái (Skylight)",he:"v",ketCau:"",ghiChu:"Khung mô-đun, kính hộp, treo trên, nâng đứng, trượt hoặc nhiều cánh chạy động cơ. Hãng chưa công bố bảng thông số."});
them({hang:"civro",ma:"USW",loai:"Màn chắn côn trùng cuốn toàn cảnh",he:"s",ketCau:"",tags:["sm"],ghiChu:"Lưới giấu trong khung bên, vận hành một tay, lắp trong hoặc ngoài cửa trượt. Hãng chưa công bố bảng thông số."});
them({hang:"civro",ma:"AMAZA UID16",loai:"Cửa nội thất siêu mảnh",he:"s",ketCau:"n",ghiChu:"Khung nhìn thấy 16 mm; chiều cao cánh tối đa 3600 mm; trượt hoặc treo, mở quay, xoay trục."});
them({hang:"romadio",ma:"FineLine 59WO",loai:"Cửa sổ nan trang trí",he:"w",ketCau:"tn",ghiChu:"Có bản không nan trang trí. Hãng chưa công bố bảng thông số."});
them({hang:"romadio",ma:"FineLine 62DO",loai:"Cửa đi nan trang trí",he:"d",ketCau:"tn",ghiChu:"Hãng chưa công bố bảng thông số."});
them({hang:"romadio",ma:"OVERSKY 23S Double",loai:"Cửa trượt 2 ray",he:"s",ketCau:"n",ghiChu:"Hãng chưa công bố bảng thông số."});
them({hang:"romadio",ma:"OVERSKY 23S Triple",loai:"Cửa trượt 3 ray",he:"s",ketCau:"n",ghiChu:"Hãng chưa công bố bảng thông số."});
const ts=`/**
 * Dữ liệu ${out.length} hệ cửa nhôm kính (11/11/2026), tạo tự động.
 * - 106 hệ lấy từ bảng công bố trên trang hệ cửa của Winboss; 9 hệ còn thiếu bổ sung từ tài liệu hãng trong thư mục ảnh (them = true).
 * - Ảnh: bản vẽ 2D đã kiểm tra (bỏ bản vẽ có logo, cắt dải mã sản phẩm ở đáy hình Civro) và 2 ảnh 3D đã kiểm tra không có logo.
 *   Ảnh 3D và ảnh thực tế còn lại có logo hãng nên chưa dùng.
 * - Số liệu chỉ để tham khảo, thay đổi theo kích thước và cấu hình; cần xác nhận quyền sử dụng trước khi công bố chính thức.
 */
export type Hang = "romadio" | "civro" | "ponzio";
export type HeCua = {
  id: number;
  hang: Hang;
  ma: string;
  loai: string;
  /** Hệ thống, có thể ghép nhiều ký tự: w cửa sổ, d cửa đi, s trượt, l nâng trượt, f xếp gấp, v vách kính */
  he: string;
  /** t có cầu nhiệt, n không cầu nhiệt, tn có cả hai, rỗng là chưa rõ */
  ketCau: "t" | "n" | "tn" | "";
  /** cn cách nhiệt cao, an an ninh cao, de dễ tiếp cận, sm thông minh / động cơ */
  tags: string[];
  u: string;
  kinKhi: string;
  cachAm: string;
  kinNuoc: string;
  chiuGio: string;
  chongTrom: string;
  ghiChu: string;
  anh: { c: string[]; d: string[] };
  them: boolean;
};

export const TEN_HANG: Record<Hang, string> = { romadio: "Romadio", civro: "Civro", ponzio: "Ponzio" };
export const TEN_TAG: Record<string, string> = { cn: "Cách nhiệt cao", an: "An ninh cao", de: "Dễ tiếp cận", sm: "Thông minh / Có động cơ" };
export const TEN_KET_CAU: Record<string, string> = { t: "Có cầu cách nhiệt", n: "Không cầu nhiệt", tn: "Có cả hai phiên bản" };
export const TEN_HE: Record<string, string> = { w: "Cửa sổ", d: "Cửa đi", s: "Cửa trượt", l: "Nâng trượt", f: "Xếp gấp", v: "Vách kính" };

export const HE_CUA_DS: HeCua[] = ${JSON.stringify(out,null,1)};
`;
fs.writeFileSync("src/lib/he-cua-du-lieu.ts",ts,"utf8");
console.log(out.length,"he;",nd,"bản vẽ;",nc,"ảnh 3D");
})();
