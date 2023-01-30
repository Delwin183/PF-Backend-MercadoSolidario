//bring in prisma

const prisma = require("../../db");
const validationPost = require("./validationPosts");

// ONG singup
module.exports = {
  getPosts: async function () {
    const posts = await prisma.post.findMany({
      include: {
        confirmed: true,
        rubro: true,
      },
    });
    return posts;
  },
  getPostsForId: async function (id) {
    if (!id) {
      throw new Error(
        "Para buscar una publicación por ID, por favor, ingrese el identificador de la misma."
      );
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        confirmed: true,
      },
    });

    if (!post) {
      throw new Error(
        "La publicación que está buscando no existe o fue eliminada."
      );
    }

    return post;
  },
  createPost: async function (body) {
    const { expirationDate } = body;
    // expirationDate = expirationDate.toISOString()
    const validate = validationPost(body);

    if (validate.containErrors) {
      throw new Error(JSON.stringify(validate));
    }

    // const newPost = await prisma.post.create({data: {...body, expirationDate}});
    const newPost = await prisma.post.create({ data: body });
    return { ...newPost, ...validate };
  },
  logicDeletePost: async function (id) {
    if (!id) {
      throw new Error("El ID del Post ingresado no es correcto");
    }

    const result = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
    return result;
  },

  UpdatePosts: async (id, body) => {
    const data = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value)
    );
    const result = await prisma.post.update({
      where: { id },
      data,
    });
    return { result, message: "Datos actualizados." };
  },
};
