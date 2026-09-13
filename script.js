const products = [
  {id:1,image:"https://i.ibb.co/GfFrgR3C/22c8b86dd0e554e9062b829a3308235c.jpg",name:"Camiseta Racing 90s",category:"camisetas",meta:"Tam. M · algodão",price:89.90,tag:"NOVO DROP",description:"Camiseta vintage com visual esportivo e personalidade. Peça única da Fita 78."},
  {id:2,image:"https://i.ibb.co/nM04KyMx/047cea0a921a4a3219677be3b140a59a.jpg",name:"Jaqueta Workwear",category:"jaquetas",meta:"Tam. G · sarja",price:159.90,tag:"GARIMPO",description:"Jaqueta de inspiração workwear, escolhida pelo caimento e pela construção."},
  {id:3,image:"https://i.ibb.co/Y7FkvMjv/5b24616c713ef43ffbb5fc15a2a17ecf.jpg",name:"Camiseta Banda Vintage",category:"camisetas",meta:"Tam. P · 100% algodão",price:119.90,tag:"ÚNICA",description:"Camiseta vintage com estampa marcante. Uma única unidade disponível."},
  {id:4,image:"https://i.ibb.co/TBpY9vK0/0b9f51dc7d046b20911b42e62b1a3e70.jpg",name:"Jeans Baggy 90s",category:"calcas",meta:"Tam. 40 · denim",price:139.90,tag:"VINTAGE",description:"Modelagem baggy inspirada nos anos 90, com visual clássico de denim."},
  {id:5,image:"https://i.ibb.co/zTyTv7xB/0b20c6bf9d2bdce0583cff3f50d6d36c.jpg",name:"Jaqueta de Couro",category:"jaquetas",meta:"Tam. M · couro",price:189.90,tag:"DESTAQUE",description:"Jaqueta de couro com presença. Uma das peças de destaque do garimpo."},
  {id:6,image:"https://i.ibb.co/GfsWtf13/db763ac83277e9c7b630ebb522dc78c2.jpg",name:"Camisa Listrada",category:"camisetas",meta:"Tam. M · algodão",price:79.90,tag:"GARIMPO",description:"Camisa listrada casual, selecionada para compor looks vintage do dia a dia."},
  {id:7,image:"https://i.ibb.co/Cp9PSSGR/fed44ec7a01a4a106b9c75c053a15989.jpg",name:"Calça Cargo Militar",category:"calcas",meta:"Tam. 38 · sarja",price:129.90,tag:"ÚNICA",description:"Cargo de inspiração militar, com bolsos e visual utilitário."},
  {id:8,image:"https://i.ibb.co/rRMXxyYh/c22df8f82cf72b54a52db9f0b0405eaf.jpg",name:"Óculos Retrô",category:"acessorios",meta:"Armação anos 80",price:69.90,tag:"ACESSÓRIO",description:"Óculos com estética retrô para completar o visual."},
  {id:9,image:"https://i.ibb.co/B5wYfBMG/acf3ee2f897d6267b98ebdc43fa9c7f9.jpg",name:"Peça Vintage 09",category:"camisetas",meta:"Consulte detalhes",price:99.90,tag:"NOVO",description:"Peça vintage selecionada pela Fita 78. Chame no WhatsApp para confirmar medidas e detalhes."},
  {id:10,image:"https://i.ibb.co/YFkc8YCr/09707dac02e9366b89ed660b0a5b79e9.jpg",name:"Peça Vintage 10",category:"jaquetas",meta:"Consulte detalhes",price:119.90,tag:"GARIMPO",description:"Garimpo vintage em unidade única. Chame no WhatsApp para confirmar medidas e detalhes."},
  {id:11,image:"https://i.ibb.co/99rJcW4y/04022bb7739a20655f4ee8c8e04bcc9b.jpg",name:"Peça Vintage 11",category:"calcas",meta:"Consulte detalhes",price:109.90,tag:"ÚNICA",description:"Peça vintage em unidade única. Chame no WhatsApp para confirmar medidas e detalhes."},
  {id:12,image:"https://i.ibb.co/KjXHXPRK/dc791ef3cad35feda5e13fa2455d2468.jpg",name:"Peça Vintage 12",category:"acessorios",meta:"Consulte detalhes",price:79.90,tag:"ACESSÓRIO",description:"Acessório vintage selecionado pela Fita 78. Chame no WhatsApp para confirmar detalhes."},
  {id:13,image:"https://i.ibb.co/MDK6zK8j/9890c62119c80fdf6ee6b6f1dc68f51d.jpg",name:"Peça Vintage 13",category:"camisetas",meta:"Consulte detalhes",price:89.90,tag:"GARIMPO",description:"Peça vintage selecionada pela Fita 78. Chame no WhatsApp para confirmar medidas e detalhes."}
];

