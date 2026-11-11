const sharp=require(process.cwd()+"/node_modules/sharp");const fs=require("fs"),path=require("path");const S=process.argv[2];
const files=JSON.parse(fs.readFileSync(S+"/wb-he-cua/other.json","utf8")).urls.map(u=>path.basename(u));
(async()=>{const W=640,H=480,C=4,R=3,per=12;
for(let s=0;s*per<files.length;s++){const part=files.slice(s*per,s*per+per);const comps=[];
for(let i=0;i<part.length;i++){
 const b=await sharp(S+"/wb-img-other/"+part[i]).flatten({background:"#fff"}).resize(W,H,{fit:"contain",background:"#fff"}).png().toBuffer();
 const lab=Buffer.from(`<svg width="60" height="30" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="30" fill="#e31937"/><text x="8" y="22" font-size="20" fill="#fff" font-family="Arial">${s*per+i}</text></svg>`);
 comps.push({input:b,left:(i%C)*W,top:Math.floor(i/C)*H},{input:lab,left:(i%C)*W,top:Math.floor(i/C)*H});}
await sharp({create:{width:W*C,height:H*R,channels:3,background:"#ccc"}}).composite(comps).jpeg({quality:82}).toFile(S+"/o"+s+".jpg");}
console.log(files.length)})();
