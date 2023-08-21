localStorage.setItem("productDetails", JSON.stringify([])) || []
localStorage.setItem("idUses", JSON.stringify([])) || []
let product = JSON.parse(localStorage.getItem("listproducts")) || []

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
                    <p>${(value.price * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
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
    alert("Vui lòng đăng nhập trước khi mua hàng!")
}
function detailCommit() {
    alert("Bạn chưa đăng nhập!")
}
function productDetails() {
    alert("Bạn cần đăng nhập trước!")
}

function categoryPaintBTN() {
    let category = JSON.parse(localStorage.getItem("category")) || []
    let str = `<button onclick="print(product)">All</button>`
    category.forEach(e => str += `<button onclick="categoryPaint(${e.id})">${e.name}</button>`)
    document.getElementById("category_button").innerHTML = str
}
categoryPaintBTN()

function categoryPaint(id) {
    let category = JSON.parse(localStorage.getItem("category")) || []
    let categoryE = category.find(e => e.id == id)
    let productCategory = product.filter(e => e.category.toLowerCase() == categoryE.name.toLowerCase())
    print(productCategory)
}