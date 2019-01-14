import { createStore, applyMiddleware } from "redux";
import { suits, values } from "../utils";
import * as poker from "poker-hands";
import logger  from "redux-logger";

/**
 * Removes shuffled card from the stack
 * @param {Object } cardDeck 
 * @param { Object } playerDeck 
 */
const reduceDeck = (cardDeck, playerDeck) => {
  const deck = Object.keys(cardDeck)
    .filter(key => !playerDeck.hasOwnProperty(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: cardDeck[key]
      };
    }, {});
    return deck;
};

/**
 * Creates cards deck from the card stack for the player
 * @param {Object } cardDeck  
 */
const playerDeck = (cardDeck) => {
  let deck = {};
  let combo = '';
  Object.keys(cardDeck).forEach((key, index) => {
    if (index < 5 ) {
        deck[key] = cardDeck[key];
        combo  = (index === 4 ) ? combo += key : combo += key + ' ';
    }
  });
  return {
    deck,
    combo   
  };
};

/**
 * Sets up the player
 * @param {Object } cardDeck  
 */
const newPlayer = (players, cardDeck) => {
    const { deck, combo } = playerDeck(cardDeck);
    const player = {
        name: "Player Name " + players.length,
        deck,
        combo
    };
  return player;
};

/**
 * Adds a player to the current stack
 * @param { Object } state  
 */
const addPlayer = (state) => {
    const player = newPlayer(state.players, state.deck);
    const cardDeck = reduceDeck(state.deck, player.deck);
    const players = [...state.players, player]
    return {cardDeck, players};
}
/**
 * Removes the player from the stack
 * @param {Object } cardDeck  
 */
const deletePlayer = (players, name) => {
  const playrs = players.filter(player => player.name !== name );
  return playrs;
};

/**
 * Annouces the winner
 * @param { Array } players  
 */
let findWinner = (players) => {
    const combos = players.map(player=> player.combo);
    alert("Winner is: " + players[poker.judgeWinner(combos)].name);
};

/**
 * Initialisation of variables
 */
const initial = () => {
  let players = [];
  let cardDeck = initialDeck();
  for (let i = 0; i < 2; i++) {
    const { deck, combo } = playerDeck(cardDeck);
    let player = {
      name: "Player Name " + i + 1,
      deck,
      combo
    };

    cardDeck = reduceDeck(cardDeck, player.deck);
    players.push(player);
  }
  return { cardDeck, players };
};

/**
 * Setups up the card deck for the 1st time
 */
const initialDeck = () => {
  let deck = {};
  suits.forEach(suit => {
    values.forEach(value => {
      deck[suit + value] = { suit, value };
    });
  });
  return deck;
};

/**
 * Sets up the initial global state
 */
const initialState = () => {
    const { cardDeck, players } = initial();
    return { 
        deck: cardDeck,
        players
    };
}

/**
 * the reducers to call the actions to be executed
 * @param {Objet} state react state
 * @param { Object | String } action
 */
const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case "ADD_PLAYER":
      let added = addPlayer(state);
      state = {
          ...state,
          players: added.players,
          deck: added.cardDeck
      }
      break;
    case "DELETE_PLAYER":
      const players = deletePlayer(state.players, action.payload);
      state = {
          ...state,
          players
      }
      break;
    case "FIND_WINNER":
      findWinner(action.payload);
      break;
    default:
    break;
  }
  return state;
};

export const store = createStore(reducer, applyMiddleware(logger));

