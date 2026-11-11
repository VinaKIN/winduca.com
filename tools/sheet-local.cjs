const sharp=require(process.cwd()+"/node_modules/sharp");const fs=require("fs"),path=require("path");
const root="D:/3 Cowork Demo/media-social-content-agent/02-INPUT/02-hinh-anh/ROMADIO";
const all=[];(function walk(d){for(const f of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,f.name);if(f.isDirectory())walk(p);else if(/\.(png|jpg)$/i.test(f.name))all.push(p)}})(root);
fs.writeFileSync(process.argv[2]+"/local-list.json",JSON.stringify(all));
const want=process.argv.slice(3);
const pick=want.map(w=>all.find(p=>p.includes(w))).filter(Boolean);
(async()=>{const W=500,H=380,C=5;const comps=[];
for(let i=0;i<pick.length;i++){
 const b=await sharp(pick[i]).flatten({background:"#f3f3f3"}).resize(W,H,{fit:"contain",background:"#f3f3f3"}).png().toBuffer();
 const lab=Buffer.from(`<svg width="${W}" height="22" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="22" fill="#000" opacity=".6"/><text x="6" y="16" font-size="13" fill="#fff" font-family="Arial">${i}: ${path.basename(pick[i]).slice(0,60)}</text></svg>`);
 comps.push({input:b,left:(i%C)*W,top:Math.floor(i/C)*H},{input:lab,left:(i%C)*W,top:Math.floor(i/C)*H});}
const R=Math.ceil(pick.length/C);
await sharp({create:{width:W*C,height:H*R,channels:3,background:"#999"}}).composite(comps).jpeg({quality:80}).toFile(process.argv[2]+"/local1.jpg");console.log(pick.length,all.length)})();
