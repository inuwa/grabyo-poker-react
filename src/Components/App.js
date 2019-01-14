import React, { Component } from 'react';

import { suits, values } from "../utils";

import Layout from "./Layout";
import Deck from "./Deck";
import { Button, Footer } from "../Styles/Styled";
import Players from "./Players";
import { connect } from 'react-redux';
class App extends Component {
	render() {
		return (
				<Layout>
					<section>
						<h1>
						Cards deck
						</h1>
						<Deck suits={suits} values={values} />
					</section>
					<section>
						<header>
							<h1>Players</h1>
						</header>
						<section>
							<Players players={this.props.game.players} removePlayer={this.props.deletePlayer}/>
						</section>
						<Footer>
								<Button onClick={() => this.props.addPlayer(this.props.game)}>
									<span role="img" alt="woman raising hand" aria-label="woman raising hand">🙋‍♀️</span>
									Add new player
								</Button>
								<Button onClick={() => this.props.findWinner(this.props.game.players)}>
									<span role="img" alt="trophy" aria-label="trophy">🏆</span>
									Find the winner
								</Button>
						</Footer>
					</section>

				</Layout>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		game: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		findWinner: (players) => {
			dispatch({
				type: 'FIND_WINNER',
				payload: players
			})
		},
		addPlayer: (game) => {
			dispatch({
				type: 'ADD_PLAYER',
				payload: game
			})
		},
		deletePlayer: (name) => {
			dispatch({
				type: 'DELETE_PLAYER',
				payload: name
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
