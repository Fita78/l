const products = [
  {id:1,image:"https://i.ibb.co/GfFrgR3C/22c8b86dd0e554e9062b829a3308235c.jpg",name:"Camiseta Iron Maiden",category:"camisetas",meta:"Peça única",price:18.90,tag:"NOVO DROP"},
  {id:2,image:"https://i.ibb.co/nM04KyMx/047cea0a921a4a3219677be3b140a59a.jpg",name:"Saia Jeans Preta",category:"saias",meta:"Peça única",price:24.90,tag:"GARIMPO"},
  {id:3,image:"https://i.ibb.co/Y7FkvMjv/5b24616c713ef43ffbb5fc15a2a17ecf.jpg",name:"Jaqueta de Couro",category:"jaquetas",meta:"Peça única",price:249.90,tag:"ÚNICA"},
  {id:4,image:"https://i.ibb.co/TBpY9vK0/0b9f51dc7d046b20911b42e62b1a3e70.jpg",name:"Jaqueta de Couro Preta",category:"jaquetas",meta:"Peça única",price:198.00,tag:"VINTAGE"},
  {id:5,image:"https://i.ibb.co/zTyTv7xB/0b20c6bf9d2bdce0583cff3f50d6d36c.jpg",name:"Camiseta Vintage 05",category:"camisetas",meta:"Peça única",price:16.90,tag:"DESTAQUE"},
  {id:6,image:"https://i.ibb.co/GfsWtf13/db763ac83277e9c7b630ebb522dc78c2.jpg",name:"Camiseta Vintage 06",category:"camisetas",meta:"Peça única",price:21.90,tag:"GARIMPO"},
  {id:7,image:"https://i.ibb.co/Cp9PSSGR/fed44ec7a01a4a106b9c75c053a15989.jpg",name:"Camiseta Vintage 07",category:"camisetas",meta:"Peça única",price:12.90,tag:"ÚNICA"},
  {id:8,image:"https://i.ibb.co/rRMXxyYh/c22df8f82cf72b54a52db9f0b0405eaf.jpg",name:"Camiseta Vintage 08",category:"camisetas",meta:"Peça única",price:19.90,tag:"GARIMPO"},
  {id:9,image:"https://i.ibb.co/B5wYfBMG/acf3ee2f897d6267b98ebdc43fa9c7f9.jpg",name:"Camiseta Vintage 09",category:"camisetas",meta:"Peça única",price:15.90,tag:"NOVO DROP"},
  {id:10,image:"https://i.ibb.co/YFkc8YCr/09707dac02e9366b89ed660b0a5b79e9.jpg",name:"Saia Vintage 10",category:"saias",meta:"Peça única",price:20.00,tag:"ÚNICA"},
  {id:11,image:"https://i.ibb.co/99rJcW4y/04022bb7739a20655f4ee8c8e04bcc9b.jpg",name:"Calça Jeans Vintage 11",category:"calcas",meta:"Peça única",price:29.90,tag:"VINTAGE"},
  {id:12,image:"https://i.ibb.co/KjXHXPRK/dc791ef3cad35feda5e13fa2455d2468.jpg",name:"Jaqueta Vintage 12",category:"jaquetas",meta:"Peça única",price:120.00,tag:"GARIMPO"},
  {id:13,image:"https://i.ibb.co/MDK6zK8j/9890c62119c80fdf6ee6b6f1dc68f51d.jpg",name:"Camiseta Vintage 13",category:"camisetas",meta:"Peça única",price:17.90,tag:"ÚNICA"}
];

let cart = JSON.parse(localStorage.getItem("fita78-cart") || "[]");
const money = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function renderProducts(filter="todos"){
 const grid=document.getElementById("productGrid"); const list=filter==="todos"?products:products.filter(p=>p.category===filter);
 grid.innerHTML=list.map(p=>`<article class="product-card" onclick="openProduct(${p.id})"><div class="product-img"><span class="tag">${p.tag}</span><img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><div><div class="product-name">${p.name}</div><div class="product-meta">${p.meta}</div></div><div class="price">${money(p.price)}</div></div></article>`).join("");
}
function openProduct(id){
 const p=products.find(x=>x.id===id); if(!p)return;
 document.getElementById("modalImage").src=p.image; document.getElementById("modalImage").alt=p.name;
 document.getElementById("modalTag").textContent=p.tag; document.getElementById("modalName").textContent=p.name; document.getElementById("modalMeta").textContent=p.meta; document.getElementById("modalPrice").textContent=money(p.price);
 document.getElementById("modalAdd").onclick=()=>{addToCart(p.id);closeProduct();};
 document.getElementById("modalWhatsapp").href="https://wa.me/5511952147338?text="+encodeURIComponent(`Olá! Tenho interesse na peça ${p.name} (${money(p.price)}). Ainda está disponível?`);
 document.getElementById("productModal").classList.add("open"); document.getElementById("productModal").setAttribute("aria-hidden","false");
}
function closeProduct(){document.getElementById("productModal").classList.remove("open");document.getElementById("productModal").setAttribute("aria-hidden","true");}
function addToCart(id){if(cart.some(p=>p.id===id)){showToast("Essa peça já está na sua sacola.");return;} const p=products.find(x=>x.id===id);cart.push(p);saveCart();showToast("Peça adicionada à sacola.");updateCart();}
function removeFromCart(id){cart=cart.filter(p=>p.id!==id);saveCart();updateCart();}
function saveCart(){localStorage.setItem("fita78-cart",JSON.stringify(cart));}
function updateCart(){document.getElementById("cartCount").textContent=cart.length;const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><img class="mini-img" src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${p.meta}</p><strong>${money(p.price)}</strong></div><button class="remove" onclick="removeFromCart(${p.id})">remover</button></div>`).join(""):`<div class="empty">Sua sacola está vazia.<br>Vai dar uma olhada no garimpo?</div>`;document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("open");}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("open");}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2200);}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");btn.classList.add("active");renderProducts(btn.dataset.filter);}));
document.getElementById("openCart").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;document.getElementById("closeProduct").onclick=closeProduct;document.getElementById("productModal").onclick=e=>{if(e.target.id==="productModal")closeProduct();};
document.getElementById("checkout").onclick=()=>{if(!cart.length){showToast("Adicione uma peça primeiro.");return;}const text="Olá! Quero fazer um pedido na Fita 78:%0A%0A"+cart.map(p=>`• ${p.name} — ${money(p.price)}`).join("%0A")+`%0A%0ATotal: ${money(cart.reduce((s,p)=>s+p.price,0))}`;window.open("https://wa.me/5511952147338?text="+text,"_blank");};
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Pronto! Você entrou na lista da Fita 78.");e.target.reset();});
renderProducts();updateCart();
