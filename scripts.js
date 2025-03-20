const celulas = document.querySelectorAll(".celula")
let checarTurno = true
/*booleana*/

const JOGADOR_X = "X"
const JOGADOR_O = "O"

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")) {
        /*se houver identificação de click em alguma celula*/
        jogar(event.target.id)
    }
})


function checarCelula(id) {
    const celula = document.getElementById(id)
    return celula.textContent !==""
}


function jogar(id) {
    if(checarCelula(id)) {
        return
    }
    
    const celula = document.getElementById(id)
    turno = checarTurno ? JOGADOR_X : JOGADOR_O
    /*checar vez do jogador*/
    celula.textContent = turno
    celula.classList.add(turno)
    /*adiciona classe para verificar de qual jogador é a celula marcada*/
    checarVencedor(turno)
}

function checarVencedor(turno) {
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => {
           return celulas[index].classList.contains(turno)
        })
    })
    /*se alguma/some das combinações do array for verdadeira ele retorna true*/
    
    if (vencedor) {
        encerrarJogo(turno)
    } else if (checarEmpate()) {
        encerrarJogo()
    } else {
        checarTurno = !checarTurno
        /*fazer a variação de true e false para trocar jogador*/
    }
}

function checarEmpate() {
    let x = 0
    let o = 0

    for(index in celulas) {
        if(!isNaN(index)) {
            if(celulas[index].classList.contains(JOGADOR_X)) {
                x++
            }
            if(celulas[index].classList.contains(JOGADOR_O)) {
                o++
            }
        
        }
     
    }
    if (x + o === 9) {
        return true
    }

    return false
}

function encerrarJogo(vencedor = null) {
     /*se função vier com parametro prevalece o vencedor, se vier sem ela é nula*/

    const telaEscura = document.getElementById("telaEscura")
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    let mensagem = null

    telaEscura.style.display = "block"
    telaEscura.appendChild(h2)
    telaEscura.appendChild(h3)
   
    if (vencedor) {
        h2.innerHTML = `O player <span> ${vencedor} </span> venceu`
    } else {
         h2.innerHTML = `Empatou`
    }

    let contador = 3
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`
    }, 1000)

    setTimeout(() => location.reload(), 4000)
}
