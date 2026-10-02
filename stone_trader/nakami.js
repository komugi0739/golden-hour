// #region main
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    
    mvlsD: document.getElementById('movlis'),
     mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0
}
let mainF = {};
mainF.move = (to) => {
    if(mainC.spa == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of Spaces) document.getElementById(a.name).classList.remove('show');
    document.getElementById(to).classList.add('show');
    mainC.spa = to;

    history.replaceState(null, "", `?${to}`);
}

mainF.load = () => {
    for(let spa of Spaces){
        let div = document.getElementById(spa.name);
        if(!div) continue;

        div.style.zIndex = spa.rank;
        div.style.background = spa.back;
    }
}

//#region movlis
for(let n of Spaces){
    let li = document.createElement('div');
    li.textContent = n.name;
    li.className = 'item';

    li.addEventListener('click', () => mainF.move(n.name));

    mainC.mvlsLD.appendChild(li);
}
document.addEventListener('keydown', (e) => {
    if(e.key != 'm' || mainC.mvlsi) return;
    mainC.mvlsD.style.left = `${OBS.mx - mainC.mvlsD.offsetWidth/2}px`;
    mainC.mvlsD.style.top = `${OBS.my}px`;
    mainC.mvlsD.classList.add('tog');
    mainC.mvlsi = 1;
})
document.addEventListener('keyup',e => {
    if(e.key != 'm') return;
    mainC.mvlsD.classList.remove('tog');
    mainC.mvlsi = 0;
})
//#endregion

//#endregion main

function findGeneric(list, type, name, extraCheck = null){
    let data;
    if(extraCheck) data = extraCheck(list, name);
     else data = list.find(a => a.name == name || a.jpnm == name);
    if(data) return data;
    
    console.log(`[find] ${type}で、「${name}」っていうものはないらしいです`);
    return 0;
}
// const findKaris = (name) => findGeneric(Karis, "Karis", name);


// #region hendou
function hendou(){
    for(let ore of Ores){
        // console.log(ore.priceR);
        let price = random(...ore.priceR);
        ore.price = price;
    }

    tekiou();
}
// #endregion

// #region tekiou
function tekiou(){
    debugF.tekiou();
    uppF.tekiou();
}
// #endregion

// #region upper
let uppD = document.getElementById('upper');
let uppC = {
    rimiD: uppD.querySelector('.rimi .num'),
    bacD: uppD.querySelector('.back'),
}
let uppF = {};
uppF.tekiou = () => {
    uppC.rimiD.textContent = `#${rimi}`;
};
uppF.backA = () => uppC.bacD.classList.add('show');
uppF.backD = () => uppC.bacD.classList.remove('show');
uppC.bacD.addEventListener('click', () => mainF.move('loby'));
// #endregion

// #region loby
let lobD = document.getElementById("loby");
let lobC = {
    griD: lobD.querySelector(".grid"),
    divs: {},
}
let lobF = {};
lobF.load = () => {
    for(let area of Spaces){
        let name = area.name;
        if(name == 'loby') continue;

        let div = document.createElement('div');
        div.className = `icon ${name}`;

        let img = images.systems[name].cloneNode(true);
        div.appendChild(img);

        div.addEventListener('click', () => mainF.move(name));

        lobC.griD.appendChild(div);
    }

}
// #endregion

// #region mine
let minD = document.getElementById('mine');
let minC = {
    veinD: minD.querySelector('.vein'),
    vein: [],
    row: 4,
}
let minF = {};
class minA_ore{
    constructor(data = {}){
        let div = El("div", "ore"); //idを禁じてみようか        
        let bleck = images.systems['destroy'].cloneNode(true);
        div.appendChild(bleck);

        let pickd = findPickels(p => p.name == minC.pick);
        this.fuyo = new fuyoNagaOSU(div, this.hakai, pickd.w);
        
        

        this.div = div;
    }

    changed(name){
        let pickd = findPickels(p => p.name == minC.pick);
        this.fuyo.timeMachine = pickd.w;
    }
}


minF.load = () => {
    minC.vein = [];
    minC.veinD.innerHTML = '';

    for(let i=0; i<16; i++){
        let arr = [];
        for(let i2=0; i2<4; i2++) arr.push(arraySelect(["5px", "10px", "15px"]));
        let div = document.createElement('div');
        div.className = `ore o${i}`;
        div.style.borderRadius = arr.join(' ');
        
        let dest = images.systems['destroy'].cloneNode(true);
        dest.className = 'dest';
        dest.style.borderRadius = arr.join(' ');
        div.appendChild(dest);


        let time = 500
        let ms = 10;
        let timer = null;
        let holding = false;
        let scale = 50;
        let kaijo = () => {
            holding = false;
            clearTimeout(timer);
            dest.classList.remove('show');
        };
        div.addEventListener('pointerdown', () => {
            holding = true;
            dest.style.clipPath = `inset(100%)`;
            scale = 50;
            dest.classList.add('show');

            (function loop(){
                if(!holding) return;
                // time/ms回で、100を0にする
                scale -= 50/time*ms;
                dest.style.clipPath = `inset(${scale}%)`;
                setTimeout(loop, ms);
            })();

            timer = setTimeout(() => {
                minF.hakai(i);
                kaijo();
            }, time);
        });
        div.addEventListener('pointerup', kaijo);
        div.addEventListener('pointerleave', kaijo);

        minC.veinD.appendChild(div);

        let v = {
            name:'stone',
            lack:0,
        }
        minC.vein.push(v);

        minF.hakai(i);
    }
}

