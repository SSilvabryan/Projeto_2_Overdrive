export const cpfLength = (cpf) => {
    if(cpf.length !== 14) {
        return false
    }
    return true
}

export const cnpjLength = (cnpj) => {
    if(cnpj.length !== 18) {
        return false
    }
    return true
}

export const telefoneLength = (telefone) => {
    if (telefone.length == 15 || telefone.length == 14) {
        return true
    }
    return false
}

export const cnaeLength = (cnae) => {
    if(cnae.length !== 9) {
        return false
    }
    return true
}

export const cepLength = (cep) => {
    if(cep.length !== 10) {
        return false
    }
    return true
}