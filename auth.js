const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"
const BASE_URL = "https://irileofdjkcmspvebnqq.supabase.co/"

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

async function login() {

    const requestOptions = {
        method: "POST",
        headers: {
            "apikey": APIKEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": inputEmail.value,
            "password": inputPassword.value
        }),
    };

    const response = await fetch(`${BASE_URL}/auth/v1/token?grant_type=password`, requestOptions) 
    if(!response.ok) {
        alert("Error al iniciar sesión")
    }

    const result = await response.json()
 
    localStorage.setItem("token", result.access_token)
    localStorage.setItem("userId", result.user.id)

    window.location.href = "/dashboard.html"
}