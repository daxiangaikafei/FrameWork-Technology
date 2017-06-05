var rollup  = require('rollup')
var fs      = require('fs')
var path    = require('path')
// var vue          = require( 'rollup-plugin-vue2')
// var buble        = require( 'rollup-plugin-buble')
// var resolve      = require( 'rollup-plugin-node-resolve')
// var commonjs     = require( 'rollup-plugin-commonjs')
// var uglify       = require( 'rollup-plugin-uglify')
// var livereload   = require( 'rollup-plugin-livereload')
// var serve        = require( 'rollup-plugin-serve')
// var alias        = require( 'rollup-plugin-strict-alias')
// var hash         = require( 'rollup-plugin-hash')
import config from './build/base.config'

async function start(){

    await new Promise((resolve) => {
        rollup
        .rollup(require('./rollup.config').default)
        .then(function (bundle) {

           
        const result = bundle.generate({
            format: 'iife',
            sourceMap: true,
            sourceMapFile: './dist/build.js'
        });

        result.map.file; // 'bundle.js'
        result.map.sources; // ['../src/main.js', '../src/foo.js', ...]


        fs.writeFileSync( './dist/build.js', result.code +
        '\n//# sourceMappingURL=bundle.js.map' );
        fs.writeFileSync( './dist/build.js.map', result.map.toString() );

        // bundle.write({
        //     // useStrict: false,
        //     // banner:'var ENVIRONMENT = "production";',
        //     // intro: 'var ENVIRONMENT = "production";',
        //     // footer:'var ENVIRONMENT = "production";',
        //     // outro:'var ENVIRONMENT = "production";',
        //     format: "iife",
        //     dest: './dist/build.js',
        //     globals: {
        //         'vue': 'Vue',
        //         'vue-router': 'VueRouter'
        //     },
        //     external: ['vue', 'vue-router']
        // });

        // return result.code
    })
//     .then(function(bundle){
// // config.compiler_vendor
//     })

    });
}

export default start
   