const jwt = require('jsonwebtoken')
const { SECRET_KEY_JWT } = process.env;


module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send('No tiene autorización para hacer la acción ejecutada.')
        }
        const decoded = jwt.verify(token, SECRET_KEY_JWT);
        req.userData = decoded;
        next()
    }catch{
        return res.status(401).send('No tiene autorización para hacer la acción ejecutada.')
    }
} 
