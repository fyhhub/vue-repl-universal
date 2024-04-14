import { defineConfig } from '@viwo/npm-flow';
export default defineConfig({
  esm: {
    transformer: 'swc'
  },
  cjs: {
    transformer: 'swc'
  },
  vue: {
    version: 3
  }
})