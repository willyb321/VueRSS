<template>
		<div class="post">
			<div class="loading" v-if="loading">
				Loading...
			</div>

			<div v-if="error" class="error">
				{{ error }}
			</div>

			<div v-if="post">
				<div v-for="(item, index) in post.docs" class="">
					<div class="box">
					<div class="container">
						<h1 class="title">{{ post.docs[index].doc.title }}</h1>
						<h2 class="subtitle">{{ 'From ' + item.doc.meta.title + ' (' + post.dates[index] + ')' }}</h2>
						<a v-if="item.doc.origlink" class="button is-info" style="float: right;" :href="item.doc.origlink" target="_blank">View Story</a>
						<a v-else="" class="button is-info" style="float: right;" :href="item.doc.link" target="_blank">View Story</a>
						<input onclick="this.value=this.value=='Show Summary'?'Hide Summary':'Show Summary';" value='Show Summary' type='button' class="is-primary is-bold button spoilerbutton">
						<div class="spoiler">
							<div>{{ post.docs[index].doc.description.replace(/<[^>]+>/g, '') }}</div>
						</div>
					</div>
					</div>
					<hr>
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
				this.$http.get(process.env.API_URL + '/').then(response => {
					this.loading = false;
					console.log(response);
					this.post = response.data;
				}, err => {
					this.error = JSON.stringify(err)
				});
			}
		}
	}
</script>
