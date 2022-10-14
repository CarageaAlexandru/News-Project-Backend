# Northcoders News API

## Project Overview

A news API built user `Node.js`, `Express.js`, `Supertest` and `PostgreSQL` for the relational database.

All available endpoints can be found in the `endpoints.json` file, by following the link to the hosted version, and at the bottom of this readme.

This will be used as the backend for an upcoming front-end application where we will use ReactJS.

## Hosted Version

You can see a live version of this app, hosted with `Heroku`:

https://caragea-nc-news-backend.herokuapp.com/api

## Setup Instructions

### Installation Requirements

-   **Node.js**: v17.8.0 or later
-   **PostgreSQL**: v 12.10 or later

### Cloning the repository:

Create a directory to clone the repository to. In your terminal:

```
$ mkdir <new directory name>
```

Change directory to the one you just created:

```
$ cd <new directory name>
```

Then clone the repository:

```
$ git clone https://github.com/CarageaAlexandru/News-Project-Backend
```

### Install Dependencies

To install the both app and developer dependencies, in the root directory put the following command in your terminal:

```
$ npm install
```

### Setup Dev & Test Environments

You will need to create two .env files to determine when we are using the development or test databases. You can use the following commands in the root directory:

```
$ echo 'PGDATABASE=nc_news' >> .env.development
$ echo 'PGDATABASE=nc_news_test' >> .env.test
```

These will automatically be ignored in the .gitignore file.

### Database setup and seeding

Run the following scripts in the root directory to setup both your development and test databases

Setup:

```
$ npm run setup-dbs
```

Seeding:

```
$ npm run seed
```

## Testing

To test this application, the `jest` framework is used. The tests can be run with the following script:

```
$ npm test
```

## Dependencies

These are all the dependencies required for this web app.

### Application Dependencies

| Dependency | Version         | Description                    | Docs                                                              |
| ---------- | --------------- | ------------------------------ | ----------------------------------------------------------------- |
| npm        | 17.8.0 or later | Node.js / Node Package Manager | https://docs.npmjs.com/downloading-and-installing-node-js-and-npm |
| dotenv     | 16.0.1 or later | Loads environment variables    | https://www.npmjs.com/package/dotenv                              |
| pg         | 8.7.3 or later  | PostgreSQL client for Node.js  | https://www.npmjs.com/package/pg                                  |
| express    | 4.18.1 or later | Web application framework      | https://www.npmjs.com/package/express                             |

### Developer-only Dependencies

| Dependency  | Version          | Description                                        | Docs                                           |
| ----------- | ---------------- | -------------------------------------------------- | ---------------------------------------------- |
| jest        | v27.5.1 or later | JavaScript testing framework                       | https://jestjs.io/docs/getting-started         |
| jest-sorted | v1.0.14 or later | Test sort and order of arrays & objects            | https://github.com/P-Copley/jest-sorted#readme |
| supertest   | v6.2.3 or later  | Node.js library for testing HTTP requests          | https://www.npmjs.com/package/supertest        |
| pg-format   | v1.0.4 or later  | Formats PSQL queries to protect form SQL injection | https://www.npmjs.com/package/pg-format        |

# REST APIs

## Index

