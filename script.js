const P = "#8e3fb0", O = "#ff7a1a", G = "#1f9a48";
const SALADS = [
 {n:1,type:"Fruit salad",name:"Full Antioxidant",tag:"Fights free radicals",accent:P,
  goal:"Fights free radicals and supports healthy skin and immunity.",
  sauce:"Plain yoghurt, a little honey, lime juice",
  note:"All fruits are dark red–purple varieties, rich in phenolic compounds.",
  ing:[["Strawberry","Vitamin C + anthocyanin","#d93a4a"],["Blueberry / red grape","Resveratrol, flavonoids","#3b3f8f"],["Red dragon fruit","Betacyanin","#b0245f"],["Kiwi","Vitamin C + E","#8bb53f"],["Pomegranate","Punicalagin","#a3182f"]]},
 {n:2,type:"Fruit salad",name:"Full Vitamin C",tag:"Immune boost",accent:O,
  goal:"Boosts the immune system and supports collagen synthesis.",
  sauce:"Orange juice, yoghurt, a little grated ginger",
  note:"Avoid long storage: vitamin C is sensitive to oxidation and light.",
  ing:[["Orange","Balanced sweet-sour taste","#f39a1e"],["Kiwi","Vitamin C, about 2× orange per gram","#8bb53f"],["Pineapple","Vitamin C + bromelain","#f2cf43"],["Papaya","Vitamin C + beta-carotene","#ee7a4c"]]},
 {n:3,type:"Fruit salad",name:"High Fiber",tag:"Gut health",accent:P,
  goal:"Supports digestion and a healthy gut microbiota.",
  sauce:"Yoghurt, a little blended oats, honey",
  note:"A good fit for a “digestive health” product.",
  ing:[["Apple","Pectin","#d8453a"],["Banana","Soluble fiber + natural prebiotic","#efd96b"],["Pear","High in fiber","#b9c76a"],["Avocado","Fiber + healthy fats","#5f8a3a"]]},
 {n:4,type:"Vegetable salad",name:"Full Antioxidant",tag:"Deep color",accent:P,
  goal:"Reduces oxidative stress and helps fight inflammation.",
  sauce:"Olive oil, lemon, a little black pepper (helps absorb lycopene and carotenoids)",
  note:"Deep colors indicate a high content of phenolic compounds.",
  ing:[["Red spinach","Anthocyanin","#8e2a55"],["Broccoli","Sulforaphane + vitamin C","#3f7d3a"],["Beetroot / purple carrot","Betalain, anthocyanin","#7a1f4a"],["Tomato","Lycopene","#d9392b"],["Purple cabbage","Flavonoids","#7b4a99"]]},
 {n:5,type:"Vegetable salad",name:"Full Vitamin C & Folate",tag:"Immunity + blood cells",accent:G,
  goal:"Supports immunity and the formation of red blood cells.",
  sauce:"Lemon and olive oil, sprinkled with sesame seeds",
  note:"Red bell pepper has more vitamin C than orange per 100 g.",
  ing:[["Broccoli","Vitamin C + folate","#3f7d3a"],["Red / yellow bell pepper","Very high in vitamin C","#e0402f"],["Cauliflower","Vitamin C","#e9e6cf"],["Lettuce","Folate","#8fc05a"],["Tomato","Vitamin C + K","#d9392b"]]},
 {n:6,type:"Vegetable salad",name:"High Fiber & Low Calorie",tag:"Weight control",accent:G,
  goal:"Keeps you full longer with low energy intake.",
  sauce:"Yoghurt, lemon juice, a little mustard",
  note:"A good fit for diet programs or a “light meal” product.",
  ing:[["Lettuce","Fiber, low calorie","#8fc05a"],["Cucumber","Fiber, high water content","#7fae5c"],["Carrot","Fiber + beta-carotene","#f08a2c"],["Green beans","Fiber","#4f8f3f"],["Green cabbage","Fiber","#a9cf7a"]]}
];
// SAMPLE DATA: replace with real farmer data
const FARMS = [["Kelompok Tani Sumber Rejeki","Bumiaji, Batu"],["Kelompok Tani Makmur","Poncokusumo, Malang"],["Mitra Tani Sejuk","Junrejo, Batu"],["Kelompok Tani Mulyo","Pare, Kediri"],["Gapoktan Tani Jaya","Dau, Malang"],["Kelompok Tani Subur","Pujon, Malang"]];

const $ = s => document.querySelector(s);
const params = new URLSearchParams(location.search);
const pad = n => String(n).padStart(2, "0");
const fmt = d => d.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
const fmtT = d => fmt(d) + " • " + pad(d.getHours()) + ":" + pad(d.getMinutes());

// Waktu produksi: default hari ini 06:00 (atau ?produced=2026-10-15T06:00). Umur simpan 24 jam.
let produced = params.get("produced") ? new Date(params.get("produced")) : new Date();
if (!params.get("produced")) { produced.setHours(6,0,0,0); if (produced > new Date()) produced.setDate(produced.getDate()-1); }
const expiry = new Date(produced.getTime() + 24*3600*1000);
let cur = null, timer = null;

function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.hidden = s.id !== id);
  window.scrollTo(0,0);
}

