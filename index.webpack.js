// function demo(options){
//     return new Promise(function(resolve,reject){
//             resolve(options);
//     })
// }
import webpack from 'webpack';
import webpackConfig from './webpack.config';

// const [clientConfig, serverConfig] = webpackConfig;

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

async function start(){

await new Promise((resolve) => {
    // Save the server-side bundle files to the file system after compilation
    // https://github.com/webpack/webpack-dev-server/issues/62
    // serverConfig.plugins.push(new WriteFilePlugin({ log: false }));

    // Hot Module Replacement (HMR) + React Hot Reload
    // if (isDebug) {
    //   clientConfig.entry.client = [...new Set([
    //     'babel-polyfill',
    //     'react-hot-loader/patch',
    //     'webpack-hot-middleware/client',
    //   ].concat(clientConfig.entry.client))];
    //   clientConfig.output.filename = clientConfig.output.filename.replace('[chunkhash', '[hash');
    //   clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace('[chunkhash', '[hash');
    //   const { query } = clientConfig.module.rules.find(x => x.loader === 'babel-loader');
    //   query.plugins = ['react-hot-loader/babel'].concat(query.plugins || []);
    //   clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    //   clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    // }

    const bundler = webpack(webpackConfig);
    // console.log('1111',webpackConfig);
    // const wpMiddleware = webpackDevMiddleware(bundler, {
    //   // IMPORTANT: webpack middleware can't access config,
    //   // so we should provide publicPath by ourselves
    //   publicPath: clientConfig.output.publicPath,

    //   // Pretty colored output
    //   stats: clientConfig.stats,

    //   // For other settings see
    //   // https://webpack.github.io/docs/webpack-dev-middleware
    // });
    // const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    // let handleBundleComplete = async () => {
    //   handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

    //   const server = await runServer();
    //   const bs = browserSync.create();

    //   bs.init({
    //     ...isDebug ? {} : { notify: false, ui: false },

    //     proxy: {
    //       target: server.host,
    //       middleware: [wpMiddleware, hotMiddleware],
    //       proxyOptions: {
    //         xfwd: true,
    //       },
    //     },
    //   }, resolve);
    // };

    // bundler.plugin('done', stats => handleBundleComplete(stats));

    bundler.run(function (err, stats) {
      const jsonStats = stats.toJson()
      // stats = {
      //   colors: true,
      // }
      const start = new Date();
      console.info(
        `[${format(start)}] ` + (jsonStats.errors.length >0 ? jsonStats.errors[0]:'success~!')
      );
      // console.info(
      //   `[${format(start)}] `+jsonStats.errors.length >0 ? jsonStats.errors[0]:'success~!'
      // );
      // console.log(jsonStats.errors.length >0 ? jsonStats.errors[0]:'success~!')
    })
    
  })

}

export default start;