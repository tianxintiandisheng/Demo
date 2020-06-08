import { Divider } from 'antd';
import styles from './const.css';

const TYPE_ARRAY = [
  { codeNumber: 0, text: '首页banner' },
  { codeNumber: 1, text: '找职位banner' },
  { codeNumber: 2, text: '找精英banner' },
  { codeNumber: 3, text: '行业大图' },
]

const INDUSTRY_ARRAY = [
  { codeNumber: 0, text: '移动互联网' },
  { codeNumber: 1, text: '移动互联网' },
  { codeNumber: 2, text: '企业服务' },
  { codeNumber: 3, text: 'O2O ' },
  { codeNumber: 4, text: '教育' },
  { codeNumber: 5, text: '教育' },
  { codeNumber: 6, text: '游戏' },
]

const STATUS_ARRAY = [
  { codeNumber: 1, text: '草稿' },
  { codeNumber: 2, text: '上线' },
]

/**
 * @function 将状态码转化为对应文字显示
 * @param {array} array 存储状态码与对应文字的数组
 * @param {string} numberText 状态码
 * @returns {string} text 状态码对应的字符串
 * @author 天心天地生 2020-1-17
 * */
const transformNumberText = (array, numberText) => {
  const codeNumber = Number(numberText); // 字符串转换为数值
  let text = "";
  array.forEach((element) => {
    if (element.codeNumber === codeNumber) {
      text = element.text;
      return;
    }
  })
  return text;
}


/**
* @function 时间戳转换为字符串的日期形式
* @param   timestamp 时间戳
* @returns {string} 字符串的日期形式
*/
const transformTimestamp = (timestamp) => {
  let stringTimestamp = new Date(timestamp);  //括号内填入要转换的时间戳,如果是13位（精确到毫秒的不需要*1000）
  stringTimestamp = stringTimestamp.toLocaleString();
  return stringTimestamp;
}
const COLUMNS = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    /**
    * @function 生成复杂数据的渲染函数
    * @description antd中用于生成表格项的渲染函数
    * @param   text 当前行的值
    * @param   record 当前行数据
    * @param   index 行索引
    * @return  react元素，作为表格的项
    */
    render(text, record, index) {
      return index + 1;
    },

  },
  {
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    align: 'center',
    render(text, record, index) {
      const imgElement = (
        <img alt="图片" style={{ maxWidth: 120 }} src={text}>
        </img>
      )
      return imgElement;
    },

  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    render(text, record, index) {
      const titleElement = (
        <span className={styles.title}>{text}</span>
      )
      return titleElement;
    }
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render(text, record, index) {
      const typeElement = (
        <span>{transformNumberText(TYPE_ARRAY, text)}</span>
      )
      return typeElement;
    },
  },
  {
    title: '创建者',
    dataIndex: 'author',
    key: 'author',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
    align: 'center',
    render(text, record, index) {
      return transformTimestamp(text);
    },
  },
  {
    title: '修改时间',
    dataIndex: 'createBy',
    key: 'createBy',
    align: 'center',
    render(text, record, index) {
      return transformTimestamp(text);
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render(text, record, index) {
      const statusElement = (
        <span>{transformNumberText(STATUS_ARRAY, text)}</span>
      )
      return statusElement;
    },
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: (text, record) => (
      <span>
        <a onClick={() => console.log('record.id', record.id)}>下线</a>
        <Divider type="vertical" />
        <a>编辑</a>
        <Divider type="vertical" />
        <a>删除</a>
      </span>
    ),
  },
];

export default COLUMNS;