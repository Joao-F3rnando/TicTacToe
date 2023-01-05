const divHeader = document.querySelector('.header-content')
const main = document.querySelector('.main-content')
let player1 = document.querySelector('#player1')
let player2 = document.querySelector('#player2')
player1.focus()
const restartButton = document.querySelector('.restart-button')

const vitoriasPossiveis = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

let player1Positions = []
let player2Positions = []

let playerTurn
let venceu = false
let winnerPositions = []
let counter = 0
let turns = 0

function start(){
    if(player1.value === '' || player2.value === '')
    {
        alert('Você deve inserir um nome para os dois jogadores')
    }
    else{
        divHeader.classList.add('block')
        main.classList.remove('block')
        player1.value = `${player1.value} (X)`
        player2.value = `${player2.value} (O)`
        playerTurn = player1.value
        document.querySelector('#display-text').innerText = `Turno de ${playerTurn}`
    }
}

document.querySelectorAll('.buttonPosition').forEach(function(buttonPressed){
    buttonPressed.addEventListener('click', function(){
        if(playerTurn === player1.value){
            buttonPressed.innerText = 'X'
            buttonPressed.disabled = true
            player1Positions.push(parseInt(buttonPressed.dataset.value))
            turns++
            console.log(`Jogadas do X: ${player1Positions}`)
            let verificador = checkWinner(player1Positions, player1.value)
            if(verificador === true)
            {
                console.log(`${playerTurn} venceu o jogo`)
            }
            else{
                playerTurn = changingName(playerTurn)
                document.querySelector('#display-text').innerText = `Turno de ${playerTurn}`
                draw(turns)
            } 
        }
        else{
            buttonPressed.innerText = 'O'
            buttonPressed.disabled = true
            player2Positions.push(parseInt(buttonPressed.dataset.value))
            console.log(`Jogadas do O: ${player2Positions}`)
            turns++
            let verificador = checkWinner(player2Positions, player2.value)
            if(verificador === true)
            {
                console.log(`${playerTurn} venceu o jogo`)
            }
            else
            {
                playerTurn = changingName(playerTurn)
                document.querySelector('#display-text').innerText = `Turno de ${playerTurn}`
                draw(turns)
            }
        }
    })
})

function changingName(namePlayerTurn){
    if(namePlayerTurn === player1.value)
    {
        return player2.value
    }
    else{
        return player1.value
    }
}

function checkWinner(positions, player){
    if(turns >= 5)
    {
        for(let i = 0; i < vitoriasPossiveis.length; i++)
        {
            for(let j = 0; j < vitoriasPossiveis[i].length; j++)
            {
                if(positions.includes(vitoriasPossiveis[i][j]) && venceu === false)
                    {
                        winnerPositions.push(vitoriasPossiveis[i][j])
                        counter++
                    }
            }
            if(counter === 3)
            {
                venceu = true
            }
            console.log(winnerPositions)
            if(venceu === false)
            {
                winnerPositions = []
                counter = 0
            }
        }
        if(winnerPositions.length === 3 && venceu === true)
        {
            console.log(winnerPositions)
            document.querySelector('#display-text').innerText = `Vencedor: ${player}`
            document.querySelectorAll('.buttonPosition').forEach(function(button)
            {
                button.disabled = true
            })
            for(let i = 0; i < winnerPositions.length; i++)
            {
                document.querySelector(`[data-value="${winnerPositions[i].toString()}"]`).classList.add('buttonWinner')
            }
            restartButton.classList.remove('block')
            return true
        }
    }
}

function draw(turns)
{
    if(turns === 9)
    {
        document.querySelector('#display-text').innerText = 'Deu Velha!!!'
        restartButton.classList.remove('block')
    }
}

function restart(){
    window.location.reload(true) //Remover, caso seja necessário e colocar a solução anterior
}