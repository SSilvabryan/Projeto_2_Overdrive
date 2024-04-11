const cpfValidation = () => {

    const cpfInput = document.querySelector('#cpf')
    
    const closeButton = document.querySelector('#close_message')
    const fadeElement = document.querySelector('#fade')

    // Get CPF from input
    cpfInput.addEventListener("keyup", (e) => {
        const inputValue = e.target.value

        // Check if we have the correct length
        if(inputValue.length === 14) {
            let cpf = inputValue.replace(/[^\d]+/g,'');
            
            toggleLoader()

            cpfInput.blur()

            if(!validateCpf(cpf)) {
                cpfInput.value = ""

                toggleLoader()

                toggleMessage("CPF inválido!")
                closeButton.innerText = "Prosseguir"

                return
            }

            toggleLoader()
        }
    })

    const validateCpf = (cpf) => {
        if(cpf == '') return false;	
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return false;		
        // Valida 1o digito	
        let add = 0;	
        for (let i=0; i < 9; i ++)		
            add += parseInt(cpf.charAt(i)) * (10 - i);	
            let rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(cpf.charAt(9)))		
                return false;	
        // Valida 2o digito	
        add = 0;	
        for (let i = 0; i < 10; i ++)		
            add += parseInt(cpf.charAt(i)) * (11 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	
            rev = 0;	
        if (rev != parseInt(cpf.charAt(10)))
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

export default cpfValidation