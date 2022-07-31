import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';

const getPath = _path => path.resolve(__dirname, _path);

import packageJSON from './package.json';

const globals = {
  axios: 'Axios',
  rrweb: 'Rrweb',
  'error-stack-parser': 'ErrorStackParser'
};
const external = Object.keys(globals);
const esExtelrnals = [...external, ...Object.keys(packageJSON.dependencies)];

// 基础配置
const commonConf = {
  input: getPath('./src/index.ts'),
  plugins: [
    nodeResolve(),
    json(),
    esbuild({
      tsconfig: path.resolve(path.resolve(__dirname), 'tsconfig.json'),
      exclude: []
    }),
    commonjs({
      exclude: 'node_modules'
    })
  ]
};

// 需要导出的模块类型
const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'umd',
    name: packageJSON.name,
    globals
  },
  {
    file: packageJSON.module, // es 模块
    format: 'es',
    name: packageJSON.name,
    globals
  }
];

const buildConf = options => {
  if (options.format === 'umd') {
    commonConf.external = external;
  }

  commonConf.external = esExtelrnals;

  return Object.assign({}, commonConf, options);
};

console.log(
  outputMap.map(output => buildConf({ output: { name: packageJSON.name, ...output } })),
  'outputMap.map(output => buildConf({ output: { name: packageJSON.name, ...output } }))'
);

export default outputMap.map(output => buildConf({ output: { name: packageJSON.name, ...output } }));
