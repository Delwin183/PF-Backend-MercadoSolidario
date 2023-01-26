const axios = require("axios");

async function isOng(body) {
  const {
    name,
    lastName,
    phone,
    rut,
    ongCUIT
  } = body;

  if (!cuit) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el CUIT.'};
  }

  const getCuit = await axios.get(
    `https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=` + ongCUIT
  );
  const data = getCuit.data;
  if (data.errorGetData) {
    return {containErrors: true, message: "La CUIT ingresada es incorrecta"}
  }

  if(data.Contribuyente.tipoClave !== "CUIT"){
    return {containErrors: true, message: "El CUIT ingresado no es de una empresa sin fines de lucro."};
  }

  if(!data.Contribuyente.EsExento) {
    return {containErrors: true, message: "El CUIT ingresado no es de una empresa sin fines de lucro."}
  }

  const {nombre, domicilioFiscal} = data.Contribuyente;
  const dataOng = {
    ongName: nombre,
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

  if (!phone) {
    return {containErrors: true, message: 'Este campo es requerido, por favor ingrese el numero de contacto de la empresa sin animos de lucro.'};
  }

  return {containErrors: false, message: "Usted se registro correctamente con una cuenta de ONG."}
}

module.exports = isOng;
