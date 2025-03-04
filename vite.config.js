import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import solid from 'vite-plugin-solid';

const buildServerDist = {
  plugins: [solid()],
  build: {
    outDir: 'dist_server'
  }
};
const buildOfflineDist = {
  plugins: [solid(), viteSingleFile()],
  build: {
    outDir: 'dist_offline'
  }
};
const buildGHPagesDist = {
  base: '/<YOUR_REPO>/',
  plugins: [solid()],
  build: {
    outDir: 'dist_gh_pages'
  }
}

export default defineConfig(({ mode }) => {
  switch (mode) {
    case 'server':
    case 'development':
    case 'test':
      return buildServerDist;
    case 'offline':
      return buildOfflineDist;
    case 'gh-pages':
      return buildGHPagesDist;
    default:
      throw new Error('unknown build mode ' + mode);
  }
});
