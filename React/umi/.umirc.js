// ref: https://umijs.org/config/
export default {
  proxy: {
    '/api': {
      target: 'http://dev.admin.carrots.ptteng.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
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
