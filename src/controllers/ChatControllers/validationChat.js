function validationChat(body) {
    const {email, question, answer} = body;

    if (!email) {
        return {containErrors: true, message: "El email es obligatorio, por favor llena ese campo."}
    };

    if (!question) {
        return {containErrors: true, message: "La pregunta es obligatoria, por favor llena ese campo."}
    };

    return {containErrors: false, message: "Tu chat se creó exitosamente"}
};

module.exports = validationChat;
