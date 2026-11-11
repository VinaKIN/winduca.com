const sharp=require(process.cwd()+"/node_modules/sharp");
const score=module.exports=async function(p){
  const {data,info}=await sharp(p).flatten({background:"#fff"}).resize({width:1000,height:1000,fit:"inside"}).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const W=info.width,H=info.height,G=28,cw=Math.ceil(W/G),ch=Math.ceil(H/G);
  const R=new Uint16Array(cw*ch),B=new Uint16Array(cw*ch);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*3,r=data[i],g=data[i+1],b=data[i+2];
    const c=Math.floor(y/G)*cw+Math.floor(x/G);
    if(r>150&&g<85&&b<95)R[c]++; else if(b>105&&r<85&&g<110&&b>r+55)B[c]++;}
  let hits=0;for(let cy=0;cy<ch;cy++)for(let cx=0;cx<cw;cx++){
    let r=0,b=0;for(let dy=0;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const x=cx+dx,y=cy+dy;if(x<0||y<0||x>=cw||y>=ch)continue;r+=R[y*cw+x];b+=B[y*cw+x];}
    if(r>=10&&b>=25)hits++;}
  return hits;};
if(require.main===module){(async()=>{const all=JSON.parse(require("fs").readFileSync(process.argv[2]+"/local-list.json","utf8"));
 const names=[["INFINITY 19H_nobg","C"],["RD65IN 1_nobg","L"],["MD65IN 1_nobg","L"],["FineLine 59WO 1_nobg","L"],["RVE100IN 1_nobg","L"],["OVERSKY 23S Triple_nobg","L"],["MCW-120H_nobg","L"],["RW100SS_nobg","L"],["SEMI 1_nobg","L"],["RD190LS 1_nobg","L"],["INFINITY 19H.png","C"],["FineLine 59WO (1).jpg","L"],["RD65IN (1)","L"],["MD55IN (1)","L"],["RCT65 3_nobg","C"]];
 for(const [n,t] of names){const p=all.find(x=>x.includes(n));console.log(t,n,await score(p));}})();}
