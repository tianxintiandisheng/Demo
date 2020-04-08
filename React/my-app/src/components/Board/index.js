import React, { Component } from 'react';
import Square from '../Square';


class Board extends Component {
  renderSquare(i) {
    const { lines } = this.props;
    const [a, b, c] = lines;
    let className = 'square'
    // console.log('判断', lines)
    if (i === a || i === b || i === c) {
      className = 'squareWinner'
    }
    return (
      <Square
        key={i}
        className={className}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    /**
     *@function 渲染3*3的棋盘
     *@return react元素
     * */
    const renderBoard = () => {
      let n = 0;
      let board = [];
      for (let i = 0; i < 3; i++) {
        const boardRow = [];
        for (let j = 0; j < 3; j++, n++) {
          boardRow.push(this.renderSquare(n));
        }
        board.push(<div className="board-row" key={i}>{boardRow}</div>);
      }
      return board;
    }

    return (
      <div>
        {renderBoard()}
      </div>
    );
  }
}
export default Board;