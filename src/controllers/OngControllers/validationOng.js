const axios = require("axios");

async function isOng(ongCUIT) {
  const {
    name,
    lastName,
    country,
    phone,
    province,
    ongName,
    amountEmployee,
    ongCUIT,
  } = body;
  const getCuit = await axios.get(
    `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=` + ongCUIT
  );
  const data = getCuit.data;
  if (data.errorGetData) {
    return {containErrors: true, message: "La CUIT ingresada es incorrecta"}
  }

  if(data.tipoClave !== "CUIT"){
    return {containErrors: true, message: "El CUIT ingresado no es de una empresa sin fines de lucro."};
  }

  if(!data.Contribuyente.EsExento) {
    return {containErrors: true, message: "El CUIT ingresado no es de una empresa sin fines de lucro."}
  }

  if(!name) {
    return {containErrors: true, message: ('Este campo es requerido, por favor ingrese el nombre.')};
  }

  if(!lastName) {
      return {containErrors: true, message: ('Este campo es requerido, por favor ingrese el apellido.')};
  }

  if(!country) {
      return {containErrors: true, message: ('Este campo es requerido, por favor ingrese su pais natal.')};
  }

  if(!phone) {
    return {containErrors: true, message: ('Este campo es requerido, por favor ingrese su numero de contacto.')};
  }
  
  if(!province) {
    return {containErrors: true, message: ('Este campo es requerido, por favor ingrese en que provincia reside su ONG')};
  }
  
  if(!ongName) {
      return {containErrors: true, message: ('Este campo es requerido, por favor ingrese el nombre de su ONG.')};
  }

  if(!amountEmployee) {
      return {containErrors: true, message: ('Este campo es requerido, por favor ingrese la cantidad de empleados con los que cuenta.')};
  }

  return {containErrors: false, message: "Usted se registro correctamente con una cuenta ONG que tiene por nombre " + name}
}

module.exports = isOng;
