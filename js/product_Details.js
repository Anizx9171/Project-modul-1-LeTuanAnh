let idUser = JSON.parse(localStorage.getItem("idUses")) || []
let dataUser = JSON.parse(localStorage.getItem("dataUser")) || []
localStorage.setItem("cartItem", JSON.stringify([]))
let productDetails = JSON.parse(localStorage.getItem("productDetails")) || []
localStorage.setItem("cartItem", JSON.stringify([]))
function checkSign() {
    if (+idUser > 0) {
        return
    }
    window.location.href = "Sign_in.html"
}

checkSign()

let locationUser = dataUser.findIndex((element) => element.id == idUser)
document.getElementById("userName").innerHTML = dataUser[locationUser].name

function backHome() {
    window.location.href = "home_page.html"
}

function signOut() {
    let logOut = confirm("Bạn có chắc muốn đăng xuất không?")
    if (logOut === true) {
        window.location.href = "Sign_in.html"
    }
}

let product = JSON.parse(localStorage.getItem("listproducts"))
let index = product.findIndex(e => e.id == productDetails)
function paint() {
    document.getElementById("showDetails").innerHTML = ""
    document.getElementById("showDetails").innerHTML = `<div class="detailsProducts">
                <img src="image/Product_img/${product[index].image}" alt="">
                <div class="nameAndStatus">
                    <h2>${product[index].name}</h2>
                    <h3>Trạng thái: ${product[index].status}</h3>
                </div>
                <p>Giá: <b>${(product[index].price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                <p>Trong kho còn: ${product[index].quantity} Sản phẩm</p>
                <div>
                    <button onclick="addToCart(${product[index].id})">Thêm vào giỏ hàng</button>
                </div>
            </div>
            <div>
                <h2>Mô tả:</h2>
                <p>${product[index].description}</p>
            </div>`
}
paint()
function addToCart(id) {
    let listproducts = JSON.parse(localStorage.getItem("listproducts"))
    let ItemAddToCart = JSON.parse(localStorage.getItem("cartItem"))
    let index = dataUser[locationUser].cart.findIndex((value) => value.id == id)
    let indexProduct = listproducts.findIndex((value) => value.id == id)
    if (listproducts[indexProduct].quantity == 0) {
        listproducts[indexProduct].status = "Không bán"
        localStorage.setItem("listproducts", JSON.stringify(listproducts))
        paint()
    }
    if (listproducts[indexProduct].status == "Không bán") {
        alert("Sản phẩm chưa được mở bán")
        return
    }
    if (index == -1) {
        listproducts[indexProduct].quantity = 1
        ItemAddToCart.push(listproducts[indexProduct])
        dataUser[locationUser].cart.push(listproducts[indexProduct])
        localStorage.setItem("dataUser", JSON.stringify(dataUser))
        localStorage.setItem("cartItem", JSON.stringify(ItemAddToCart))
        alert("Đã thêm sản phẩm vào giỏ hàng")
    } else {
        alert("Sản phẩm đã tồn tại trong giỏ hàng")
    }
}