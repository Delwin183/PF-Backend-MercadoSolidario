const axios = require("axios");

async function isOng(ongCUIT) {
  try {
    const getCuit = await axios.get(
      `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=` + ongCUIT
    );
    const data = getCuit.data;
    if (data.errorGetData || !data.Contribuyente.EsExento) {
      console.log(
        "La CUIT ingresada es incorrecta o la organización no es una ONG"
      );
    } else {
      console.log("La CUIT ingresada es correcta");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = isOng;
