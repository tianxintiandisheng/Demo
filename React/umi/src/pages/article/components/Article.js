import React from 'react';
import { connect } from 'dva'; // connect用于component组件连接models模块层数据
import { Table, Spin, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'; // 引入中文包
import COLUMNS from '../const'; // 用于生成列表
// import styles from './Article.css';
import * as articleService from '../services/articleService';


class Article extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loadingArticleList: false
  //   };
  // }

  componentDidMount() {
    articleService.create()
  }


  /**
   * @function 处理翻页
   * */
  changePage = (page) => {
    // console.log('page', page)
    const { dispatch } = this.props;
    dispatch({
      type: "articleModel/setLoadingArticleList",
    });
    dispatch({
      type: "articleModel/handleArticleData",
      params: { page },
    });
  }

  /**
   * @function 处理页面尺寸改变
   * @param {number} current 当前页码
   * @param {number} pageSize 改变后的页面尺寸（每页多少条数据）
   * */
  changePageSize = (current, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: "articleModel/setLoadingArticleList",
    });
    dispatch({
      type: "articleModel/handleArticleData",
      params: { size: pageSize },
    });
    // console.log(typeof (current), typeof (pageSize));

  }

  render() {

    console.log("props", this.props);
    const { articleList, total, loadingArticleList } = this.props;
    return (
      < Spin size="large"
        spinning={loadingArticleList}
        tip="加载中..."
        delay={500}
        style={{ maxHeight: 800 }}
      >
        <ConfigProvider locale={zhCN}>
          <Table
            columns={COLUMNS}
            dataSource={articleList}
            // onChange={this.changePage}
            pagination={{
              total,
              onChange: this.changePage,
              onShowSizeChange: this.changePageSize,
              showQuickJumper: true,
              showSizeChanger: true
            }}
            rowKey="id"
          />
        </ConfigProvider>

      </Spin >
    );
  }
}



/**
 * @function 把models层state数据变为组件的props
 * @param  {object} state 这个state是所有model层的state
 * @returns 这里return出去的数据，会变成此组件的props
 */
function mapStateToProps(state) {
  /*
  * 这个state是所有model层的state，这里只用到其中一个。
  * 所以state.articleModel把命名空间为testPage这个model层的state数据取出来
  */
  const { articleList, total, loadingArticleList } = state.articleModel; // { articleList, total }为es6语法解构赋值
  /*
  * 这里return出去的数据，会变成此组件的props
  * 在组件可以通过props.total取到。props变化了，会重新触发render方法，界面也就更新了
  */
  return {
    articleList,
    total,
    loadingArticleList,
    // page,
  };
}


/**
 * @function 控制models层dispatch
 * @description  用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props
 * @param {function} dispatch 
 */
// function mapDispatchToProps(dispatch) {
//   console.log(dispatch)
// }


/*
* connect方法用来连接models层的state数据，参数常用的有2个，是第一个mapStateToProps，第二个mapDispatchToProps
* mapStateToProps按字面意思：把models层state数据变为组件的props
* mapDispatchToProps：用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props。(平常用几乎不写该方法)
* @example  export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
*/
export default connect(mapStateToProps)(Article);
