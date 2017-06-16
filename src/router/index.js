import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import Story from '@/components/Story'
import Manage from '@/components/Manage'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      components: {
      	default: Top,
		  stories: Story
	  }
    },
	  {
		  path: '/managefeed',
		  name: 'Manage',
		  components: {
			  stories: Manage
		  }
	  }
  ]
})
