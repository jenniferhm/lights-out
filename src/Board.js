import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5, //height
    ncols: 5 //width
  }

  constructor(props) {
    super(props);
    this.state = { board: this.createBoard() };
    this.flipCellsAroundMe = this.flipCellsAround.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  randomizer() {
    return Math.random() < 0.5 ? true : false;
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let r = 0; r < this.props.nrows; r++) {
      board.push(Array.from({ length: this.props.ncols }, c => this.randomizer()));
    }

    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("THIS IS COORD", coord);
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y-1, x);
    flipCell(y+1, x);
    flipCell(y, x-1);
    flipCell(y, x+1);

  // win when every cell is turned off
  // TODO: determine is the game has been won
  let hasWon = "You Won!"
  this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */

  render() {
    return (
      <table>
        <tbody>
          {this.state.board.map((r, rIdx, arr) => 
          <tr key={rIdx}>{arr.map((c, cIdx) => {
            return <Cell key={`${rIdx}-${cIdx}`} id={`${rIdx}-${cIdx}`} flipCellsAroundMe={this.flipCellsAroundMe} isLit={this.state.board[rIdx][cIdx]} />
          })}</tr>)}
        </tbody>
      </table>
    )

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
