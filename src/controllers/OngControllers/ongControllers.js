//bring in prisma

const prisma = require("../../db");
const { registerOfAUser } = require("../Auth/registrationController");

const {isOng, validateUpdateOng} = require("./validationOng");

// ONG singup
module.exports = {
  signUp: async function (body) {
    const hashPassword = await registerOfAUser(body);
    const resultIsOng = await isOng(body);

    let {
      email,
      name,
      rut,
      lastName,
      cuit,
      image,
      type_of_user,
      phone,
      amountEmployee,
      rubro,
      province
    } = body;

    //check
    if (hashPassword.containErrors) throw new Error(JSON.stringify(hashPassword));
    if (resultIsOng.containErrors) throw new Error(JSON.stringify(resultIsOng));

    const { ongName, country, address } = resultIsOng.dataOng;

    const ong = await prisma.ong.create({
      data: {
        password: hashPassword.password,
        email,
        name,
        lastName,
        phone,
        image: image? image: "https://cdn.discordapp.com/attachments/1060926514734055539/1072706880117416017/1.png",
        ongName: ongName ? ongName : undefined,
        country: country ? country : undefined,
        province: province ? province : undefined,
        address: address ? address : undefined,
        amountEmployee: amountEmployee ? amountEmployee : undefined,
        rubro: rubro ? rubro : undefined,
        cuit,
        rut,
        type_of_user,
      },
    });

    return { ...ong, ...resultIsOng, dataOng: null };
  },
  getOngs: async function () {
    const users = await prisma.ong.findMany({
      where: {
        isActive: true,
      },
      include: {
        posts: true,
        reviews: true,
      },
    });
    return users;
  },
  logicDeleteONG: async function (id, body) {
    const {isActive} = body;
    if (!id) {
      throw new Error("La id de la ONG ingresada no es correcta");
    }

    console.log(isActive)
    const result = await prisma.ong.update({
      where: {
        id: id,
      },
      data: {
        isActive: typeof isActive === "boolean" ? isActive : Boolean(isActive),
      },
    });
    return result;
  },
  getDeleteONGs: async function () {
    const result = await prisma.ong.findMany({
      where: {
        isActive: false,
      },
    });
    return result;
  },

  UpdateOng: async (id, body) => {
    const resultValidation  = await validateUpdateOng(body);

    if (resultValidation.containErrors) {
      throw new Error(JSON.stringify(resultValidation));
    };

    const data = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value)
    );
    const result = await prisma.ong.update({
      where: { id },
      data,
    });
    return {...result, ...resultValidation};
  },
};
