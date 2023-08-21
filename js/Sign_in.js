localStorage.setItem("idUses", JSON.stringify([]))
let user;

// Lấy dữ liệu từ local Storage về để so sánh

document.getElementById("registrationForm").addEventListener("submit", function (event) {

    event.preventDefault(); // Chặn sự kiện mặc định của form

    let dataGet = JSON.parse(localStorage.getItem("dataUser")) || []

    // Lấy thông tin từ các ô input
    let nameUser = document.getElementById("name").value;
    let passwordUser = document.getElementById("password").value;

    //Kiểm tra xem tài khoản có tồn tại trên hệ thống hay không
    let index = dataGet.findIndex(value => nameUser == value.name && value.password == passwordUser)
    if (index > -1 && dataGet[index].Permission === "Admin") {
        let dataIdUser = JSON.parse(localStorage.getItem("idUses"))
        let idUses = dataGet[index].id
        dataIdUser.push(idUses)
        window.location.href = "admin_SP.html"
        localStorage.setItem("idUses", JSON.stringify(dataIdUser))
        return
    }
    else if (index > -1) {
        let dataIdUser = JSON.parse(localStorage.getItem("idUses"))
        let idUses = dataGet[index].id
        dataIdUser.push(idUses)
        window.location.href = "home_page.html";
        localStorage.setItem("idUses", JSON.stringify(dataIdUser))
        return
    }
    document.getElementById("warning").innerHTML = "Sai tên đăng nhập hoặc mật khẩu!"
    //Reset form sau khi submit
    document.getElementById("registrationForm").reset();
});