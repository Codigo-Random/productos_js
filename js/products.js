import { APIKEY, BASE_URL } from "./config.js"
import { logout, getToken } from "./auth.js"

const btnLogout = document.getElementById("logout");
if(btnLogout) {
    btnLogout.addEventListener("click", logout)
}

const productList = document.getElementById("productList");

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
    printProducts(result)

}

function printProducts(allProducts) {
    allProducts.forEach(product => {
        productList.innerHTML += `
            <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
                <p class="text-gray-600 mb-2">${product.description}</p>
                <p class="text-gray-600 mb-2">Categoría: ${product?.categories_clm?.name}</p>
                <p class="text-lg font-bold text-green-600 mb-4">${product.price}€</p>
                <div class="flex justify-between">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Editar
                    </button>
                    <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Eliminar
                    </button>
                </div>
            </div>
        `
    });
}

getProducts()