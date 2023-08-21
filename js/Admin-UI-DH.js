let oder = JSON.parse(localStorage.getItem("order"))
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



let locationUser = dataUser.findIndex((element) => element.id == idUser)

function paint() {
    let str = ""
    let stri = ""
    oder.forEach((element) => {
        stri = ""
        for (const value of element.oder) {
            stri += `<li>Mã sản phẩm: <b>${value.id}</b>,
             Tên sản phẩm: <b>${value.name}</b>, 
             số lượng mua: <b>${value.quantity}</b>, 
             giá 1 sản phẩm: <b>${value.price}đ</b>, 
             tổng giá: <b>${+value.quantity * value.price}đ</b>,`
        }
        return str += `<tr>
                    <td>#${element.idoder}</td>
                    <td>${element.iduser}</td>
                    <td colspan="2">
                        <ul>
                            ${stri}
                        </ul>
                    </td>
                    <td>
                        <div class="action_col">
                            <button class="btn btn_them" onclick="accept(${element.idoder}, ${element.iduser})">Chấp nhận</button>
                            <button class="btn btn_xoa" onclick="deny(${element.idoder}, ${element.iduser})">Hủy</button>
                        </div>
                    </td>
                </tr>`
    })
    document.getElementById("table_body").innerHTML = ""
    document.getElementById("table_body").innerHTML = str
}
paint()

function accept(id, idU) {
    let index = oder.findIndex(e => e.idoder == id)
    let indexU = dataUser.findIndex(e => e.id == idU)
    let indexComfirm = dataUser[indexU].checkComfirm.findIndex(e => e.idoder == id)
    dataUser[indexU].checkComfirm[indexComfirm].acceptance = "b"

    oder.splice(index, 1)
    localStorage.setItem("order", JSON.stringify(oder))
    localStorage.setItem("dataUser", JSON.stringify(dataUser))
    paint()
}

function deny(id, idU) {
    if (confirm("Bạn muốn xóa yêu cầu mua hàng này?")) {
        let index = oder.findIndex(e => e.idoder == id)
        let indexU = dataUser.findIndex(e => e.id == idU)
        let indexComfirm = dataUser[indexU].checkComfirm.findIndex(e => e.idoder == id)
        dataUser[indexU].checkComfirm[indexComfirm].acceptance = "c"

        oder.splice(index, 1)
        localStorage.setItem("order", JSON.stringify(oder))
        localStorage.setItem("dataUser", JSON.stringify(dataUser))
        paint()
    }
}