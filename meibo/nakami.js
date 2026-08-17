function zenpan(){
    for(let cla of Classes){
        let deta = document.createElement("details");
         deta.className = "classdesu";
         let summary = document.createElement("summary");
         summary.textContent = cla.class;
         deta.appendChild(summary);
        
        let sen = document.createElement("div");
        sen.className = "sen";
        sen.textContent = `担当: ${cla.teacher}`;
        deta.appendChild(sen);

        let STUs = document.createElement("div");
        STUs.className = "stus";
        STUs.innerHTML = cla.students.map(a => `<div class="human h${a.num}"> ${a.num}: ${a.name}</div>`).join("");
        deta.appendChild(STUs);

        document.getElementById("classes").appendChild(deta);
    }
}



//#region start
function start(){
    zenpan();
    
}
//#endregion

//#region DOM
let LoadOfWait = async() => await init();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else init();

async function init() {
    start();
}
//#endregion