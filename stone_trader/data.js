(function(){
    let ooD = document.getElementById('logOutput');
    ooD.addEventListener("dblclick", () => ooD.classList.remove("on"));

    let div0 = ooD.querySelector(".logs")
    function hookConsole(type){
        let oldFunc = console[type];
        console[type] = function(){
            oldFunc.apply(console, arguments);

            let text = Array.from(arguments)
            .map(a => {
                if(typeof a == "object") return JSON.stringify(a);
                else return a;
            }).join(" ");

            let div = document.createElement("div");
             div.className = type
             div.innerText = text;
             div0.appendChild(div);
            div0.scrollTop = div0.scrollHeight;

            let arr = div0.children;
            while(40 < arr.length){
                div0.firstElementChild.remove();
            }
        };
    }
    hookConsole("log");
    hookConsole("error");
    hookConsole("warn");

    let codeInput = ooD.querySelector("textarea")
    let runBtn = ooD.querySelector(".bt")

    function executeCode(){
        let code = codeInput.value;
         if(!code) return;

        console.log("> " + code);

        try {
            let result = eval(code);
            console.log(result);
        }
        catch(err){
            // 文法エラーや実行時エラーのキャッチ
            console.error(err);
        }

        codeInput.value = "";
    }

    runBtn.addEventListener('click', executeCode);
    codeInput.addEventListener('keydown', function(e){
        if(e.key == "Enter" && !(e.ctrlKey || e.metaKey || e.shiftKey)){
            e.preventDefault();
            executeCode();
        }
    })
    codeInput.addEventListener("resize", () => {
        runBtn.style.height = codeInput.offsetWidth;
    })
})();

let Style = {
    iPhone:{ //16
        "width": "393px",
    },
    ki:{
        "back": "#000000",
        "bor":  "#ffffff",
        "aima": "#808080"
    },
    mine:{
        "row": "4",
    },
    back:{
        "col": "#a3c9ff"
    },
    tekiou: function() {
        for (let section in this) {
            if (section == 'apply') continue;
            for (let key in this[section]) {
                document.documentElement.style
                    .setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
}

const Fonts = [
    {src:'comicsans', type:'ttf'},
    {src:'papyrus', type:'ttf'},
    {src:'cube12', type:'ttf'},
];

const Images = {
    systems:['error', 'mine', 'shichi', 'shop', 'still', 'destroy'],
    items:['coal', 'iron', 'ruby', 'gold', 'larimar']
}

const Sounds = {
    // se:['error'],
    // bgm:[],
}

const Secrates = [
    {
        ind:0,
        name:'koppepan',
        arr:['k','o','p','p','e','p','a','n'],
        limit:3,
        func: async function(){
            nicoText('なんにも起こらない＝ヨーン');
        }
    },
    {
        ind:0,
        name:'re',
        arr:['r','e'],
        limit:1,
        func: async function(){
            let img = document.createElement('img');
            img.id = 'hakaisatsu';
            img.src = 'assets/images/systems/hakai_1.png'
            img.dataset.phase = 1;
            document.querySelector('body').appendChild(img);

            setTimeout(() => {
                img.remove();
                this.ind = 0;
                this.limit = 1;
            }, 3000)

            return 0;
        }
    },
    {
        ind:0,
        name:'rere',
        arr:['r','e','r','e'],
        limit:1,
        func: async function(){
            let img = document.getElementById('hakaisatsu');
            if(!img) return;

            img.src = 'assets/images/systems/hakai_2.png'
            img.dataset.phase = 2;

            setTimeout(() => {
                img.remove();
                this.ind = 0;
                this.limit = 1;
            }, 3000)

            return 0;
        }
    },
    {
        ind:0,
        name:'rerere',
        arr:['r','e','r','e','r','e'],
        limit:1,
        func: async function(){
            let img = document.getElementById('hakaisatsu');
            if(!img) return 1;
            console.log(img.dataset.phase);
            if(img.dataset.phase != '2') return 1;
            location.reload();
        }
    },
    {
        ind:0,
        name:'wawawwa',
        arr:['w','a','w','a','w','w','a'],
        limit:'n',
        func: async function(){
            staF.resetP();
        }
    }
]

const Spaces = [
    { name:'loby', rank:2, back:'#6b5542', sho:1 },
    { name:"mine", rank:1, back:'#6b5542' },
    { name:"shichi", rank:1, back:'#6b5542' },
    { name:"shop", rank:1, back:'#6b5542' },
    { name:"still", rank:1, back:'#6b5542' },
];


let Ores = [
    {
        name:'coal',
        jpnm:"石炭",
        desc:"",
        p:39,
        priceR:[10, 30],
        price:30,
        x:0
    },
    {
        name:'iron',
        jpnm:"鉄",
        desc:"",
        p:32,
        priceR:[30, 100],
        price:100,
        x:0
    },
    {
        name:'ruby',
        jpnm:"ルビー",
        desc:"",
        p:27,
        priceR:[60, 200],
        price:200,
        x:0
    },
    {
        name:'gold',
        jpnm:"金",
        desc:"",
        p:21,
        priceR:[100, 400],
        price:400,
        x:0
    },
    {
        name:'larimar',
        jpnm:"ラリマール",
        desc:"",
        p:12,
        priceR:[300, 700],
        price:700,
        x:0
    }
]