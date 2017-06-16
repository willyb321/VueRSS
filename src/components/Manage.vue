<template>
	<div>
	<section class="hero is-primary is-bold">
		<div class="hero-body">
			<div class="container">
				<h1 class="title">VueRSS</h1>
				<h2 class="subtitle">Welcome to VueRSS</h2><a href="/">Go back</a>
			</div>
		</div>
	</section>
	<div class="post">
		<div class="loading" v-if="loading">
			Loading...
		</div>

		<div v-if="error" class="error">
			{{ error }}
		</div>

		<div v-if="post">
			<div class="container">
				<h1 class="title">Add Feeds</h1>
				<div class="box">
					<form @submit="add($event)" method="post" onsubmit="event.preventDefault(); console.log(event)" class="form">
						<input type="text" name="url" placeholder="RSS URL" class="input"/>
						<button type="submit" class="button is-primary">Submit</button>
					</form>
				</div>
			</div>
			<div class="container">
				<h1 class="title">Remove Feeds</h1>
				<div v-for="(item, ind) in post.docs">
					<div class="box"><span>{{ item.doc.url }}</span>
						<button style="float: right" @click="remove($event)" :id="item.doc._id" class="button">Remove Feed
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				loading: false,
				post: null,
				error: null
			}
		},
		created() {
			// fetch the data when the view is created and the data is
			// already being observed
			this.fetchData()
		},
		watch: {
			// call again the method if the route changes
			'$route': 'fetchData'
		},
		methods: {
			async fetchData() {
				this.error = this.post = null;
				this.loading = true;
				// replace getPost with your data fetching util / API wrapper
				this.$http.get(process.env.API_URL + '/managefeed').then(response => {
					this.loading = false;
					console.log(response);
					this.post = response.data;
				}, err => {
					this.error = JSON.stringify(err)
				});
			},
			remove: function(event) {
				this.$http.post(process.env.API_URL + '/remove', {toremove: event.target.id}).then(response => {
					this.loading = false;
					console.log(response);
					this.fetchData()
				}, err => {
					this.error = JSON.stringify(err)
				});
			},
			add: function(event) {
				this.$http.post(process.env.API_URL + '/add', {url: event.target.children["0"].value}).then(response => {
					this.loading = false;
					console.log(response);
					this.fetchData()
				}, err => {
					this.error = JSON.stringify(err)
				});
			}
		}
	}
</script>
