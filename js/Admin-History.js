let order = JSON.parse(localStorage.getItem("order")) || []
let idUser = JSON.parse(localStorage.getItem("idUses")) || []
let dataUser = JSON.parse(localStorage.getItem("dataUser")) || []
let products = JSON.parse(localStorage.getItem("listproducts")) || []
let history = JSON.parse(localStorage.getItem("history")) || []
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

function paint(arr = history) {
    let str = ""
    let stri = ""
    arr.forEach((element) => {
        stri = ""
        for (const value of element.oder) {

            stri += `<li>Mã sản phẩm: <b>${value.id}</b>,
             Tên sản phẩm: <b>${value.name}</b>, 
             số lượng mua: <b>${value.quantity}</b>, 
             giá 1 sản phẩm: <b>${(value.price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>, 
             tổng giá: <b>${(+value.quantity * value.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>,`
        }
        let status = ""
        if (element.acceptance == "b") {
            status = "Đã chấp nhận"
        } else {
            status = "Bị từ chối"
        }
        return str += `<tr>
        <td>#${element.iduser}</td>
                    <td>#${element.idoder}</td>
                    <td colspan="2">
                        <ul>
                            ${stri}
                        </ul>
                    </td>
                    <td><b style="color: brown">${status}</b></td>
                </tr>`
    })
    document.getElementById("table_body").innerHTML = ""
    document.getElementById("table_body").innerHTML = str
}
paint()

let totalProduct = history.length;
let count = 5;
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct / count);


const showPagination = () => {
    let links = "";
    for (let i = 0; i < totalPage; i++) {
        links += `<li class="page-item ${i == pageCurrent ? 'active' : ''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i + 1}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = `${links}`
}


const handlePagination = (page = 0) => {
    pageCurrent = page
    history.sort((a, b) => b.order_id - a.order_id);
    let productPaginate = history.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    paint(productPaginate)
    showPagination()
}
handlePagination();