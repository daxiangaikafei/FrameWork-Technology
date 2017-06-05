"use strict";

import alias from 'rollup-plugin-strict-alias'
import typescript from 'rollup-plugin-typescript'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
// import nodeGlobals from 'rollup-plugin-node-globals'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-js'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace'
// import path from 'path'
// import builtins from 'rollup-plugin-node-builtins'
// import includePaths from 'rollup-plugin-includepaths'

// let includePathOptions = {
//   include: {
//     'vue': 'node_modules/vue/dist/vue.common.js',
//     'vue-router': 'node_modules/vue-router/dist/vue-router.js'
//   },
//   external: ['vue', 'vue-router']
// };

const plugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    typescript({
        typescript: require('typescript')
    }),
    alias({
        'vue': 'node_modules/vue/dist/vue.common.js',
        'vue-router': 'node_modules/vue-router/dist/vue-router.common.js',
        'vuets': 'node_modules/vuets/lib/index.js',
    }),
    vue({
        css : './dist/build.css'
    }),
    // // includePaths(includePathOptions),
    buble({
        // objectAssign: 'Object.assign',
        // target: { node: 4 }
    }),
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    commonjs({
        namedExports: { 
            '/node_modules/vue/dist/vue.common.js': ['version','extend'] ,
        }, 
    }),
    // commonjs({
        // extensions: [ '.js', '.vue', '.ts' ],
    //   // non-CommonJS modules will be ignored, but you can also
    //   // specifically include/exclude files
    //   include: 'node_modules/**',  // Default: undefined
    //   exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined

    //   // search for files other than .js files (must already
    //   // be transpiled by a previous plugin!)
    //   extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

    //   // if true then uses of `global` won't be dealt with by this plugin
    //   ignoreGlobal: false,  // Default: false

    //   // if false then skip sourceMap generation for CommonJS modules
    //   sourceMap: false,  // Default: true

    //   // explicitly specify unresolvable named exports
    //   // (see below for more details)
    //   namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined

    //   // sometimes you have to leave require statements
    //   // unconverted. Pass an array containing the IDs
    //   // or a `id => boolean` function. Only use this
    //   // option if you know what you're doing!
    //   ignore: [ 'conditional-runtime-dependency' ]
    // })
]

const config = {
    entry     : './src/rollup/main.ts',
    plugins   : plugins,
    // moduleName: "library.js", 
    // sourceMap: true,
    // targets: [
	// 	{ dest: './dist/rollup-watch.cjs.js', format: 'cjs' },
	// 	{ dest: './dist/rollup-watch.iife.js', format: 'es' }
	// ],
    dest: './dist/build.js',
    format: 'iife',
    // globals: {
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter'
    // },
    // external: ['vue', 'vue-router']
    
    // paths:{
    //     appdemo:'./src/rollup/apps.js'
    // }
    // context: 'window',?
    // moduleContext:'node_modules',?


}


if (process.env.NODE_ENV === `production`) {
    config.sourceMap = false
    config.plugins.push(uglify({}, minify))
}

if (process.env.NODE_ENV === `development`) {
    config.plugins.push(livereload())
    config.plugins.push(serve({
        contentBase: '.',
        port: 8080,
        open: true
    }))
}

export default config
