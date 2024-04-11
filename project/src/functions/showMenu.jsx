export const showMenu = () => {
    let menu = document.querySelector("#menu-icon")
    let navlist = document.querySelector("#navlist")
    
    menu.classList.toggle('bi-x-lg')
    navlist.classList.toggle('open') 
}

