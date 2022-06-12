const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const books = [];


app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
    type Books {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    input BooksInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    type RootQuery{
        books: [Books!]!
    }
    type RootMutation{
        creatBooks(booksInput : BooksInput): Books
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        books: () => {
            return books;
        },
        creatBooks: (args) => {
           const book = {
               _id: Math.random().toString(),
               title: args.booksInput.title,
               description: args.booksInput.description,
               price: +args.booksInput.price,
               date: args.booksInput.date,
           }
           books.push(book);
           return book
        }
    },
    graphiql: true

})
);

app.listen(5000, () => {
    console.log('listening on port 5000')
});

