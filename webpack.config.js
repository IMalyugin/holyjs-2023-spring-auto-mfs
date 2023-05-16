const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config } = require('@beemfs/af-shared');

const appConfig = config(path.resolve(process.cwd(), './packages/app'), { port: 8080 });
const vehicleConfig = config(path.resolve(process.cwd(), './packages/vehicle'), { port: 8081 });
const chassisConfig = config(path.resolve(process.cwd(), './packages/chassis'), { port: 8082 });
const landscapeConfig = config(path.resolve(process.cwd(), './packages/landscape'), { port: 8083 });

module.exports = [
  {
    ...appConfig,
    entry: './src/',
    plugins: [
      ...appConfig.plugins,
      new HtmlWebpackPlugin({
        template: './server/views/index.html',
      }),
    ],
  },
  vehicleConfig,
  chassisConfig,
  landscapeConfig,
];