1. [GET /api/topics](#1-get-apitopics)
2. [GET /api/articles](#2-get-apiarticles)
3. [GET /api/articles/:article_id](#3-get-apiarticlesarticle_id)
4. [GET /api/articles/:article_id/comments](#4-get-apiarticlesarticle_idcomments)
5. [PATCH /api/articles/:article_id](#5-patch-apiarticlesarticle_id)
6. [POST /api/articles/:article_id/comments](#6-post-apiarticlesarticle_idcomments)
7. [GET /api/users](#7-get-apiusers)
8. [DELETE /api/comments/:comment_id](#8-delete-apicommentscomment_id)

## 1. GET /api/topics

### Description

Responds with an array of topic objects with slug and description properties

### Status

200 - OK

### Response body

Responds with JSON-encoded object with with property **_topics_**, whose value is an array of topic objects. Example:

```
{
  "topics": [
    {
      "slug": "coding",
      "description": "Code is love, code is life"
    },
    {
      "slug": "football",
      "description": "FOOTIE!"
    },
    {
      "slug": "cooking",
      "description": "Hey good looking, what you got cooking?"
    }
  ]
}
```

## 2. GET /api/articles

### Description

Responds with an array of article objects, default sorted by created_at in descending order.

### Status

200 - OK

### Query Params

-   **_sort_by_** - String - sorts the array of article objects by a valid property

-   **order** - String - [asc / desc] - orders the article objects in either ascending or descending order

-   **_topic_** - String - filters the article objects by a valid topic

### Response body

Responds with JSON-encoded object with with property **_*articles*_**, whose value is the requested articles objects. Example:

```
{
    "articles": [
    {
        "author": "grumpy19",
        "title": "The Notorious MSG’s Unlikely Formula For Success",
        "article_id": 34,
        "topic": "cooking",
        "created_at": "2020-11-22T11:13:00.000Z",
        "votes": 0,
        "comment_count": 11
    },
    {
        "author": "tickle122",
        "title": "The battle for Node.js security has only begun",
        "article_id": 12,
        "topic": "coding",
        "created_at": "2020-11-15T13:25:00.000Z",
        "votes": 0,
        "comment_count": 7
    },
    // more user objects
  ]
}
```

## 3. GET /api/articles/:article_id

### Description

Responds with a JSON article object with author, title, article_id, body, topic, created_at, votes and comment count details.

### Status

200 - OK

### Parameters

**:article_id** _Integer_: ID of the required article

### Response body

Responds with JSON-encoded object with with property **_*article*_**, whose value is the requested article object. Example:

```
{
    "article": {
        "article_id": 1,
        "title": "Running a Node App",
        "topic": "coding",
        "author": "jessjelly",
        "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This     part dives deeper into how to successfully run your app with systemd long-term, and how to set it     up in a production environment.",
        "created_at": "2020-11-07T06:03:00.000Z",
        "votes": 0,
        "comment_count": 8
  }
}
```

## 4. GET /api/articles/:article_id/comments

### Desccription

Responds with an array of comment objects for the specified article.

_note:_ if an article has no comments, the array will be empty

### Status

200 - OK

### Parameters

**:article_id** _Integer_: ID of the required article

### Response body

Responds with JSON-encoded object with with property **_comments_**, whose value is an array of comment objects for the specified article. Example:

```
{
   "comments": [
    {
        "comment_id": 89,
        "votes": 2,
        "created_at": "2020-10-24T07:08:00.000Z",
        "author": "cooljmessy",
        "body": "Esse et expedita harum non. Voluptatibus commodi voluptatem. Minima velit suscipit numquam ea. Id vitae debitis aut incidunt odio quo quam possimus ipsum."
    },
    {
        "comment_id": 86,
        "votes": 14,
        "created_at": "2020-10-04T02:03:00.000Z",
        "author": "tickle122",
        "body": "Et explicabo dignissimos officia dolore rerum aliquam corrupti. Culpa corporis earum et earum officia a est atque at. Quidem quo recusandae delectus autem possimus blanditiis optio. Sed culpa culpa. Exercitationem nemo aspernatur alias ut qui."
    },
  ]
}

```

## 5. PATCH /api/articles/:article_id

### Description

Updates the specified article's votes by an incremenent passed in the request body. The updated article object is returned.

### Status

200 - OK

### Parameters

**:article_id** _Integer_: ID of the required article

### Request body

The request body should be a JSON object with a key **_inc_votes_** and value of an **integer** to increment. To decrement the votes, use a negative number.

Example:

```
{
    "inc_votes": 4
}
```

### Response body

Responds with JSON-encoded object with with property **_updatedArticle_**, whose value is the updated article object. Example:

```
{
    "updated_article": {
        "article_id": 2,
        "title": "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        "topic": "coding",
        "author": "jessjelly",
        "body": "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
        "created_at": "2020-05-14T00:02:00.000Z",
        "votes": 4
    }
}
```

## 6. POST /api/articles/:article_id/comments

### Description

Adds comment to specified article. Will respond with the newly created comment object.

### Status

201 - Created

### Parameters

**:article_id** _Integer_: ID of the required article

### Request body

The request body should be a JSON object with a keys **_username_** and **_body_** and values of an existing username and the body of the comment, respectively.

Example:

```
{
    "username": "jessjelly",
    "body": "Aut fugiat eos distinctio culpa est est maxime. Maiores nihil quos velit minus beatae. Dolore eos tenetur voluptates nemo."
}
```

### Response body

Responds with JSON-encoded object with with property **_addedComment_**, whose value is the newly created comment object.

Example:

```
{
    "insertedComment": {
        "comment_id": 305,
        "body": "Aut fugiat eos distinctio culpa est est maxime. Maiores nihil quos velit minus beatae. Dolore eos tenetur voluptates nemo.",
        "article_id": 2,
        "author": "jessjelly",
        "votes": 0,
        "created_at": "2022-10-14T13:48:52.129Z"
    }
}
```

## 7. GET /api/users

### Description

Responds with an array of username objects

### Status

200 - OK

### Response body

Responds with JSON-encoded object with with property **_users_**, having the following properties: username, name, avatar_url.

Example:

```
{
    "users": [
        {
            "username": "tickle122",
            "name": "Tom Tickle",
            "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
        },
  ]
}
```

## 8. DELETE /api/comments/:comment_id

### Description

Deletes the comment by specified comment id

### Status

204 - No content

### Parameters

**comment_id** - _integer_ - the id number of the comment to be deleted
