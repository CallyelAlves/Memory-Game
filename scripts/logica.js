var game = {

    block: false,
    cardini: undefined,
    cardfinal: undefined,

    times: [
        'santos',
        'palmeiras',
        'flamengo',
        'corinthians',
        'sp',
        'atletico',
        'vasco',
        'fluminense',
        'gremio',
        'inter'
    ],
    
    setCard: function(id){
       let card = this.cards.filter(card => card.id === id)[0];

       if(card.flip){
           return false;
       }

       if(this.cardini === undefined){
           this.cardini = card;
           this.cardini.flip = true;
           return true;
       }else{
           this.cardfinal = card;
           this.cardfinal.flip = true;
           this.block = true;
           return true;
       }
    },

    checkMath: function(){
        if(!this.cardini || !this.cardfinal){
            return false;
        }
        return this.cardini.icon === this.cardfinal.icon;
    },

    clearCard: function(){
        this.cardini = undefined;
        this.cardfinal = undefined;
        this.block = false;
    },

    unflipcard: function(){
        this.cardini.flip = false;
        this.cardfinal.flip = false;
        this.clearCard();
    },

    checkGameOver: function(){
        return this.cards.filter(card => !card.flip).length === 0;
    },
    
    cards: null,

    createCardsTimes: function(){
        this.cards = [];
    
        for(let time of this.times){
            this.cards.push(this.createParCards(time));
        }
        this.cards = this.cards.flatMap(pair => pair);
        this.embaralharCard();
    },
    
    createParCards: function(time){
        return [{
            id: this.geradorId(time),
            icon: time,
            flip: false 
        },{
            id: this.geradorId(time),
            icon: time,
            flip: false 
        }]
    },
    
    geradorId: function(time){
        return time + parseInt(Math.random() * 100); 
    },

    embaralharCard: function(){
    let inicial = this.cards.length;
    let ramdoInicial = 0;

        while(inicial !== 0){
            ramdoInicial = Math.floor(Math.random() * inicial);
            inicial--;

            [this.cards[ramdoInicial], this.cards[inicial]] = [this.cards[inicial], this.cards[ramdoInicial]]; //invertendo valor das variaveis
        }
    }
}