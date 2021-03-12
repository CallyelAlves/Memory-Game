const FRONT = "front";
const BACK = "back";
const ICON = "icon";
const CARD = "card";

start();

function start(){
    game.createCardsTimes();
    iniciarGamer(game.cards);
}

function iniciarGamer(cards){
    let game = document.getElementById("game");
    game.innerHTML = '';

    for(let card of cards){
        let cardElemento = document.createElement('div');
        cardElemento.id = card.id;
        cardElemento.classList.add(CARD);
        cardElemento.dataset.icon = card.icon;

        cardContent(card, cardElemento);

        cardElemento.addEventListener('click', flipcard);
        game.appendChild(cardElemento);
    }
}

function cardContent(card, cardElemento){
    cardFace(FRONT, card, cardElemento);
    cardFace(BACK, card, cardElemento);
}

function cardFace(face, card, elemento){
    let cardElementoFace = document.createElement('div');
    cardElementoFace.classList.add(face);
    if(face === FRONT){
        let iconElemento = document.createElement('img');
        iconElemento.classList.add(ICON);
        iconElemento.src = "./imagens/" + card.icon + ".png";
        cardElementoFace.appendChild(iconElemento);
    }else{
        cardElementoFace.innerHTML = '<img src="./imagens/brasileirao.png" alt="" width="100%">';
    }

    elemento.appendChild(cardElementoFace);
}


function flipcard(){
    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.cardfinal){
            if(game.checkMath()){
                game.clearCard();
                if(game.checkGameOver()){
                    let gameOver = document.getElementById("gameOver");
                    gameOver.style.display = 'flex';
                }
            }else{
                setTimeout(() => {
                let cardViewini = document.getElementById(game.cardini.id);
                let cardViewfinal = document.getElementById(game.cardfinal.id);

                cardViewini.classList.remove('flip');
                cardViewfinal.classList.remove('flip');
                game.unflipcard();
                }, 1000)
            }
    }   }
}

function restart(){
    start();
    let gameOver = document.getElementById("gameOver");
    gameOver.style.display = 'none';
}