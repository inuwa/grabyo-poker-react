import React from "react";
import { Card, PlayerHand, Button } from "../Styles/Styled";

const Players = ({ players, removePlayer }) => (
    <>
        {players.map((player, index) => (
            <article key={index}>
                <p>{player.name}</p>
                <Button>
                <span role="img" alt="pencil" aria-label="pencil">
                    ✏️
                </span>
                Edit
                </Button>
                <Button onClick={()=> removePlayer(player.name)}>
                <span role="img" alt="flame" aria-label="flame">
                    🔥
                </span>
                Remove
                </Button>
                <PlayerHand>
                    {Object.keys(player.deck).map((key) => (
                        <Card key={player.deck[key].suit+player.deck[key].value} suit={player.deck[key].suit}
                        value={player.deck[key].value} selected={ index+1 === 0}>
                        {player.deck[key].value}
                        </Card>
                    ))}
                </PlayerHand>
            </article>
		))}
    </>
);
    
export default Players;
