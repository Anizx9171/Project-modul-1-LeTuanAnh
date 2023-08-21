let idUser = JSON.parse(localStorage.getItem("idUses")) || []
let dataUser = JSON.parse(localStorage.getItem("dataUser")) || []
let category = JSON.parse(localStorage.getItem("category")) || []
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

let indexUpdateGlobal = null

const inputName = document.getElementById("name")
const inputPrice = document.getElementById("price")

function drawTable(arr) {
    let stringHTML = ""
    arr.forEach(e => stringHTML +=
        `
    <tr>
        <td>${e.name}</td>
        <td colspan="2">${e.description}</td>
        <td>
            <div class="action_col">
                <button class="btn btn_sua" onclick="toggleForm(${e.id})">Edit</button>
                <button class="btn btn_xoa" onclick="deleteProduct(${e.id})">Delete</button>
            </div>
        </td>
    </tr>
    `)
    document.getElementById("table_body").innerHTML = stringHTML
}
drawTable(category)

function toggleForm(id) {
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = category.findIndex(e => e.id == id)
        inputName.value = category[indexUpdate].name
        inputPrice.value = category[indexUpdate].description
        indexUpdateGlobal = indexUpdate
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()

    if (indexUpdateGlobal != null) {
        category[indexUpdateGlobal].name = inputName.value
        category[indexUpdateGlobal].description = inputPrice.value
        indexUpdateGlobal = null
        localStorage.setItem("category", JSON.stringify(category))
        this.reset()
        toggleForm()
        drawTable(category)
        return
    }
    let idR = 1000000 + Math.round(Math.random() * 9888888)
    const newCategory = {
        id: idR,
        name: inputName.value,
        description: inputPrice.value
    }

    category.push(newCategory)
    localStorage.setItem("category", JSON.stringify(category))
    this.reset()
    toggleForm()
    drawTable(category)
})


function deleteProduct(id) {
    const indexDelete = category.findIndex(e => e.id == id)
    if (confirm(`Bạn có thật sự muốn xóa danh mục ${category[indexDelete].name} không?`)) {
        category.splice(indexDelete, 1)
        localStorage.setItem("category", JSON.stringify(category))
        drawTable(category)
    }
}

function search() {
    // lấy chữ từ ô tìm kiếm
    const textSearch = document.getElementById("search_product").value
    // dùng filter lọc ra những đứa có tên mà trong tên có chữ giống với chữ cần tìm bằng includes
    const categorySearch = category.filter(cate => cate.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    // vẽ lại mảng
    drawTable(categorySearch)
}

function arrange() {
    category.sort((a, b) => a.name.localeCompare(b.name))
    drawTable(category)
}

let totalProduct = category.length;
let count = 5;
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
    category.sort((a, b) => b.order_id - a.order_id);
    let productPaginate = category.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    drawTable(productPaginate)
    showPagination()
}
handlePagination();