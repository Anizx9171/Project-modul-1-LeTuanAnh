let idUser = JSON.parse(localStorage.getItem("idUses"))
let dataUser = JSON.parse(localStorage.getItem("dataUser"))
let products = JSON.parse(localStorage.getItem("listproducts"))
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

function detailCommit() {
    window.location.href = "detail_commit.html"
}

// vẽ
function print() {
    let str = ""
    dataUser[locationUser].cart.forEach(element => str += `<tr>
                            <td>${idUser}</td>
                            <td>${element.id}</td>
                            <td>
                                <img width="100px" src="image/Product_img/${element.image}" alt="img">
                            </td>
                            <td>${element.name}</td>
                            <td>${element.description}</td>
                            <td>${element.price}<b>VNĐ</b></td>
                            <td>
                                <button onclick="countDown(${element.id})"> - </button>
                                <span>${element.quantity}</span>
                                <button onclick="countUp(${element.id})"> + </button>
                            </td>
                            <td><span class="total_price">${Number(element.quantity) * Number(element.price)}</span><b>VNĐ</b>
                            </td>
                            <td>
                                <button onclick="removeItem('${element.id}')">Remove</button>
                            </td>
                        </tr>`);
    document.getElementById("table_body").innerHTML = ""
    document.getElementById("table_body").innerHTML = str

    let totalPrice = document.querySelectorAll(".total_price")
    let sum = 0;
    totalPrice.forEach(e => sum += Number(e.innerHTML))
    document.getElementById("total_all").innerHTML = sum

}
print()

function removeItem(id) {
    let idItemRemove = dataUser[locationUser].cart.findIndex(e => id == e.id)
    dataUser[locationUser].cart.splice(idItemRemove, 1)
    localStorage.setItem("dataUser", JSON.stringify(dataUser))
    print()
}

function countDown(id) {
    let count = dataUser[locationUser].cart.findIndex(e => id == e.id)
    if (dataUser[locationUser].cart[count].quantity <= 1) {
        return
    }
    dataUser[locationUser].cart[count].quantity--
    localStorage.setItem("dataUser", JSON.stringify(dataUser))
    print()
}

function countUp(id) {
    let countProducts = products.findIndex(e => id == e.id)
    let count = dataUser[locationUser].cart.findIndex(e => id == e.id)
    if (dataUser[locationUser].cart[count].quantity >= products[countProducts].quantity) {
        return
    }
    dataUser[locationUser].cart[count].quantity++
    localStorage.setItem("dataUser", JSON.stringify(dataUser))
    print()
}

function buyItem() {
    if (document.getElementById("table_body").innerHTML == "") {
        alert("Bạn cần có tối thiểu 1 sản phẩm trong giỏ hàng để thanh toán")
        return
    }
    let idOder = randomId = 1000000 + Math.round(Math.random() * 8999999)
    let order = JSON.parse(localStorage.getItem("order"))
    let newOrder = {
        idoder: idOder,
        iduser: idUser[0],
        oder: dataUser[locationUser].cart,
        acceptance: "a",
    }
    for (const ele of dataUser[locationUser].cart) {
        for (const val of products) {
            if (ele.id == val.id) {
                val.quantity -= ele.quantity
            }
        }
    }
    localStorage.setItem("listproducts", JSON.stringify(products))
    order.push(newOrder)
    localStorage.setItem("order", JSON.stringify(order))
    dataUser[locationUser].checkComfirm.push(newOrder)
    dataUser[locationUser].cart = []
    localStorage.setItem("dataUser", JSON.stringify(dataUser))
    document.querySelector("#confirm_order").style.display = "none"
    print()
    alert("Mua hàng thành công")
    window.location.href = "detail_commit.html"
}