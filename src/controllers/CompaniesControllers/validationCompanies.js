const axios = require('axios')
async function isCompany(companyCUIT) 
{ 
    try {
      const getCuit = await axios.get(`https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=`+ companyCUIT);
      const data = (getCuit.data)
      if(data.errorGetData) {
        console.log("La CUIT ingresada es incorrecta") 
      } else {
        console.log('La CUIT ingresada es correcta')
        return true;
      }
    } catch (error) {
      console.log(error);
    }
}

module.exports={isCompany};