export function validationPost(body){
    const { authorId, type_of_donor } = body

    if (!authorId) {
        return {containErrors: true, message: "El ID del autor de la publicación (ONG) debe existir obligatoriamente para que se cumpla la relación en la DB."}
    }

    if (!title) {
        return {containErrors: true, message: "El título de la publiacación es obligatorio, por favor llena ese campo."}
    }

    if (!location) {
        return {containErrors: true, message: "La localidad es obligatoria, por favor llena ese campo."}
    }

    if (type_of_donor !== "EFECTIVO" && type_of_donor !== "EN_ESPECIE") {
        return {containErrors: true, message: "Solo puede haber dos tipos de donaciones, intenta nuevamente."}
    }

    return {containErrors: false, message: "Tu publicación se creó exitosamente"}
}
