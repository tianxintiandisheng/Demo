import request from '../../../utils/request';
// import request from '@/utils/request';

export function getDate() {
  // return request('/dev/a/article/search', {
  //   method: 'GET',
  // });
  return request(`/testDev/a/article/search`);
}

export function test() {
  return request(`/test`);
}
