// localStorage.setItem("dataUser", JSON.stringify([])) //tạo local Storage trong lần đầu vào trang đăng kí
document.getElementById("registrationForm").addEventListener("submit", function (event) {

    event.preventDefault(); // Chặn sự kiện mặc định của form
    let idAuto = 1 + Math.round(Math.random() * 1000000)
    if (!flag) {
        warning.innerHTML = "Vui lòng nhập mật khẩu trùng khớp!"
        return
    }

    // Lấy thông tin từ các ô input
    let nameUser = document.getElementById("name").value;
    let emailUser = document.getElementById("email").value;
    let passwordUser = document.getElementById("password").value;

    const data = JSON.parse(localStorage.getItem("dataUser")) // keo data ve

    // kiem tra xem trong cac user co ai trung email voi ng dang dang ky hay ko
    const emailCheck = data.findIndex(user => user.email == emailUser)
    const nameCheck = data.findIndex(user => user.name == nameUser)

    if (emailCheck != -1) {
        warning.innerHTML = "Gmail đã tồn tại trên hệ thống\!"
        return
    }
    if (nameCheck != -1) {
        warning.innerHTML = "Tên người dùng đã tồn tại trên hệ thống\!"
        return
    }

    data.push({ id: idAuto, name: nameUser, email: emailUser, password: passwordUser, Permission: "User", cart: [], checkComfirm: [] })
    localStorage.setItem("dataUser", JSON.stringify(data)) // đẩy lên


    // Thông báo đăng kí thành công và chuyển hướng người dùng về trang chủ
    alert("Đăng kí tài khoản thành công! Vui lòng đăng nhập để tiếp tục.")

    //Reset form sau khi submit thành công
    document.getElementById("registrationForm").reset();

    //CHuyển hướng đến trang Đăng nhập
    window.location.href = "Sign_in.html";
});

let warning = document.getElementById("warning")
let flag = false
function checkpass() {
    let pass = document.getElementById("password").value
    let passComfirm = document.getElementById("passwordcomfirm").value
    if (pass === passComfirm) {
        warning.innerHTML = ""
        flag = true
        return
    }
    warning.innerHTML = "Mật khẩu không trùng khớp\!"
    flag = false
}