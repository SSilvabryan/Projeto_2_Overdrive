export const menuDashboard = () => {
    const menu = document.querySelector("#menu-icon")
    let navlist = document.querySelector("#nav")
    
    menu.classList.toggle('bi-x-lg')
    navlist.classList.toggle('open') 
}