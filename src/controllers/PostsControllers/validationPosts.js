function validationPost(body){
    const { authorId, title, province } = body

    if (!authorId) {
        return {containErrors: true, message: "El ID del autor de la publicación (ONG) debe existir obligatoriamente para que se cumpla la relación en la DB."}
    }

    if (!title) {
        return {containErrors: true, message: "El título de la publicación es obligatorio, por favor llena ese campo."}
    }

    if (!province) {
        return {containErrors: true, message: "La provincia es obligatoria, por favor llena ese campo."}
    }

    return {containErrors: false, message: "Tu publicación se creó exitosamente"}
}

module.exports = validationPost;
