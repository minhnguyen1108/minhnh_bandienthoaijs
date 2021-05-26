// var keyLocalStorageProduct = 'danhSachSanPham';

// function createItemProduct(idSanPham, name, img, price) {
//     var itemProduct = new Object()
//     itemProduct.idSanPham = idSanPham;
//     itemProduct.name = name;
//     itemProduct.img = img;
//     itemProduct.price = price;
//     return itemProduct;
// }

// //lay toan bo trong lcst

// function getListProduct() {
//     var getItemProduct = new Array()
//     var jsonListProduct = localStorage.getItem(keyLocalStorageProduct);
//     if (jsonListProduct != null)
//         getItemProduct = JSON.parse(jsonListProduct);
//     return getItemProduct;
// }
// //luu vao lcst
// function saveLocalStorageProduct(listItemProduct) {
//     var jsonItemProduct = JSON.stringify(listItemProduct);
//     localStorage.setItem(keyLocalStorageProduct, jsonItemProduct);
// }

function getProduct(idSanPham) {
    var product = new Object();
    var listProduct = getListLocalStorage();
    for (var i = 0; i < listProduct.length; i++) {
        var productCur = listProduct[i];
        if (productCur.id == idSanPham) {
            product = productCur;
        }

    }
    product = createItemCart(product.img, product.name, product.price);
    return product;
}

function getListLocalStorage() {
    var jsonListProduct = localStorage.getItem('danhSachItemCart');
    var listProduct = JSON.parse(jsonListProduct);
    console.log(listProduct);
    return listProduct;

}