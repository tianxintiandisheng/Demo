import React, { Component } from 'react';
import Board from '../Board';
import './index.css';

/**
 * @function 游戏结果判断
 * @param {array} squares 存储棋子的数组
 * @returns {object} 如果有胜利者，返回包含对应胜利者字符串和三连棋子数组的对象
 * @returns {null} 如果棋子已经占满棋盘但是没有胜利者，返回null
 * @returns {null} 如果棋子没有占满棋盘且没有胜利者，返回null
 * */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // alert('游戏结束胜利者为' + squares[a] + '!')
      const winnerObject = {
        winner: squares[a],
        lines: lines[i],
      }
      return winnerObject;
    }
  }
  if (squares.indexOf(null) === -1) {
    alert('Game Over ，无人生还');
    return null;
  }

  return null;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      descendingOrder: false, // 判断是否需要降序显示，默认为false升序显示
      lines: [], // 存储三连棋子的索引的数组
    };
  }

  /**
   * @function 读取游戏记录
   * */
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  /**
   * @function 方格对应的点击事件
   * @description  游戏未结束，存档;游戏决出胜利者，三连高亮显示；游戏结束，弹出提示；
   * @param {number} i 对应方格在数组中的索引index
   * 
   * */

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];

    const squares = current.squares.slice();
    // 如果游戏结束或者该位置上已经有棋子跳出函数
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; // 在数组对应位置填充棋子
    // 如果游戏有胜利者，更新三联棋子索引数组
    if (calculateWinner(squares)) {
      this.setState({
        lines: calculateWinner(squares).lines,
      });
    }
    this.setState({
      history: history.concat([{
        squares: squares,
        squareIndex: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * @function 修改用于判断历史记录正序/逆序显示的参数descendingOrder
   * */
  reverseHistory = () => {
    const { descendingOrder } = this.state;
    this.setState({
      descendingOrder: !descendingOrder
    })
  }

  /**
   * @function 根据棋子索引分配坐标
   * @returns {array} 返回包含棋子索引的数组
   * */
  produceCoordinate = () => {
    const size = 3; // 指定棋盘大小，现棋盘大小为3*3
    const arrayLength = size * size;
    let coordinateArray = []; // 创建初始数组
    let yInit = size; // 初始化y坐标的值
    for (let i = 0; i < arrayLength; i++) {
      let indexNumber = i + 1;
      if (indexNumber % size > 0) {
        coordinateArray.push({ x: indexNumber % size, y: yInit })
      } else {
        coordinateArray.push({ x: size, y: yInit })
        yInit = yInit - 1;
      }
    }
    return coordinateArray;
  }


  /**
    * @function 根据棋子索引分配坐标-另一种方法
    * */
  produceCoordinate_another = () => {
    let coordinateArray = [];
    for (let j = 3; j > 0; j--) {
      for (let i = 1; i < 4; i++) {
        coordinateArray.push({ x: i, y: j })
      }
    };
    return coordinateArray;
  }

  render() {
    let { lines } = this.state;
    const { history, stepNumber, descendingOrder, } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares) ? calculateWinner(current.squares).winner : null;
    const coordinateArray = this.produceCoordinate();
    const moves = history.map((item, index) => {
      let coordinate = "";

      if (item.squareIndex || item.squareIndex === 0) {
        const moveIndex = item.squareIndex;
        coordinate = `(${coordinateArray[moveIndex].x},${coordinateArray[moveIndex].y})`;
      }


      const desc = index ?
        `移动至第${index}步,棋子坐标为${coordinate}` :
        '重新开始游戏';
      return (
        <li key={index}>
          {/* 在历史记录列表中加粗显示当前选择的项目,动态加载类名 */}
          <button
            className={index === stepNumber ? 'currentButton' : 'button'}
            onClick={() => this.jumpTo(index)}
          >
            {desc}
          </button>
        </li>
      );
    });
    // 根据descendingOrder参数选择列表的升序/降序排序
    if (descendingOrder) {
      moves.reverse();
    }
    // 如果没有胜利者，清除保存的三连棋子索引数组
    if (!calculateWinner(current.squares)) {
      lines = []
    }
    let status;
    if (winner) {
      status = '胜利者: ' + winner;
    } else {
      status = '下一位玩家: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            lines={lines}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/* 添加一个可以升序或降序显示历史记录的按钮 */}
          <button
            className='button'
            onClick={() => this.reverseHistory()}
          >
            {descendingOrder ? '升序排列' : '降序排列'}
          </button>
          <button
            className='button'
            onClick={() => this.produceCoordinate()}
          >
            根据棋子索引分配坐标
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;