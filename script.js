// ===== MATRIX EFFECT =====
const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const letters="01";
const fontSize=14;
const columns=canvas.width/fontSize;
const drops=[];

for(let x=0;x<columns;x++) drops[x]=1;

function draw(){
ctx.fillStyle="rgba(2,6,23,0.05)";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#22c55e";
ctx.font=fontSize+"px monospace";

for(let i=0;i<drops.length;i++){
const text=letters[Math.floor(Math.random()*letters.length)];
ctx.fillText(text,i*fontSize,drops[i]*fontSize);

if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)
drops[i]=0;

drops[i]++;
}
}
setInterval(draw,33);

// ===== TOAST =====
function showToast(msg){
let toast=document.createElement("div");
toast.className="toast";
toast.innerText=msg;
document.body.appendChild(toast);

setTimeout(()=>toast.classList.add("show"),100);
setTimeout(()=>{
toast.classList.remove("show");
setTimeout(()=>toast.remove(),300);
},2500);
}

// ===== METAMASK =====
const connectBtn=document.getElementById("connectWallet");
const walletText=document.getElementById("walletAddress");
const copyBtn=document.getElementById("copyWallet");

let userAddress="";

if(connectBtn){
connectBtn.onclick=async()=>{
if(typeof window.ethereum!=="undefined"){
try{
const accounts=await ethereum.request({method:"eth_requestAccounts"});
userAddress=accounts[0];

walletText.innerHTML=
userAddress.substring(0,6)+"..."+
userAddress.substring(userAddress.length-4);

connectBtn.innerText="Connected";
showToast("✅ Wallet Connected");
}catch{
showToast("❌ Connection failed");
}
}else{
showToast("🦊 Install MetaMask");
}
};
}

if(copyBtn){
copyBtn.onclick=()=>{
if(userAddress){
navigator.clipboard.writeText(userAddress);
showToast("📋 Address copied");
}else{
showToast("Connect wallet first");
}
};
}

// ===== CONTRACT DEMO =====
const contractBtn=document.getElementById("contractBtn");
const contractResult=document.getElementById("contractResult");

if(contractBtn){
contractBtn.onclick=()=>{
contractResult.innerText="Smart contract executed ✅";
showToast("⚡ Contract executed");
};
}

// ===== CHART =====
const ctxChart=document.getElementById("cryptoChart");

if(ctxChart){
new Chart(ctxChart,{
type:"line",
data:{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{
label:"Crypto Trend",
data:[12,19,15,25,22,30,28],
borderColor:"#38bdf8",
tension:.4
}]
}
});
}
