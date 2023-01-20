//bring in prisma

const prisma = require('../../db');
const { validationPost } = require('./validationPosts');

// ONG singup
module.exports = {
    getPosts: async function(body) {
        
        const posts = await prisma.post.findMany();
        return posts;
    },
    createPost: async function(body) {
        const {date} = body;
        date = date.toISOString()
        const validate = validationPost(body);

        if (validate.containErrors) {
            return validate.message
        }

        const newPost = await prisma.post.create({data: {...body, date}});
        return {...newPost, ...validate}
    }
}
