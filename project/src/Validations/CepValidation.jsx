const cepValidation = () => {
    const formCompany = document.querySelector('#form_company')
    const cepInput = document.querySelector('#cep')
    const ruaInput = document.querySelector('#rua')
    const cidadeInput = document.querySelector('#city')
    const bairroInput = document.querySelector('#bairro')
    const regiaoInput = document.querySelector('#region')
    const formInputs = document.querySelectorAll('[data-input]')

    const closeButton = document.querySelector('#close_message')
    const fadeElement = document.querySelector('#fade')

    // Get CEP from input
    cepInput.addEventListener("keyup", (e) => {
        const inputValue = e.target.value

        // Check if we have the correct length
        if(inputValue.length === 10) {
            const cep = inputValue.replace(/[^\d]+/g, '')

            getAddress(cep)
        }
    })

    // Get Customer address from API
    const getAddress = async (cep) => {
        toggleLoader()

        cepInput.blur()

        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

        const res = await fetch(apiUrl)

        const data = await res.json()

        if(data.erro === true) {
            if(!ruaInput.hasAttribute("disabled")) {
                toggleDisabled()
                ruaInput.value = ""
                cidadeInput.value = ""
                bairroInput.value = ""
                regiaoInput.options[0].selected = true
            }

            cepInput.value = ""

            toggleLoader()

            toggleMessage("CEP inválido!")
            closeButton.innerText = "Prosseguir"

            return
        }

        if(ruaInput.value === "") {
            toggleDisabled()
        }

        ruaInput.value = data.logradouro
        cidadeInput.value = data.localidade
        bairroInput.value = data.bairro
        regiaoInput.value = data.uf

        toggleLoader()
    }

    // Add or remove disbaled attribute
    const toggleDisabled = () => {
        if(regiaoInput.hasAttribute("disabled")) {
            formInputs.forEach((input) => {
                input.removeAttribute("disabled")
            })
        } else {
            formInputs.forEach((input) => {
                input.setAttribute("disabled", "disbaled")
            })
        }
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

export default cepValidation


