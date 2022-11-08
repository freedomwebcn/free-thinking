module.exports = {
  // 添加postcss配置
  plugins: [
    require("postcss-preset-env"),
    require("postcss-pxtorem")({
      rootValue: 37.5,
      propList: ["*"],
      exclude: /node_modules/i,
    }),
  ],
};