let cart = JSON.parse(localStorage.getItem("fita78-cart") || "[]");

const money = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

function renderProducts(filter="todos"){
  const grid=document.getElementById("productGrid");
  const list=filter==="todos"?products:products.filter(p=>p.category===filter);
  grid.innerHTML=list.map(p=>`
    <article class="product-card" onclick="openProduct(${p.id})">
      <div class="product-img">
        <span class="tag">${p.tag}</span>
        <img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div><div class="product-name">${p.name}</div><div class="product-meta">${p.meta}</div></div>
        <div class="price">${money(p.price)}</div>
      </div>
    </article>
  `).join("");
}

function openProduct(id){
  const p=products.find(x=>x.id===id);
  if(!p)return;
  document.getElementById("modalImage").src=p.image;
  document.getElementById("modalImage").alt=p.name;
  document.getElementById("modalTag").textContent=p.tag;
  document.getElementById("modalName").textContent=p.name;
  document.getElementById("modalMeta").textContent=p.meta;
  document.getElementById("modalPrice").textContent=money(p.price);
  document.getElementById("modalDescription").textContent=p.description;
  document.getElementById("modalAdd").onclick=()=>{addToCart(p.id);closeProduct();};
  const text=encodeURIComponent(`Olá! Tenho interesse na peça ${p.name} (${money(p.price)}). Ainda está disponível?`);
  document.getElementById("modalWhatsapp").href=`https://wa.me/5511952147338?text=${text}`;
  document.getElementById("productModal").classList.add("open");
  document.getElementById("productModal").setAttribute("aria-hidden","false");
}
function closeProduct(){
  document.getElementById("productModal").classList.remove("open");
  document.getElementById("productModal").setAttribute("aria-hidden","true");
}

function addToCart(id){
  if(cart.some(p=>p.id===id)){showToast("Essa peça já está na sua sacola.");return;}
  const p=products.find(x=>x.id===id);
  cart.push(p);
  saveCart();
  showToast("Peça adicionada à sacola.");
  updateCart();
}

function removeFromCart(id){
  cart=cart.filter(p=>p.id!==id);
  saveCart(); updateCart();
}

function saveCart(){localStorage.setItem("fita78-cart",JSON.stringify(cart));}

function updateCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const box=document.getElementById("cartItems");
  box.innerHTML=cart.length?cart.map(p=>`
    <div class="cart-item">
      <img class="mini-img" src="${p.image}" alt="${p.name}">
      <div><h4>${p.name}</h4><p>${p.meta}</p><strong>${money(p.price)}</strong></div>
      <button class="remove" onclick="removeFromCart(${p.id})">remover</button>
    </div>`).join(""):`<div class="empty">Sua sacola está vazia.<br>Vai dar uma olhada no garimpo?</div>`;
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}

function openCart(){
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").classList.add("open");
  document.getElementById("cart").setAttribute("aria-hidden","false");
}
function closeCart(){
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
  document.getElementById("cart").setAttribute("aria-hidden","true");
}
function showToast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("closeProduct").onclick=closeProduct;
document.getElementById("productModal").addEventListener("click",e=>{if(e.target.id==="productModal")closeProduct();});

document.getElementById("checkout").onclick=()=>{
  if(!cart.length){showToast("Adicione uma peça primeiro.");return;}
  const text="Olá! Quero fazer um pedido na Fita 78:%0A%0A"+cart.map(p=>`• ${p.name} — ${money(p.price)}`).join("%0A")+`%0A%0ATotal: ${money(cart.reduce((s,p)=>s+p.price,0))}`;
  window.open("https://wa.me/5511952147338?text="+text,"_blank");
};

document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();
  showToast("Pronto! Você entrou na lista da Fita 78.");
  e.target.reset();
});

renderProducts();
updateCart();
