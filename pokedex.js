
const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    let poketype= ["nada","nada"];
    let pokestat = [0,0,0,0,0,0];
    let pokem = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokeDuda.gif")
            pokeIN("???","???")
            pokeHe(0);
            pokeWe(0);
            pokeTy(poketype);
            pokeSt(pokestat);
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
            let pokeI = data.id;
            let pokeN = data.name;
            pokeIN(pokeI,pokeN)
            console.log(pokeI);
            console.log(pokeN);
            let pokeh = data.height;
            let pokew = data.weight;
            pokeHe(pokeh);
            pokeWe(pokew);
            console.log(pokeh);
            console.log(pokew);
            console.log(poketype);
            for(var i=0;i<data.types.length;i++){
                poketype[i]=data.types[i].type.name;
            }
            console.log(poketype);
            pokeTy(poketype);
            for(var i=0;i<data.stats.length;i++){
                pokestat[i]=data.stats[i].base_stat;
            }
            console.log(pokestat);
            pokeSt(pokestat);
            for(var i=0;i<data.moves.length;i++){
                pokem[i]=data.moves[i].move.name;
            }
            console.log(pokem);
            pokeMov(pokem);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeIN = (n,i) => {
    const pokeinom = document.getElementById("pokeIdNom");
    n= (n).toString().padStart(3,'0');
    pokeinom.innerHTML = "#"+n+"-"+i;
}

const pokeWe = (val) => {
    const pokew = document.getElementById("pokePes");
    pokew.innerHTML = "Weight: "+val/10+" Kg";
}
const pokeHe = (val) => {
    const pokeh = document.getElementById("pokeTam");
    pokeh.innerHTML = "Height: "+val/10+" m";
}

const pokeTy = (val) => {
    const poket = document.getElementById("pokeTipo");
    poket.innerHTML = "Type: ";
    const type1 = document.getElementById("tipo1");
    type1.src = "./ico/"+val[0]+".png";
    const type2 = document.getElementById("tipo2");
    type2.src = "./ico/"+val[1]+".png";
}
let myChart;
function pokeSt (val){
    

    const ctx = document.getElementById('graf').getContext('2d');
    if (myChart) {
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        
        data: {
            labels: ["HP","Att","Def","S.Att","S.Def","Spd"],
            datasets: [{
                label: "stats",
                data: val,
                backgroundColor: 
                'rgb(255, 221,0)'
                ,
                
            borderWidth: 1
        }]
    },
    options: {
        
        scales: {
            y:{
                ticks: {      color: "rgb(255, 221,0)"    },
                    beginAtZero: true,
                    grid:{
                        drawOnChartArea: false,
                        drawBorder: false,
                        display: false
                    }
                },
                x:{
                    ticks: {      color: "rgb(255, 221,0)"    },
                    grid:{
                        drawOnChartArea: false,
                        drawBorder: false,
                        display: false
                    }
                }
        },
        plugins: {
            legend: {
                display: false
                }}
    }
    
});


}
const pokeMov = (val) => {
    const poket = document.getElementById("pokeMovit");
    const titulo = document.getElementById("Titmov");
    poket.innerHTML = "";
    titulo.innerHTML = "Moves: ";
    for(var i=0;i<val.length;i++){
        poket.innerHTML = poket.innerHTML+"move "+i+": "+val[i]+"<br>";
    }
    
}

function mostrar_mov() {
    var vis = document.getElementById("pokemovi");
    var tx = document.getElementById("mos_ocu");
    
    if (vis.style.display === "block") {
        vis.style.display = "none";
        tx.innerHTML = "Movimientos";
    } else {
        vis.style.display = "block";
        tx.innerHTML = "Pokemon"
    }
}