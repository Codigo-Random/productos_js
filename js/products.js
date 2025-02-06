import { logout } from "./auth.js"

const btnLogout = document.getElementById("logout");
if(btnLogout) {
    btnLogout.addEventListener("click", logout)
}
