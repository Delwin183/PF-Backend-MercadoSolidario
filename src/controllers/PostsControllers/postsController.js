//bring in prisma

const prisma = require('../../db');

// ONG singup
module.exports = {
    getPosts: async function(body) {
        const {
            cuit
        } = body;
        const posts = await prisma.post.findMany();
        return posts;
    },
    createPost: async function(body) {
        const {authorId, title} = body;
        const newPost = await prisma.post.create({data: {authorId, title}});
        return newPost
    }
}
