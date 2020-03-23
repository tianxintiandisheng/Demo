import request from '../../../utils/request';
// import request from '@/utils/request';


/**
 * @function GET请求接口url的参数拼接
 * @param {object} params 需要传递的参数
 * @returns {string} 拼接后的字符串
 * */
function changeParams(params) {
  let result = '';
  let item;
  for (item in params) {
    if (params[item] && String(params[item])) {
      result += `&${item}=${params[item]}`;
    }
  }
  if (result) {
    result = '?' + result.slice(1);
  }
  return result;
}

/**
 * @function 根据条件获取文章列表
 * @param {object} params
 * */
export function getDate(params) {
  // console.log('params', params)
  const result = changeParams(params)
  const url = `/api/a/article/search${result}`
  // console.log('url', url)
  return request(url);
}

// export function create() {
//   const values = {
//     id: 14376,
//     status: 2
//   }
//   console.log(JSON.stringify(values))
//   return request('/api/a/u/article/status', {
//     method: 'PUT',
//     body: JSON.stringify(values),
//   });
// }

export function create() {
  const values = {
    id: 14376,
    status: 2
  }
  // console.log('params', params)
  const result = changeParams(values)
  const url = `/api/a/u/article/status${result}`
  // console.log('url', url)
  return request(url, { method: 'PUT', });
}