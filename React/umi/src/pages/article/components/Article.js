import { connect } from 'dva'; // connect用于component组件连接models模块层数据
import { Table, Divider } from 'antd';

function Article(props) {
  const columns = [
    {
      title: '序号',

      render(text, record, index) {
        //TODO
        return index + 1;
      },
      key: 'id',
    },
    {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '创建者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '修改时间',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>下线</a>
          <Divider type="vertical" />
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </span>
      ),
    },
  ];
  console.log(props);
  const { articleList } = props;
  return <Table columns={columns} dataSource={articleList} rowKey="id" />;
}

function mapStateToProps(state) {
  // 这个state是所有model层的state，这里只用到其中一个，所以state.testPage把命名空间为testPage这个model层的state数据取出来
  // es6语法解构赋值
  const { articleList, total } = state.article;
  // 这里return出去的数据，会变成此组件的props，在组件可以通过props.num取到。props变化了，会重新触发render方法，界面也就更新了。
  return {
    articleList,
    total,
    // page,
  };
}

// function mapDispatchToProps (dispatch) {
// 代码
// }

// connect方法用来连接models层的state数据，参数常用的有2个，是第一个mapStateToProps，第二个mapDispatchToProps
// mapStateToProps按字面意思：把models层state数据变为组件的props
// mapDispatchToProps：用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props。(我平常用几乎不写该方法)
// export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
export default connect(mapStateToProps)(Article);
