import * as articleService from '../services/article';
// 这将usersService插入当前作用域，其中包含来自位于../services/users文件中导出的所有接口。

export default {
  namespace: 'article',
  state: {
    articleList: [],
    total: null,
    message: '提示信息',
  },
  reducers: {
    // save(state, { payload: { data: list, total } }) {
    //   console.log(state);
    //   return { ...state, list, total };
    // },
    save(state, { payload: data }) {
      state.articleList = data.data.data.articleList;
      console.log(state.articleList);
      state.total = data.data.data.total;
      console.log(state);
      return { ...state };
    },
  },
  effects: {
    *getDate(_, { call, put }) {
      console.log('获取列表数据');
      // const { data, articleList } = yield call(articleService.test);
      const { data } = yield call(articleService.getDate);
      console.log(data);
      yield put({ type: 'save', payload: { data } });
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
          dispatch({ type: 'getDate' });
        }
      });
    },
  },
};
