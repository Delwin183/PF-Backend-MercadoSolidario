//bring in prisma

const prisma = require('../../db');

// ONG singup
module.exports = {
    signUp: async function(body) {
        try {
            const {name, lastName} = body;
            //check
            if(!name | !lastName) {
                console.log('Please, provide all fields')
            }

            const ong = await prisma.ong.create({
                data:{
                    name,
                    lastName
                }
            })

            return ong
        } catch (error) {
            console.log(error)
        }
    },
    getOngs: async function() {
        const users = await prisma.ong.findMany({include: {
            posts: true
        }});
        return users;
    },
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
