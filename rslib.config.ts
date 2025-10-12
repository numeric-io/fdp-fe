import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
    define: {
      // Do not load the env variables into the bundle
      'process.env.PUBLIC_AG_GRID_LICENSE': 'process.env.PUBLIC_AG_GRID_LICENSE',
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
  },
  plugins: [pluginReact()],
})
