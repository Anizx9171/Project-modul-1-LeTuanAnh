let idUser = JSON.parse(localStorage.getItem("idUses"))
let dataUser = JSON.parse(localStorage.getItem("dataUser"))
localStorage.setItem("cartItem", JSON.stringify([]))
localStorage.setItem("productDetails", JSON.stringify([]))

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
    if (confirm("Bạn có chắc muốn đăng xuất không?")) {
        window.location.href = "home_page_unSign.html"
    }
}

let product = JSON.parse(localStorage.getItem("listproducts"))

//function in sản phẩm
function print(arr) {
    let str = ""
    arr.forEach((value) => {
        return str += `<div class="Products_item">
                <div class="text_Shopping">
                    <button onclick="addToCart(${value.id})">Thêm vào giỏ hàng</button>
                    <div>
                        <p onclick="productDetails(${value.id})"><img src="image/icon_hover/gridicons_share.png">Chi tiết</p>
                    </div>
                </div>
                <img src="image/Product_img/${value.image}" alt="${value.name}" height="300">
                <div class="Products_label">
                    <h2>${value.name}</h2>
                    <span>${value.description}</span>
                    <p>${value.price} vnđ</p>
                </div>
            </div>`
    })
    document.getElementById("Products").innerHTML = ""
    document.getElementById("Products").innerHTML = str
}

// in sản phẩm lần đầu
print(product)

//slice

let listImageUrl = ["image/Slice/Rectangle 32-1.png", "image/Slice/Rectangle 32-2.png", "image/Slice/Rectangle 32.png"]
let index = 0;

function showSlider() {
    let firstImage = listImageUrl[index];
    // lấy ra thẻ img chính
    let mainImage = document.getElementById("main-image");
    mainImage.src = firstImage;
}

showSlider();

// chức năng next ảnh 
function changeNextImage() {
    if (index == listImageUrl.length - 1) {
        index = 0;
    } else {
        index++;
    }
    showSlider();
}

// chức năng lùi ảnh
function changePrevImage() {
    if (index == 0) {
        index = listImageUrl.length - 1;
    } else {
        index--
    }
    showSlider();
}

// trượt mỗi ảnh sau 6s 
let id = setInterval(changeNextImage, 6000);

// kết thúc slice

//tìm kiềm sản phẩm
function search() {
    // lấy chữ từ ô tìm kiếm
    const textSearch = document.getElementById("search_product").value
    // dùng filter lọc ra những đứa có tên mà trong tên có chữ giống với chữ cần tìm bằng includes
    const productSearch = product.filter(products => products.name.toLowerCase().includes(textSearch.trim().toLowerCase()))
    // vẽ lại mảng
    print(productSearch)
    document.location.href = "#product_alert"
}

document.getElementById("search_product").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        search()
    }
})

function addToCart(id) {
    let listproducts = JSON.parse(localStorage.getItem("listproducts"))
    let ItemAddToCart = JSON.parse(localStorage.getItem("cartItem"))
    let index = dataUser[locationUser].cart.findIndex((value) => value.id == id)
    let indexProduct = listproducts.findIndex((value) => value.id == id)
    if (listproducts[indexProduct].quantity == 0) {
        listproducts[indexProduct].status = "Không bán"
        localStorage.setItem("listproducts", JSON.stringify(listproducts))
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
function detailCommit() {
    window.location.href = "detail_commit.html"
}
function productDetails(id) {
    window.location.href = "product_Details.html"
    let detalItem = JSON.parse(localStorage.getItem("productDetails"))
    detalItem.push(id)
    localStorage.setItem("productDetails", JSON.stringify(detalItem))
}
