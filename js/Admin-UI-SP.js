let product = JSON.parse(localStorage.getItem("listproducts")) || []
let idUser = JSON.parse(localStorage.getItem("idUses")) || []
let dataUser = JSON.parse(localStorage.getItem("dataUser")) || []
let indexUpdateGlobal = null

const inputName = document.getElementById("name")
const inputPrice = document.getElementById("price")
const inputCount = document.getElementById("count")
const inputImg = document.getElementById("img")
const description = document.getElementById("description")
function checkSign() {
    if (+idUser > 0) {
        return
    }
    window.location.href = "Sign_in.html"
}

checkSign()

let checkAdmin = dataUser.find(e => e.id == idUser)
if (checkAdmin.Permission == "User") {
    window.location.href = "home_page.html"
}
function drawPL() {
    let category = JSON.parse(localStorage.getItem("category")) || []
    let str = ""
    category.forEach(e => str += `<option value="${e.name}">${e.name}</option>`
    )
    document.getElementById("category").innerHTML = str
}
drawPL()

function drawTable(arr) {
    let stringHTML = ""
    arr.forEach(e => stringHTML +=
        `<tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.description}</td>
        <td>${(e.price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
        <td>${e.quantity}</td>
        <td>
            <img src="image/Product_img/${e.image}" alt="img">
        </td>
        <td>${e.status}</td>
        <td>${e.category}</td>
        <td>
            <div class="action_col">
                <button class="btn btn_sua" onclick="toggleForm(${e.id})">Edit</button>
                <button class="btn btn_xoa" onclick="deleteProduct(${e.id})">Delete</button>
            </div>
        </td>
    </tr>`)
    document.getElementById("table_body").innerHTML = stringHTML
}
drawTable(product)

function toggleForm(id) {
    document.getElementById("form_scope").classList.toggle("hide")

    if (id != undefined) {
        const indexUpdate = product.findIndex(e => e.id == id)
        indexUpdateGlobal = indexUpdate
        inputName.value = product[indexUpdate].name
        inputPrice.value = product[indexUpdate].price
        inputCount.value = product[indexUpdate].quantity
        description.value = product[indexUpdate].description
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    let selectStatus
    let radio = document.getElementsByName("Permission");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked == true) {
            selectStatus = radio[i].value;
        }
    }
    if (indexUpdateGlobal != null) {
        let categoryList = document.getElementById("category")
        let img = inputImg.value
        img = img.split("\\")
        img = img[img.length - 1]
        product[indexUpdateGlobal].image = img
        product[indexUpdateGlobal].name = inputName.value
        product[indexUpdateGlobal].price = inputPrice.value
        product[indexUpdateGlobal].quantity = inputCount.value
        product[indexUpdateGlobal].description = description.value
        product[indexUpdateGlobal].status = selectStatus
        product[indexUpdateGlobal].category = categoryList.value
        localStorage.setItem("listproducts", JSON.stringify(product))
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        drawTable(product)
        return
    }
    let categoryList = document.getElementById("category")
    let idGlobal = 1 + Math.round(Math.random() * 1000000)
    let img = inputImg.value
    img = img.split("\\")
    img = img[img.length - 1]
    const newProduct = {
        id: idGlobal,
        name: inputName.value,
        price: inputPrice.value,
        quantity: inputCount.value,
        image: img,
        description: description.value,
        status: selectStatus,
        category: categoryList.value
    }
    product.push(newProduct)
    localStorage.setItem("listproducts", JSON.stringify(product))
    this.reset()
    toggleForm()
    drawTable(product)
})

function deleteProduct(id) {
    const indexDelete = product.findIndex(e => e.id == id)
    if (confirm(`Bạn thật sự muốn xóa sản phẩm ${product[indexDelete].name} ?`)) {
        product.splice(indexDelete, 1)
        localStorage.setItem("listproducts", JSON.stringify(product))
        drawTable(product)
    }
}

function search() {
    // lấy chữ từ ô tìm kiếm
    const textSearch = document.getElementById("search_product").value
    // dùng filter lọc ra những đứa có tên mà trong tên có chữ giống với chữ cần tìm bằng includes
    const productSearch = product.filter(products => products.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    // vẽ lại mảng
    drawTable(productSearch)
}

document.getElementById("search_product").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        search()
    }
})

function arrange() {
    product.sort((a, b) => a.name.localeCompare(b.name))
    drawTable(product)
}

let totalProduct = product.length;
let count = 4;
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct / count);
// console.log(totalPage);

// đổ ra giao diện
const showPagination = () => {
    let links = "";
    for (let i = 0; i < totalPage; i++) {
        links += `<li class="page-item ${i == pageCurrent ? 'active' : ''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i + 1}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = `${links}`
}

// phần trang  : số trang hiện tại / số phần tử trên 1 trang
const handlePagination = (page = 0) => {
    pageCurrent = page
    product.sort((a, b) => b.order_id - a.order_id);
    let productPaginate = product.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    drawTable(productPaginate)
    showPagination()
}
handlePagination();