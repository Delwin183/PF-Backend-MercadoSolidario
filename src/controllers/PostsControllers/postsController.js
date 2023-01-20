//bring in prisma

const prisma = require('../../db');
const validationPost = require('./validationPosts');

// ONG singup
module.exports = {
    getPosts: async function(body) {
        
        const posts = await prisma.post.findMany();
        return posts;
    },
    getPostsForId: async function(id){
        const post = await prisma.post.findUnique({where: {id}})
    
        if (!post) {
            throw new Error("La publicación que está buscando no existe o fue eliminada.")
        }

        return post;
    },
    createPost: async function(body) {
        const {expirationDate} = body;
        // expirationDate = expirationDate.toISOString()
        const validate = validationPost(body);

        if (validate.containErrors) {
            throw new Error(validate.message)
        }

        // const newPost = await prisma.post.create({data: {...body, expirationDate}});
        const newPost = await prisma.post.create({data: body}); 
        return {...newPost, ...validate}
    }
}
