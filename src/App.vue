<template>
	<div id="app">
		<router-view></router-view>
		<router-view name="stories"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>
<style src="./styles/styles.sass" lang="sass"></style>

