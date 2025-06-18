export function validarString(campo: string) {
    if (typeof campo !== "string") {
        throw new Error(`${campo} no es del tipo de dato adecuado para el campo.`)
    }
}

export function validarNumber(campo: number) {
    if (typeof campo !== "number") {
        throw new Error(`${campo} no es del tipo de dato adecuado para el campo.`)
    }
}