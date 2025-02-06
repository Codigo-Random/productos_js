import { APIKEY, BASE_URL } from "./config.js"
import { logout, getToken } from "./auth.js"

const btnLogout = document.getElementById("logout");
if(btnLogout) {
    btnLogout.addEventListener("click", logout)
}

async function getProducts() {

    const requestOptions = {
        method: "GET",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    };

    const response = await fetch(`${BASE_URL}/rest/v1/products_clm?select=*,categories_clm(name)`, requestOptions) 
    if(!response.ok) {
        alert("Error en la petición")
        return false
    }

    const result = await response.json()

    console.log(result)
}

getProducts()