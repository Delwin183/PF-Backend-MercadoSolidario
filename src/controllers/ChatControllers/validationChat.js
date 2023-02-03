function validationChat(body) {
    const {userIDs, email, question, answer} = body;
    
    if (!userIDs) {
        return {containErrors: true, message: "El ID del usuario debe existir obligatoriamente para que se relacione con el Chat"}
    };

    if (!email) {
        return {containErrors: true, message: "El email es obligatorio, por favor llena ese campo."}
    };

    if (!question) {
        return {containErrors: true, message: "La pregunta es obligatoria, por favor llena ese campo."}
    };

    if (!answer) {
        return {containErrors: true, message: "La respuesta es obligatoria, por favor llena ese campo."}
    };

    return {containErrors: false, message: "Tu chat se creó exitosamente"}
};

module.exports = validationChat;