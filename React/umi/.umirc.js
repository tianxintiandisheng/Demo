// ref: https://umijs.org/config/
export default {
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },

    '/testDev': {
      target: 'http://dev.admin.carrots.ptteng.com/',
      changeOrigin: true,
      pathRewrite: { '^/testDev': '' },
    },

    '/test': {
      target: 'https://cdn.xgqfrms.xyz/json/badges.json',
      changeOrigin: true,
      pathRewrite: { '^/test': '' },
    },
  },

  treeShaking: true,

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'umi',
        dll: false,
      },
    ],
  ],
};
