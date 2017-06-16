// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import m8 from './getPost'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {App},
	methods: {
		getPost() {
			return new Promise((resolve, reject) => {
				m8().then(data => {
					resolve(data);
				}).catch(err => {
					reject(err);
				})
			})
		}
	}
});
