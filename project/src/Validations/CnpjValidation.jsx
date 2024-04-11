const cnpjValidation = () => {
    const cnpjInput = document.querySelector('#cnpj')

    const closeButton = document.querySelector('#close_message')
    const fadeElement = document.querySelector('#fade')

    // Get CNPJ from input
    cnpjInput.addEventListener("keyup", (e) => {
        const inputValue = e.target.value

        // Check if we have the correct length
        if(inputValue.length === 18) {
            let cnpj = inputValue.replace(/[^\d]+/g,'');	
            
            toggleLoader()

            cnpjInput.blur()

            if(!validateCnpj(cnpj)) {
                cnpjInput.value = ""

                toggleLoader()

                toggleMessage("CNPJ inválido!")
                closeButton.innerText = "Prosseguir"

                return
            }

            toggleLoader()
        }
    })

    const validateCnpj = (cnpj) => {
        if(cnpj == '') return false;
     
        if (cnpj.length != 14)
            return false;
    
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
                return false;
            
        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                    pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                    pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }

    // Show or hide loader
    const toggleLoader = () => {
        const loaderElement = document.querySelector('#loader')

        fadeElement.classList.toggle('hide')
        loaderElement.classList.toggle('hide')
    }

    // Show or hide message
    const toggleMessage = (msg) => {
        const messageElement = document.querySelector('#message')
        const messageElementText = document.querySelector('#message p')

        messageElementText.innerText = msg

        fadeElement.classList.toggle('hide')
        messageElement.classList.toggle('hide')
    }

    // Close message modal
    closeButton.addEventListener("click", () => {
        toggleMessage("Tente novamente.")
        closeButton.innerText = "Fechar"
    })
}

export default cnpjValidation