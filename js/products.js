import { APIKEY, BASE_URL } from "./config.js"
import { logout, getToken, getUserId } from "./auth.js"

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

    // el UserId del user actual
    const currentUserId = getUserId()
    
    // Vaciamos el div
    productList.innerHTML = ""
    
    allProducts.forEach(product => {

        let btnDelete = ""

        // es mi producto?
        if(currentUserId == product.user_id) {
            btnDelete = `
                    <button data-id="${product.id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Eliminar
                    </button>
                    `
        }

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
                    ${btnDelete}
                </div>
            </div>
        `
    });

    const buttonsDelete = document.querySelectorAll(".delete-btn") 
    buttonsDelete.forEach(button => {
        const productId = button.getAttribute("data-id")

        button.addEventListener("click", () => {
            deleteProduct(productId)
        })
    })
}

async function deleteProduct(productId) {
    
    const requestOptions = {
        method: "DELETE",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    };

    const response = await fetch(`${BASE_URL}/rest/v1/products_clm?id=eq.${productId}`, requestOptions) 
    if(!response.ok) {
        alert("Error en la petición")
        return false
    }

    getProducts()

}

getProducts()