// css
import './styles/App.scss';
import './styles/global.css'

// js 
//  SVELTE
// import App from './App.svelte';
// const app = new App({
// 	target: document.querySelector('#app'),
// });
// export default app;

// JQUERY
import $ from 'Jquery'
//import {jQuery} from 'jquery';
//window.$ = window.jQuery = jQuery;

//  ES6 with BABEL
let myname = 'Scott';
const sayHello = () => console.log(`hello ${myname}`);
sayHello();

window.onload = function () {
	if ($) {
		// jQuery is loaded  
		alert("Jquery is accesible from the bundle!");
	} else {
		// jQuery is not loaded
		alert("jquery not defined");
	}
}


//if (process.env.NODE_ENV === 'development') {
//	console.log('Dev Mode');
//}	