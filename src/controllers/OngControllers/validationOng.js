const axios = require("axios");

async function isOng(ongCUIT) {
  const getCuit = await axios.get(
    `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=` + ongCUIT
  );
  const data = getCuit.data;
  if (data.errorGetData) {
    return {containErrors: true, message: "La CUIT ingresada es incorrecta"}
  }
  if(!data.Contribuyente.EsExento) {
    return {containErrors: true, message: "La CUIT ingresada no es una ONG"}
  }
  return {containErrors: false, message: "La ONG se creo exitosamente"}
}

module.exports = isOng;
