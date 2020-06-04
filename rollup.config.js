//https://www.learnwithjason.dev/blog/learn-rollup-js/
//https://devhints.io/rollup
// import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve'; // to allow the loading of node packages from module directory
import commonjs from '@rollup/plugin-commonjs'; //alows transpiling of common_js modules (node) to es2105 modules
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import hash from 'rollup-plugin-hash';


//: While in watch mode (dev), the ROLLUP_WATCH environment variable will be set to "true" by Rollup's command line interface and can be checked by plugins and other processes.
const production = !process.env.ROLLUP_WATCH;

//  how to add enviornment variables to rollup config
// "build": "rollup -c --environment INCLUDE_DEPS,BUILD:production"

export default {
	external: ['jquery'],
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
		globals: {
			jquery: '$'
		}
	},
	plugins: [

		// svelte({
		// 	// enable run-time checks when not in production
		// 	dev: !production,
		// 	// we'll extract any component CSS out into
		// 	// a separate file — better for performance
		// 	// css: css => {
		// 	// 	css.write('public/build/bundle.css');
		// 	// }
		// 	emitCss: true
		// }),

		babel({
			exclude: ['/node_modules/**']
		}),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		// allows for the use on nodejs packages in a browser context eg: npm debug.
		resolve({
			browser: true, // if node module suports browser property in node_modules pacakage we are loading then see if there are altenartive files for bundling for the browser
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		postcss({
			//Extract CSS to the same location where JS file is generated but with .css extension.
			extract: true,
			minimize: production ? true : false,
			use: [
				['sass', {
					includePaths: [
						'./theme',
						'./node_modules'
					]
				}]
			]

		}),

		injectProcessEnv({
			NODE_ENV: process.env.NODE_ENV
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
		//production && (await import('rollup-plugin-terser')).terser()

		production && hash({
			dest: 'public/build/bundle.[hash].js',
			manifest: 'public/build/entrypoint.hashmanifest.json'
		})
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
