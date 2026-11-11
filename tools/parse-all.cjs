const fs=require("fs");const S=process.argv[2];
const html=fs.readFileSync(S+"/wb-he-cua/he-cua.html","utf8");
const all=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join("\n");
function blk(t,tu,mo,dong){const i=t.indexOf(tu);if(i<0)return null;let j=i+tu.length-1,d=0;for(;j<t.length;j++){const c=t[j];if(c==='"'){j++;while(t[j]!=='"'){if(t[j]==="\\")j++;j++}continue}if(c===mo)d++;else if(c===dong){d--;if(d===0){j++;break}}}return{text:t.slice(i+tu.length-1,j),end:j}}
const D=JSON.parse(blk(all,"var D=[","[","]").text);const M={};let from=0;
while(true){const i=all.indexOf("var M={",from);if(i<0)break;const k=blk(all.slice(i),"var M={","{","}");Object.assign(M,JSON.parse(k.text));from=i+k.end}
D.forEach((r,i)=>{if(M[i])r[13]=M[i]});
const rows=D.map((r,i)=>({idx:i,hang:r[0],ma:r[1],loai:r[2],he:r[3],ketCau:r[4],tags:r[5],uValue:r[6],kinKhi:r[7],cachAm:r[8],kinNuoc:r[9],apLucGio:r[10],chongTrom:r[11],ghiChu:r[12],anh:r[13]||{c:[],d:[],p:[]}}));
fs.writeFileSync(S+"/wb-he-cua/all.json",JSON.stringify(rows,null,1));
const c={};rows.forEach(r=>{c[r.hang]=(c[r.hang]||0)+1});console.log(JSON.stringify(c));
const n={};rows.filter(r=>r.hang!=="romadio").forEach(r=>["c","d","p"].forEach(k=>n[r.hang+k]=(n[r.hang+k]||0)+(r.anh[k]||[]).length));console.log(JSON.stringify(n));
console.log(JSON.stringify([...new Set(rows.flatMap(r=>Array.isArray(r.tags)?r.tags:[r.tags]))]));
