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
  // Exclude all AG Grid CSS files from being bundled
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /node_modules\/ag-grid.*\.css$/,
            type: 'asset/resource',
            generator: {
              filename: 'static/css/[name].[hash][ext]',
            },
          },
        ],
      },
      externals: [
        // Exclude all AG Grid CSS files as externals using regex
        /^ag-grid.*\.css$/,
        // Also exclude specific AG Grid CSS imports
        'ag-grid-community/styles/ag-grid.css',
        'ag-grid-community/styles/ag-theme-alpine.css',
        'ag-grid-community/styles/ag-theme-balham.css',
        'ag-grid-community/styles/ag-theme-material.css',
        'ag-grid-community/styles/ag-theme-quartz.css',
        'ag-grid-enterprise/styles/ag-grid.css',
        'ag-grid-enterprise/styles/ag-theme-alpine.css',
        'ag-grid-enterprise/styles/ag-theme-balham.css',
        'ag-grid-enterprise/styles/ag-theme-material.css',
        'ag-grid-enterprise/styles/ag-theme-quartz.css',
      ],
      // Additional configuration to prevent CSS bundling
      optimization: {
        splitChunks: {
          cacheGroups: {
            agGridStyles: {
              test: /[\\/]node_modules[\\/]ag-grid.*\.css$/,
              name: 'ag-grid-styles',
              chunks: 'all',
              enforce: true,
            },
          },
        },
      },
    },
  },
})
