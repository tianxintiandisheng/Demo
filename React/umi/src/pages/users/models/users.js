import * as usersService from '../services/users';
// 这将usersService插入当前作用域，其中包含来自位于../services/users文件中导出的所有接口。

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    message: '提示信息',
  },
  reducers: {
    save(state, { payload: { data: list, total } }) {
      // console.log(state);
      return { ...state, list, total };
    },
  },
  effects: {
    *fetch({ payload: { page } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      // console.log(data);
      // console.log(headers);
      yield put({ type: 'save', payload: { data, total: headers['x-total-count'] } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
