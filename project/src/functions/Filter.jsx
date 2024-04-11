const filter = () => {
    const search = document.querySelector('#search form input')
    const table_rows = document.querySelectorAll('tbody tr')

    search.addEventListener("input", searchTable)

    function searchTable() {
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase()
            let search_data = search.value.toLowerCase()

            row.classList.toggle('hidee', table_data.indexOf(search_data)< 0)
            row.style.setProperty('--delay', i / 25 + 's')
        })
    }
}

export default filter