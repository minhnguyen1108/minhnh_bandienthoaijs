var keyLocalStorageCart = 'danhSachItemCart';

function createItemCart(idSanPham, soLuong, name, img, price, total) {
    var itemCart = new Object()
    itemCart.idSanPham = idSanPham;
    itemCart.soLuong = soLuong;
    itemCart.name = name;
    itemCart.img = img;
    itemCart.price = price;
    itemCart.total = total;
    return itemCart;
}

//lay toan bo trong lcst

function getListCart() {
    var getItemCart = new Array()
    var jsonListCart = localStorage.getItem(keyLocalStorageCart);
    if (jsonListCart != null)
        getItemCart = JSON.parse(jsonListCart);
    return getItemCart;
}
//luu vao lcst
function saveLocalStorage(listItemCart) {
    var jsonItemCart = JSON.stringify(listItemCart);
    localStorage.setItem(keyLocalStorageCart, jsonItemCart);
}