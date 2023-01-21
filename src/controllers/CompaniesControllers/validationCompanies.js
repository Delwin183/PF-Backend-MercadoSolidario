const axios = require("axios");
async function isCompany(body) {
  const {
    name,
    lastName,
    country,
    phone,
    companyName,
    amountEmployee,
    companyCUIT,
  } = body;
  const getCuit = await axios.get(
    `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=` +
      companyCUIT
  );
  const data = getCuit.data;

  if (data.errorGetData) {
    return {containErrors: true, message: "El CUIT ingresada es incorrecta"};
  } 
  
  if(data.Contribuyente.tipoClave !== "CUIT"){
    return {containErrors: true, message: "El CUIT ingresada no es de una empresa con fines de lucro."};
  }

  if(data.Contribuyente.EsExento){
    return {containErrors: true, message: "El CUIT ingresada no es de una empresa con fines de lucro."};
  }

  if(!name) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el nombre.'};
  }

  if(!lastName) {
      return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el apellido.'};
  }

  if(!country) {
      return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su pais natal.'};
  }

  if(!amountEmployee) {
      return {containErrors: true, message: 'Este campo es requerido, por favor ingrese la cantidad de empleados con los que cuenta.'};
  }

  if(!companyName) {
      return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el nombre de su empresa.'};
  }

  if(!phone) {
      return {containErrors: true, message: 'Este campo es requerido, por favor ingrese su numero de contacto.'};
  }

  return {containErrors: false, message: "Usted se registró correctamente."};

}

module.exports = { isCompany };
