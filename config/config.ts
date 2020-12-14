import { defineConfig } from 'umi';
import routes from './routes'

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  
  dva: {
    immer: true,
    // hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: 'dist/',
  routes,
});
