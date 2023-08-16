let order = JSON.parse(localStorage.getItem("order"))
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

let locationUser = dataUser.findIndex((element) => element.id == idUser)
document.getElementById("userName").innerHTML = dataUser[locationUser].name

function paint() {
    let str = ""
    let stri = ""
    dataUser[locationUser].checkComfirm.forEach((element) => {
        stri = ""
        for (const value of element.oder) {

            stri += `<li>Mã sản phẩm: ${value.id}, Tên sản phẩm: ${value.name}, số lượng mua: ${value.quantity}</li>`
        }
        let status = ""
        if (element.acceptance == "a") {
            status = "Chưa xác thực"
        } else if (element.acceptance == "b") {
            status = "Đã xác thực"
        } else {
            status = "Đã bị hủy"
        }
        return str += `<tr>
                    <td>${element.idoder}</td>
                    <td colspan="2">
                        <ul>
                            ${stri}
                        </ul>
                    </td>
                    <td>${status}</td>
                    <td>
                        <button class="btn" onclick="deleteOder(${element.idoder})">Xóa</button>
                    </td>
                </tr>`
    })
    document.getElementById("table_body").innerHTML = ""
    document.getElementById("table_body").innerHTML = str
}
paint()

function deleteOder(id) {
    let check = confirm("Bạn muốn hủy đơn hàng này?")
    if (check) {
        let index = dataUser[locationUser].checkComfirm.findIndex(e => e.idoder == id)
        let oderIndex = order.findIndex(e => e.idoder == id)
        for (const ele of dataUser[locationUser].checkComfirm[index].oder) {
            for (const val of products) {
                if (ele.id == val.id) {
                    val.quantity += ele.quantity
                }
            }
        }
        localStorage.setItem("listproducts", JSON.stringify(products))
        order.splice(oderIndex, 1)
        dataUser[locationUser].checkComfirm.splice(index, 1)
        localStorage.setItem("dataUser", JSON.stringify(dataUser))
        localStorage.setItem("order", JSON.stringify(order))
        paint()
    }
}