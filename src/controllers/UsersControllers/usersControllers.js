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
        cuil: cuil ? cuil : undefined,
        user_linkedin: user_linkedin ? user_linkedin : undefined,
        birthDate: birthDate ? birthDate : undefined,
        profession: profession ? profession : undefined,
        type_of_user,
      },
      include: { confirmed: true },
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
  logicDeleteUser: async function (id) {
    if (!id) {
      throw new Error("El ID del usuario ingresado no es correcto");
    }

    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
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
    });
    return {...result, ...resultValidation};
  },
};
