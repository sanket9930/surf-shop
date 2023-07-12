const faker = require('faker');
const Post = require('./models/post');

async function seedPosts(){
    await Post.deleteMany({});
    for(let i of new Array(40)){
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author:{
                '_id': '646afaf2d5b268e08800fcce', 
                'username': 'sanket'
            }
        }
        await Post.create(post);
    }
    console.log('40 New posts created');
}

module.exports = seedPosts;

