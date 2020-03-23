import * as articleService from '../services/articleService';
// 这将articleService插入当前作用域，其中包含来自位于../services/article文件中导出的所有接口。

export default {
  namespace: 'articleModel', // 命名空间为String,且唯一。models层能有多个model，通过命名空间区分
  state: {
    // state里能定义一些默认值，key:value形式
    articleList: [],
    loadingArticleList: true, // 判断列表是否要处于加载状态（true为加载中）
    total: null,
    message: '提示信息',
  },

  /*
  * reducers是更新state的唯一地方，处理同步操作，把新的state retrun出去
  * 用到state数据的界面就会更新，官方推荐处理逻辑都放在effects中
  */
  reducers: {
    // save(state, { payload: { data: list, total } }) {
    //   console.log(state);
    //   return { ...state, list, total };
    // },

    /**
     * @function 更新列表数据至state
     * @description 如果articleList存在那么取消加载状态（设置加载状态为false）
     * @param  {object} state 旧的state
     * @param  {object} payload 传递过来的参数，此处用到了es6的对象解构赋值；没有可以不写或写_
     * @returns {object} state 新的state
    */
    setArticleData(state, { payload: data }) {
      state.articleList = data.data.data.articleList;
      // console.log(state.articleList);
      state.total = data.data.data.total;
      if (state.articleList) {
        state.loadingArticleList = false; // 如果articleList存在那么取消加载状态（设置加载状态为false）
      }
      // console.log(state);

      return { ...state };
    },
    /**
     * @function 设置articleList的加载状态为加载中（true）
     * */
    setLoadingArticleList(state) {
      state.loadingArticleList = true;
      return { ...state };
    }
  },

  /*
  * effects处理异步的，用于与后台交互获取数据，
  * 推荐数据逻辑处理也应该在此处理，处理完再给reducer
  */
  effects: {
    /**
    * @function 处理article列表数据
    * @description 发送获取article列表数据请求,并将返回数据作为参数传递，更新数据值state
    * @param  {object} action  第一个是传过来的action(没有可以写 _ )，
    * @param  {object} 第二个基本是用其中call, put, select这3个参数(所有的去官网看)，此处接收参数时，顺便都解构出来
    * @param  {function} call  用来与后台交互,请求发送
    * @param  {function} put  用来触发reducers中的方法，与dispacth功能一样
    * @param  {function} select  第一个是传过来的action(没有可以写 _ )，
    * @returns {object} state 新的state
    */
    *handleArticleData(action, { call, put }) {
      console.log('action', action);
      let { params } = action;
      const { data } = yield call(articleService.getDate, params);
      yield put({ type: 'setArticleData', payload: { data } });
    },
    // *fetch({ payload: { page } }, { call, put }) {
    //   const { data, headers } = yield call(articleService.fetch, { page });
    //   yield put({ type: 'save', payload123: { data, total: headers['x-total-count'] } });
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/article') {
          dispatch({ type: 'handleArticleData' });
        }
      });
    },
  },
};
