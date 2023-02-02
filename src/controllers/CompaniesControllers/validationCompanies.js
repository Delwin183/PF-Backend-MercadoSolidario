const axios = require("axios");
async function isCompany(body) {
  const {
    name,
    lastName,
    cuit,
    rut
  } = body;

  if (!cuit) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el CUIT.'};
  }

  const getCuit = await axios.get(
    `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=` +
      cuit
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

  const {nombre, domicilioFiscal} = data.Contribuyente;
  const dataCompany = {
    companyName: nombre,
    country: 'Argentina',
    province: domicilioFiscal.nombreProvincia,
    address: domicilioFiscal.direccion
  }

  if (!rut) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el archivo del Registro Unico Tributario..'};
  }

  if(!name) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el nombre.'};
  }

  if(!lastName) {
      return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el apellido.'};
  }

  return {containErrors: false, message: "Usted registró correctamente con una cuenta de empresa. Felicitaciones, acá podrá encontrar posibles trabajadores con enormes virtudes solidarias.", dataCompany};

};

async function validateUpdateCompany (body) {
  const {name, lastName, cuit, country, amountEmployee, email, type_of_user  } = body;

  if (cuit) {
    return {containErrors: true, message: 'EL CUIT es único por compañia y no se puede editar'};
  }
  if (email) {
    return {containErrors: true, message: 'El email no se puede cambiar, crear nuevo usuario'};
  }
  if(country) {
    return {containErrors: true, message: 'El App funciona solo en Argentina, no editar este atributo'};
  }
if(type_of_user !== "company" || type_of_user !== "ong" || type_of_user !== "user"){
  return {containErrors: true, message: 'El tipo de usuario solo puede ser company, ong, user'};
 }

  return {containErrors: false, message: "Usted ha actualizado el registro correctamente"}

}

module.exports = { isCompany, validateUpdateCompany };
