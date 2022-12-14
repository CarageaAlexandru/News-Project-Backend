module.exports = [
	{
		"GET /api": {
			description:
				"serves up a json representation of all the available endpoints of the api",
		},
		"GET /api/topics": {
			description:
				"Responds with an array of topic objects, each of which should have the following properties: slug and description",
			queries: [],
			exampleResponse: {
				topics: [
					{
						slug: "coding",
						description: "Code is love, code is life",
					},
					{
						slug: "football",
						description: "FOOTIE!",
					},
					{
						slug: "cooking",
						description: "Hey good looking, what you got cooking?",
					},
				],
			},
		},
		"GET /api/articles": {
			description: "Responds with an array of all article objects",
			queries: ["author", "topic", "sort_by", "order"],
			exampleResponse: {
				articles: [
					{
						author: "grumpy19",
						title: "The Notorious MSG’s Unlikely Formula For Success",
						article_id: 34,
						topic: "cooking",
						created_at: "2020-11-22T11:13:00.000Z",
						votes: 0,
						comment_count: 11,
					},
					{
						author: "tickle122",
						title: "The battle for Node.js security has only begun",
						article_id: 12,
						topic: "coding",
						created_at: "2020-11-15T13:25:00.000Z",
						votes: 0,
						comment_count: 7,
					},
					{
						author: "grumpy19",
						title: "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
						article_id: 6,
						topic: "coding",
						created_at: "2020-11-11T15:09:00.000Z",
						votes: 0,
						comment_count: 11,
					},
				],
			},
		},
		"GET /api/users": {
			description: "Responds with an array of all article objects",
			queries: ["author", "topic", "sort_by", "order"],
			exampleResponse: {
				users: [
					{
						username: "tickle122",
						name: "Tom Tickle",
						avatar_url:
							"https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
					},
					{
						username: "grumpy19",
						name: "Paul Grump",
						avatar_url:
							"https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
					},
					{
						username: "happyamy2016",
						name: "Amy Happy",
						avatar_url:
							"https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
					},
				],
			},
		},
		"GET /api/articles/:article_id": {
			description:
				"Responds with an article object with following properties: author, title, article_id, body, topic, created_at, votes.",
			queries: [],
			exampleResponse: {
				article: {
					article_id: 2,
					title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
					topic: "coding",
					author: "jessjelly",
					body: "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
					created_at: "2020-05-14T00:02:00.000Z",
					votes: 0,
					comment_count: 6,
				},
			},
		},
		"PATCH /api/articles/:article_id": {
			description:
				"Request body accepts: an object in the example below and it will increment the votes based on article_id.",
			"body example": { inc_votes: "newVote" },
			queries: [],
			exampleResponse: {
				updated_article: {
					article_id: 2,
					title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
					topic: "coding",
					author: "jessjelly",
					body: "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
					created_at: "2020-05-14T00:02:00.000Z",
					votes: 4,
				},
			},
		},
		"GET /api/articles/:article_id/comments": {
			description:
				"Responds with an array of comments for the given article_id and each comment will have the following properties: comment_id, votes, created_at, author, body",
			queries: [],
			exampleResponse: {
				comments: [
					{
						comment_id: 146,
						votes: 6,
						created_at: "2020-10-12T11:23:00.000Z",
						author: "jessjelly",
						body: "Soluta autem fuga non alias. Odit eligendi voluptas reiciendis repudiandae reiciendis doloribus adipisci qui consequuntur. Et dignissimos unde optio. Recusandae aspernatur eius error. Eos autem et iusto sunt fuga ipsam omnis voluptatem rerum.",
					},
					{
						comment_id: 14,
						votes: -4,
						created_at: "2020-08-14T13:09:00.000Z",
						author: "weegembump",
						body: "Iure quas est omnis porro. Est in est distinctio sequi consectetur rerum deserunt. Et et reiciendis. Consequatur distinctio sint porro neque molestiae.",
					},
					{
						comment_id: 256,
						votes: -5,
						created_at: "2020-08-10T12:15:00.000Z",
						author: "cooljmessy",
						body: "Aut fugiat eos distinctio culpa est est maxime. Maiores nihil quos velit minus beatae. Dolore eos tenetur voluptates nemo.",
					},
				],
			},
		},
		"POST /api/articles/:article_id/comments": {
			description:
				"Request body accepts: an object in the example below and it will respond with the posted comment. Username must exist in the database.",
			"body example": {
				username: "jessjelly",
				body: "Aut fugiat eos distinctio culpa est est maxime. Maiores nihil quos velit minus beatae. Dolore eos tenetur voluptates nemo.",
			},
			queries: [],
			exampleResponse: {
				insertedComment: {
					comment_id: 301,
					body: "Aut fugiat eos distinctio culpa est est maxime. Maiores nihil quos velit minus beatae. Dolore eos tenetur voluptates nemo.",
					article_id: 2,
					author: "jessjelly",
					votes: 0,
					created_at: "2022-10-13T20:57:16.487Z",
				},
			},
		},
		"GET /api/articles (queries)": {
			description:
				"The endpoint accepts following queries and will display the results.",
			queries: ["sort_by", "order"],
			"valid sort_by queries": [
				"title",
				"topic",
				"author",
				"body",
				"votes",
				"created_at",
			],
			"valid order queries": ["asc", "desc"],
			"exampleResponse for sort_by=author": {
				articles: [
					{
						author: "weegembump",
						title: "Seafood substitutions are increasing",
						article_id: 33,
						topic: "cooking",
						created_at: "2020-09-16T16:26:00.000Z",
						votes: 0,
						comment_count: 6,
					},
					{
						author: "weegembump",
						title: "What does Jose Mourinho's handwriting say about his personality?",
						article_id: 13,
						topic: "football",
						created_at: "2020-07-08T19:25:00.000Z",
						votes: 0,
						comment_count: 6,
					},
					{
						author: "tickle122",
						title: "History of Football",
						article_id: 20,
						topic: "football",
						created_at: "2020-03-10T21:05:00.000Z",
						votes: 0,
						comment_count: 5,
					},
					{
						author: "tickle122",
						title: "The vegan carnivore?",
						article_id: 36,
						topic: "cooking",
						created_at: "2020-03-09T21:21:00.000Z",
						votes: 0,
						comment_count: 6,
					},
					{
						author: "jessjelly",
						title: "Who are the most followed clubs and players on Instagram?",
						article_id: 19,
						topic: "football",
						created_at: "2020-09-13T12:02:00.000Z",
						votes: 0,
						comment_count: 13,
					},
					{
						author: "jessjelly",
						title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
						article_id: 2,
						topic: "coding",
						created_at: "2020-05-14T00:02:00.000Z",
						votes: 4,
						comment_count: 7,
					},
					{
						author: "happyamy2016",
						title: "High Altitude Cooking",
						article_id: 28,
						topic: "cooking",
						created_at: "2020-01-04T00:24:00.000Z",
						votes: 0,
						comment_count: 5,
					},
					{
						author: "happyamy2016",
						title: "Who Will Manage Your Club in 2021?",
						article_id: 14,
						topic: "football",
						created_at: "2020-06-24T14:14:00.000Z",
						votes: 0,
						comment_count: 3,
					},
					{
						author: "grumpy19",
						title: "Learn HTML5, CSS3, and Responsive WebSite Design in One Go",
						article_id: 9,
						topic: "coding",
						created_at: "2020-05-26T14:06:00.000Z",
						votes: 0,
						comment_count: 8,
					},
					{
						author: "grumpy19",
						title: "Halal food: Keeping pure and true",
						article_id: 32,
						topic: "cooking",
						created_at: "2020-06-18T20:08:00.000Z",
						votes: 0,
						comment_count: 5,
					},
					{
						author: "cooljmessy",
						title: "Stone Soup",
						article_id: 35,
						topic: "cooking",
						created_at: "2020-05-26T06:25:00.000Z",
						votes: 0,
						comment_count: 14,
					},
					{
						author: "cooljmessy",
						title: "An Introduction to JavaScript Object Notation (JSON) in JavaScript and .NET",
						article_id: 10,
						topic: "coding",
						created_at: "2020-07-02T11:23:00.000Z",
						votes: 0,
						comment_count: 8,
					},
				],
			},
		},
		"DELETE /api/comments/:comment_id": {
			description: "Delete the given comment by comment_id.",
			queries: [],
		},
	},
];
