import Vue from 'vue'
export default function m8() {
	return new Promise((resolve, reject) => {
		var FeedParser = require('feedparser');

		var req = Vue.http.get('http://feeds2.feedburner.com/thenextweb?format=xml');
		var feedparser = new FeedParser([options]);

		req.on('error', function (error) {
			// handle any request errors
		});

		req.on('response', function (res) {
			var stream = this; // `this` is `req`, which is a stream

			if (res.statusCode !== 200) {
				this.emit('error', new Error('Bad status code'));
			}
			else {
				stream.pipe(feedparser);
			}
		});

		feedparser.on('error', function (error) {
			reject(error);
		});

		feedparser.on('readable', function () {
			// This is where the action is!
			var stream = this; // `this` is `feedparser`, which is a stream
			var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
			var item;
			const items = [];
			while (item = stream.read()) {
				items.push(item);
			}
			resolve(items)
		});
	})
}

