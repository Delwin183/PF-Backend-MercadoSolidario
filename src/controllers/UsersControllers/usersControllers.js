const prisma = require("../../db");
const { registerOfAUser } = require("../Auth/registrationController");
const {validateUser, validateUpdateUser} = require("./validationUsers");

module.exports = {
  signUp: async function (body) {
    const hashPassword = await registerOfAUser(body);
    const validateUsers = await validateUser(body);

    let {
      email,
      name,
      lastName,
      cuil,
      user_linkedin,
      birthDate,
      profession,
      type_of_user,
      phone,
      type_of_insignia,
      image,
      province
    } = body;

    if (hashPassword.containErrors) {
      throw new Error(JSON.stringify(hashPassword));
    }

    if (validateUsers.containErrors) {
      throw new Error(JSON.stringify(validateUsers));
    }

    const user = await prisma.user.create({
      data: {
        password: hashPassword.password,
        email,
        name,
        lastName,
        phone,
        province: province ? province : undefined,
        image: image ? image : "https://cdn.discordapp.com/attachments/1060926514734055539/1072706849452855416/3.png",
        cuil: cuil ? cuil : undefined,
        user_linkedin: user_linkedin ? user_linkedin : undefined,
        birthDate: birthDate ? birthDate : undefined,
        profession: profession ? profession : undefined,
        type_of_insignia: type_of_insignia ? type_of_insignia : undefined,
        type_of_user,
      }
    });
    return { ...user, ...validateUsers };
  },
  getUsers: async function () {
    const allUsers = await prisma.user.findMany({
      where: {
        isActive: true,
      },
      include: {
        confirmed: true,
        reviews: true,
      },
    });
    return allUsers;
  },
  getUserById: async function (id) {
    if (!id) {
      throw new Error(
        "Para buscar un usuario por ID, por favor, ingrese el identificador de la misma."
      );
    }

    const result = await prisma.user.findUnique({
      where: { id },
      include: {
        confirmed: true,
        reviews: true,
      },
    });
    if (!id) {
      throw new Error("El usuario que busca no existe.");
    }

    return result;
  },
  logicDeleteUser: async function (id, body) {
    const {isActive} = body;
    if (!id) {
      throw new Error("El ID del usuario ingresado no es correcto");
    }

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isActive: isActive,
      },
    });
    return result;
  },
  getDeleteUser: async function () {
    const result = await prisma.user.findMany({
      where: {
        isActive: false,
      },
      include: {
        confirmed: true,
        reviews: true,
      },
    });
    return result;
  },
  UpdateUser: async (id, body) => {
    const resultValidation  = await validateUpdateUser(body);

    if (resultValidation.containErrors) {
      throw new Error(JSON.stringify(resultValidation));
    };

    const data = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value)
    );

    const result = await prisma.user.update({
      where: { id },
      data,
      include: {confirmed: true, reviews: true}
    });
    return {...result, ...resultValidation};
  },
  otorgarInsignias: async (id, body) => {
    const {type_of_insignia} = body

    const result = await prisma.user.update({
      where: { id },
      data: {type_of_insignia}
    });
    return result;
  },
};