minF.hakai = (i) => {
    // nicoText(`${i}を破壊しました`);
    let div = minC.veinD.querySelector(`.ore.o${i}`);
    let name = minC.vein[i].name;
    let lack = minC.vein[i].lack;

    let arr = [];
    for(let i2=0; i2<4; i2++) arr.push(arraySelect(["5px", "10px", "15px"]));

    jump:{
        if(name == 'stone') break jump;

        let oreD0 = div.querySelector('.mono');
        if(oreD0) oreD0.remove();

        let ore = Ores.find(o => o.name == name);
        if(!ore) console.error(`先輩、そんなアイテムないっすよ～？ (${name})`);
        let price = ore.price;
         if(rimi < price) return addtext('金が足りません。金を買いますか');
        
        rimi -= price;
        ore.x += 1;
        tekiou();
        tobiText(div, `- #${price}`);
    }

    let ars = {
        ore: Ores.map(o => o.name),
        pro: Ores.map(o => o.p),
    }
    ars.ore.push('stone');
    ars.pro.push(17);
    let ore = arrayGacha(ars.ore, ars.pro);

    jump:{
        if(ore == 'stone') break jump;
        
        let oreD = images.items[ore].cloneNode(true);
        oreD.className = 'mono';
        oreD.style.borderRadius = arr.join(' ');
        div.appendChild(oreD);
    }
    minC.vein[i].name = ore;
    minC.vein[i].lack = probability(3) ? 1 : 0;
}
// #endregion

// #region shichi
let sciD = document.getElementById('shichi');
let sciC = {
    ownerSD: sciD.querySelector('.owner .chara'),
    owberTD: sciD.querySelector('.owner .text'),
    ternerD: sciD.querySelector('.terner'),
}
let sciF = {};
sciF.load = () => {
    for(let ore of Ores.filter(o => o.name != 'stone')){
        let name = ore.name;

        let div = document.createElement('div');
        div.className = `item ${name}`;
        
        let img = images.items[name].cloneNode(true);
        div.appendChild(img);

        let lavel = document.createElement('div');
        lavel.className = 'lavel';
        lavel.innerText = ore.jpnm;
        div.appendChild(lavel);

        div.addEventListener('click', () => {
            if(ore.x == 0) return;
            
            let price = ore.price;
            rimi += price*ore.x;
            ore.x = 0;
            tekiou();
            tobiText(div, `+ #${price}`);
        })

        sciC.ternerD.appendChild(div);
    }
} 
// #endregion

// #region shop
let shoD = document.getElementById('shop');
let shoC = {

}
let shoF = {};
// #endregion

// #region still
let stiD = document.getElementById('still');
let stiC = {

}
let stiF = {};
// #endregion

// #region debug
let debugD = document.getElementById('debug');
let debugC = {
    statD: debugD.querySelector('.stat'),
    dataD: debugD.querySelector('.data'),
    menuD: debugD.querySelector('.menu'),
}
let debugF = {};
debugF.tog = () => debugD.classList.toggle('show');
debugF.istog = () => debugD.classList.contains('show');
document.addEventListener('keydown', e => {if(e.key == 'g') debugF.tog()});
debugF.load = () => {
    for(let o of Ores){
        let div = document.createElement('div');
        div.className = `item ${o.name}`;

        let img = images.items[o.name];
        div.appendChild(img);

        let co = document.createElement('div');
        co.className = 'num co-su';
        co.innerText = 0;
        div.appendChild(co);

        let ne = document.createElement('div');
        ne.className = 'num ne-dn';
        ne.dataset.description = `#${o.priceR[0]} ~ #${o.priceR[1]}`;
        ne.innerText = NaN;
        div.appendChild(ne);

        debugC.dataD.appendChild(div);
    }
}
debugF.tekiou = () => {
    debugC.statD.querySelector('.rimi').innerText = `r: #${rimi}`;

    for(let o of Ores){
        let div = debugC.dataD.querySelector(`.item.${o.name}`);
        let co = div.querySelector('.co-su');
         co.dataset.description = `=>  #${o.price * o.x}`;
         co.innerText = `${o.x}x`;
        let ne = div.querySelector('.ne-dn');
         ne.innerText = `#${o.price}`;
    }
}
// #endregion

//#region loop
let loop = 0;
let looped = 0;
let loopI = null;
function gameloop(){
    if(!loop) return clearInterval(loopI);
    looped += 1;

    if(looped % 100 == 0) hendou(), console.log('hendou!');
}
function restart(){
    looped = 0;
    loop = 1;
    hendou();
    loopI = setInterval(gameloop, 100, 0);
}
//#endregion




//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();
    lobF.load();
    minF.load();
    shoF.load();

    let hash = location.hash.replace("?", "");
    let space = Spaces.find(a => a.name == hash);
    if(!space) space = Spaces.find(a => a.sho);
    mainF.move(space.name);
}
//#endregion

//#region DOM
let LoadOfWait = async() => await loaF.load();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else init();

async function init() {
    await LoadOfWait();
}
//#endregion