function renderPick() {
  const groups = ["Fruit salad","Vegetable salad"].map(t => `<div class="group"><h3>${t}s</h3><div class="cards">` +
    SALADS.filter(s => s.type === t).map(s => `<button class="card" style="--accent:${s.accent}" data-salad="${s.n}">
      <div class="pic"><img src="images/${s.n}.webp" alt="${s.name} pack"></div><strong>${s.name}</strong><span>${s.tag}</span></button>`).join("") + `</div></div>`).join("");
  $("#pick-list").innerHTML = groups;
}

function batchId(s) { return `FT-${pad(produced.getDate())}${pad(produced.getMonth()+1)}-${params.get("batch") || "00"+s.n}`; }

function openSalad(n) {
  cur = SALADS.find(s => s.n === n); if (!cur) return;
  document.body.style.setProperty("--accent", cur.accent);
  $("#s-img").src = `images/${n}.webp`; $("#s-img").alt = cur.name + " pack";
  $("#s-type").textContent = cur.type + " • " + cur.tag;
  $("#s-name").textContent = cur.name; $("#s-goal").textContent = cur.goal;
  $("#s-sauce").textContent = cur.sauce; $("#s-note").textContent = cur.note;
  $("#s-ing").innerHTML = cur.ing.map((g,i) => `<button class="ing" data-ing="${i}"><span class="sw" style="background:${g[2]}"></span><span><b>${g[0]}</b><small>${g[1]}</small></span></button>`).join("");
  $("#s-pass").innerHTML = [["Batch",batchId(cur)],["Produced",fmtT(produced)],["Best consumed before",fmtT(expiry)],["Storage","2–5°C"],["Traceability","✓ Recorded"]]
    .map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("");
  show("salad"); updateFresh(); clearInterval(timer); timer = setInterval(updateFresh, 60000);
}

function updateFresh() {
  const p = Math.round(Math.max(0, Math.min(100, (expiry - new Date()) / (expiry - produced) * 100)));
  const [txt, col] = p > 50 ? ["Fresh","#7bd08c"] : p > 20 ? ["Eat soon","#f2c14e"] : p > 0 ? ["Almost expired","#f08a4b"] : ["Expired","#e5584f"];
  $("#f-status").textContent = txt; $("#f-pct").textContent = p + "%";
  $("#f-dot").style.background = col; $("#f-bar").style.width = p + "%";
}

/* Popup traceability */
function origin(i) {
  const f = FARMS[(cur.n + i) % FARMS.length], h = new Date(produced); h.setDate(h.getDate() - 1 - (i % 3));
  return {farmer:f[0], loc:f[1], harvest:fmt(h), batch:`KB-${pad(h.getDate())}${pad(h.getMonth()+1)}-${"ABCDE"[i]}`};
}
function dlg(html) { $("#dlg-body").innerHTML = html; if (!$("#dlg").open) $("#dlg").showModal(); }
const row = (k,v) => `<div class="row"><p class="k">${k}</p><b>${v}</b></div>`;

function openIng(i) {
  const g = cur.ing[i], o = origin(i);
  dlg(`<p class="k">Ingredient traceability</p><h2>${g[0]}</h2>${row("Benefit",g[1])}${row("Farmer",o.farmer)}${row("Origin",o.loc)}${row("Harvest",o.harvest)}
    <button class="btn full" data-journey="${i}">Trace this ingredient</button>`);
}
function openJourney(i) {
  const g = cur.ing[i], o = origin(i);
  const steps = [["🌱","Farm",o.loc,"Partner farmer"],["🌾","Harvest",o.harvest,"Freshly harvested"],["📦","Collection","Batch "+o.batch,"Quality checked"],["🚚","Delivery","Cold chain","Kept at 2–5°C"],["🥗","Your salad",cur.name,"Ready to enjoy"]];
  dlg(`<p class="k">Ingredient journey</p><h2>${g[0]}</h2>` + steps.map(s => `<div class="step"><i>${s[0]}</i><div><small>${s[1]}</small><b>${s[2]}</b><small>${s[3]}</small></div></div>`).join('<div class="line"></div>') +
    `<button class="btn full" data-map="${i}">View farm map</button>`);
}
function openMap(i) {
  const o = origin(i);
  dlg(`<p class="k">Farm location</p><h2>${o.loc}</h2><div class="map"><u style="width:120%;height:24px;top:40%;left:-10%;transform:rotate(12deg)"></u><u style="width:100%;height:18px;top:65%;left:5%;transform:rotate(-20deg)"></u><u style="width:18px;height:120%;top:-10%;left:65%;transform:rotate(15deg)"></u><span class="pin">📍</span><p>${o.farmer}</p></div>
    <button class="btn full" data-ing="${i}">← Back to ingredient</button>`);
}

document.addEventListener("click", e => {
  const t = e.target.closest("[data-go],[data-salad],[data-ing],[data-journey],[data-map],.x"); if (!t) return;
  if (t.dataset.go) show(t.dataset.go);
  else if (t.dataset.salad) openSalad(+t.dataset.salad);
  else if (t.dataset.journey) openJourney(+t.dataset.journey);
  else if (t.dataset.map) openMap(+t.dataset.map);
  else if (t.dataset.ing) openIng(+t.dataset.ing);
  else $("#dlg").close();
});
$("#dlg").addEventListener("click", e => { if (e.target.id === "dlg") e.target.close(); });

renderPick();
if (params.get("salad")) openSalad(+params.get("salad"));
