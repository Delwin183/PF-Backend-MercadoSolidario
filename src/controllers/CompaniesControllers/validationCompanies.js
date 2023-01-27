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
  const dataOng = {
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

  return {containErrors: false, message: "Usted registró correctamente con una cuenta de empresa. Felicitaciones, acá podrá encontrar posibles trabajadores con enormes virtudes solidarias.", dataOng};

}

module.exports = { isCompany };
