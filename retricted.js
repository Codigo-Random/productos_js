const token = localStorage.getItem("token")
const userId = localStorage.getItem("userId")

if(!token || !userId) {
    window.location.href = "/index.html"
}
