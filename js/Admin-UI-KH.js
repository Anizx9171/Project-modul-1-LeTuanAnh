let idUser = JSON.parse(localStorage.getItem("idUses"))
let dataUser = JSON.parse(localStorage.getItem("dataUser"))
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
const inputCount = document.getElementById("count")
const pass = document.getElementById("pass")

function drawTable(arr) {
    let stringHTML = ""
    arr.forEach(e => stringHTML +=
        `
    <tr>
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.Permission}</td>
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
drawTable(dataUser)

function toggleForm(id) {
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = dataUser.findIndex(e => e.id == id)
        if (dataUser[indexUpdate].name == "Anizx9171") {
            alert("Không được phép sửa admin này")
            document.getElementById("form_scope").classList.toggle("hide")
            return
        }
        indexUpdateGlobal = indexUpdate
        inputName.value = dataUser[indexUpdate].name
        inputPrice.value = dataUser[indexUpdate].email
        pass.value = dataUser[indexUpdate].password
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    let permission
    let radio = document.getElementsByName("Permission");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked === true) {
            permission = radio[i].value;
        }
    }

    if (indexUpdateGlobal != null) {
        dataUser[indexUpdateGlobal].name = inputName.value
        dataUser[indexUpdateGlobal].email = inputPrice.value
        dataUser[indexUpdateGlobal].Permission = permission
        localStorage.setItem("dataUser", JSON.stringify(dataUser))
        indexUpdateGlobal = null

        this.reset()
        toggleForm()
        drawTable(dataUser)
        return
    }


    let idGlobal = 1 + Math.round(Math.random() * 1000000)

    const newUser = {
        id: idGlobal,
        name: inputName.value,
        email: inputPrice.value,
        password: pass.value,
        Permission: permission,
        cart: [],
        checkComfirm: []
    }

    dataUser.push(newUser)
    localStorage.setItem("dataUser", JSON.stringify(dataUser))

    this.reset()
    toggleForm()
    drawTable(dataUser)
})


function deleteProduct(id) {
    const indexDelete = dataUser.findIndex(e => e.id == id)
    if (dataUser[indexDelete].name == "Anizx9171") {
        alert("Không được phép xóa admin này")
        return
    }
    if (confirm(`Bạn có thật sự muốn xóa tài khoản ${dataUser[indexDelete].name} không?`)) {
        dataUser.splice(indexDelete, 1)
        drawTable(dataUser)
        localStorage.setItem("dataUser", JSON.stringify(dataUser))
    }
}

function search() {
    // lấy chữ từ ô tìm kiếm
    const textSearch = document.getElementById("search_product").value
    // dùng filter lọc ra những đứa có tên mà trong tên có chữ giống với chữ cần tìm bằng includes
    const userSearch = dataUser.filter(user => user.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    // vẽ lại mảng
    drawTable(userSearch)
}

function arrange() {
    dataUser.sort((a, b) => a.name.localeCompare(b.name))
    drawTable(dataUser)
}