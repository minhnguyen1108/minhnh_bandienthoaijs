const url = 'http://localhost:3000/products';
const url1 = 'http://localhost:3000/orders';
const addModelFormOrder = document.querySelector('.form-order');
let i = 0;
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(pSale => {
            if (i < 6) {
                renderpSale(pSale);
                i++;
            }
        });
    });
fetch(url + '?_start=6&_end=12')
    .then(res => res.json())
    .then(data => {
        data.forEach(pSale => {
            renderpHot(pSale);

        });
    });

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(pSale => {
            if (i < 6) {
                renderpList(pSale);
                i++;
            }
        });
    });
const prSale = document.querySelector('#show_pSale');
const prHot = document.querySelector('#show_pHot');
const prList = document.querySelector('#show_list');

function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
const renderpSale = (pSale) => {
    const output = `<div  class=" col-lg-2 col-sm-4 product " data-id='${pSale.id}'  style="text-align: center;">
                        <div class="product__img-holder">
                            <a href="single-product.html"  class="detail product__link" aria-label="Product">
                                <img src="img/${pSale.img}" alt="" class="product__img">
                            </a>
                            <div class="product__actions">
                                <a href="quickview.html" class="product__quickview">
                                    <i class="ui-eye"></i>
                                    <span>Chi tiết</span>
                                </a>
                                <a href="#" class="product__add-to-wishlist">
                                    <i class="ui-heart"></i>
                                    <span>Yêu thích</span>
                                </a>
                            </div>
                        </div>

                        <div class="product__details">
                            <h3 class="product__title">
                                <a href="single-product.html">${pSale.name}</a>
                            </h3>
                        </div>

                        <span class="product__price" >
                        <ins >
                        <span class="amount" >${formatCash(pSale.price)} VND</span>
                        </ins>

                        </span>
        </div>`;
    prSale.insertAdjacentHTML('beforeend', output);

}
const renderpHot = (pSale) => {
    const output = `<div class="col-lg-2 col-sm-4 product">
                    <div class="product__img-holder">
                        <a href="single-product.html" class="product__link" aria-label="Product">
                            <img src="img/${pSale.img}" alt="" class="product__img">
                        </a>
                        <div class="product__actions">
                            <a href="quickview.html" class="product__quickview">
                                <i class="ui-eye"></i>
                                <span>Chi tiết</span>
                            </a>
                            <a href="#" class="product__add-to-wishlist">
                                <i class="ui-heart"></i>
                                <span>Yêu thích</span>
                            </a>
                        </div>
                    </div>

                    <div class="product__details">
                        <h3 class="product__title">
                            <a href="single-product.html">${pSale.name}</a>
                        </h3>
                    </div>

                    <span class="product__price">
            <ins>
            <span class="amount">${formatCash(pSale.price)}  VND</span>
                    </ins>

                    </span>
                </div>`;

    prHot.insertAdjacentHTML('beforeend', output);
}
const renderpList = (pSale) => {
    const output = `<div class="col-md-4 col-sm-6 product" style="text-align: center;">
                        <div class="product__img-holder">
                            <a href="single-product.html" class="product__link">
                                <img src="img/${pSale.img}" alt="" class="product__img">
                            </a>
                            <div class="product__actions">
                                <a href="#" class="product__quickview">
                                    <i class="ui-eye"></i>
                                    <span>Quick View</span>
                                </a>
                                <a href="#" class="product__add-to-wishlist">
                                    <i class="ui-heart"></i>
                                    <span>Wishlist</span>
                                </a>
                            </div>
                        </div>

                        <div class="product__details">
                            <h3 class="product__title">
                                <a href="single-product.html">${pSale.name}</a>
                            </h3>
                        </div>

                        <span class="product__price">
                        <ins>
                        <span class="amount">${formatCash(pSale.price)} VND</span>
                            </ins>
                            </span>
                            <a href="cart.html" class="btn btn-md btn-color product-single__add-to-cart" >
                                    <i class="ui-bag"></i>
                                    
                                    <span onclick="themvaogiohang(${pSale.id});"> Thêm vào giỏ hàng</span>
                                    </a>
                    </div>`;

    prList.insertAdjacentHTML('beforeend', output);

}

// thay k

//cart
function themvaogiohang(idSanPham) {
    console.log(idSanPham);
    var listItemCart = getListCart();
    var sanpham = getspbyid(idSanPham);

    var checkItem = false;
    for (var i = 0; i < listItemCart.length; i++) {
        var itemCartCur = listItemCart[i];
        if (itemCartCur.idSanPham == idSanPham) {
            qty = listItemCart[i].soLuong++;
            total = sanpham.price * qty;
            checkItem = true;
        }
    }
    if (checkItem == false) {
        var itemCart = createItemCart(idSanPham, 1, sanpham.name, sanpham.img, sanpham.price, sanpham.price);
        listItemCart.push(itemCart);
    }
    saveLocalStorage(listItemCart);

}

function qtyr(idSanPham) {
    var listItemCart = getListCart();
    var sanpham = getspbyid(idSanPham);
    var qty = 1;
    var checkItem = false;

    for (var i = 0; i < listItemCart.length; i++) {
        var itemCartCur = listItemCart[i];
        let fmprice = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(listItemCart[i].total);
        if (itemCartCur.idSanPham == idSanPham) {
            qty += listItemCart[i].soLuong++;
            listItemCart[i].total = sanpham.price * qty;
            $("[data-id-total=" + idSanPham + "]").html(fmprice + ' VND');
            checkItem = true;
        }
    }
    saveLocalStorage(listItemCart);
    location.reload()
        // node.innerText = html;
}

function qtyl(idSanPham) {
    var listItemCart = getListCart();
    var sanpham = getspbyid(idSanPham);
    var qty = 1;
    var checkItem = false;

    for (var i = 0; i < listItemCart.length; i++) {
        var itemCartCur = listItemCart[i];
        let fmprice = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(listItemCart[i].total);
        if (itemCartCur.idSanPham == idSanPham) {
            qty -= listItemCart[i].soLuong--;
            listItemCart[i].total = sanpham.price * qty;
            $("[data-id-total=" + idSanPham + "]").html(fmprice + ' VND');
            checkItem = true;
        }
    }
    saveLocalStorage(listItemCart);
    location.reload()
        // node.innerText = html;
}
showCart();

function showCart() {
    var listItemCart = getListCart();
    var html = changeListCartHtml(listItemCart);
    var nodeCart = document.getElementById('show_cart');
    // console.log(html);
    nodeCart.innerHTML = html;
}

function changeListCartHtml(listItemCart) {
    var htmlTong = '';
    for (var i = 0; i < listItemCart.length; i++) {
        htmlTong = htmlTong + changeHtml(listItemCart[i]);
    }
    return htmlTong;
}

function removeItems(id) {
    localStorage.removeItem("danhSachItemCart");
    location.reload();
}


function changeHtml(itemCart) {
    var product = getspbyid(itemCart.idSanPham);
    let fmprice = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(product.price * parseFloat(itemCart.soLuong));
    var html = '<tr data-id = ' + product.id + ' class="cart_item">\n' +
        '                                <td class="product-thumbnail">\n' +
        '                                    <a href="#">\n' +
        '                                        <img src="img/' + product.img + '" alt="">\n' +
        '                                    </a>\n' +
        '                                </td>\n' +
        '                                <td class="product-name">\n' +
        '                                    <a href="#">' + product.name + '</a>\n' +
        '                                </td>\n' +
        '                                <td class="product-price">\n' +
        '                                    <span class="amount">' + formatCash(product.price) + ' VND</span>\n' +
        '                                </td>\n' +
        '                                <td class="product-quantity">\n' +
        '                                    <div class="quantity buttons_added">\n' +
        '                                        <input type="button" onclick="qtyl(' + product.id + ');"  value="-" class="minus">\n' +
        '                                        <input type="number" step="1" min="0" value="' + itemCart.soLuong + '" title="Qty" id="qty" class="input-text qty text">\n' +
        '                                        <input type="button" onclick="qtyr(' + product.id + ');" value="+" class="plus">\n' +
        '                                    </div>\n' +
        '                                </td>\n' +
        '                                <td class="product-subtotal" id="total">\n' +
        '                                    <span class="amount" data-id-total="' + product.id + '">' + fmprice + ' VND</span>' +
        '                                </td>\n' +
        '                                <td class="product-remove ">\n' +
        '                                    <a href="#" class="remove" onclick="removeItems(' + product.id + ');" title="Remove this item " >\n' +
        '                                        <i class="ui-close"></i>\n' +
        '                                    </a>\n' +
        '                                </td>\n' +
        '                            </tr>';
    return html;
}
showTotal();

function showTotal() {
    var listItemCart = getListCart();
    var html = changeListTotalHtml(listItemCart);
    var nodeCart = document.getElementById('show_total');
    // console.log(html);
    nodeCart.innerHTML = html;
}

function changeListTotalHtml(listItemCart) {
    var htmlTong = '';
    htmlTong = htmlTong + changeHtmlTotal(listItemCart);

    return htmlTong;
}



function changeHtmlTotal() {
    var listItemCart = getListCart();
    var totalProduct = 0;
    for (let i = 0; i < listItemCart.length; i++) {
        totalProduct += Math.abs(listItemCart[i].total);

    }
    let fmprice = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(totalProduct);
    var html = '<tr class="cart-subtotal">\n' +
        '                                        <th>Tổng tiền</th>\n' +
        '                                        <td>\n' +
        '                                            <span class="amount">' + fmprice + ' VND</span>\n' +
        '                                        </td>\n' +
        '                                    </tr>\n' +
        '                                    <tr class="shipping">\n' +
        '                                        <th>Giao hàng</th>\n' +
        '                                        <td>\n' +
        '                                            <span>Miễn phí</span>\n' +
        '                                        </td>\n' +
        '                                    </tr>\n' +
        '                                    <tr class="order-total">\n' +
        '                                        <th>Tổng hóa đơn</th>\n' +
        '                                        <td>\n' +
        '                                            <strong><span class="amount" >' + fmprice + ' VND</span></strong>\n' +
        '                                        </td>\n' +
        '                                    </tr>';
    return html;

}


addModelFormOrder.addEventListener('submit', (e) => {
    alert('Đặt hàng thành công');
    e.preventDefault();
    fetch(url1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ten: addModelFormOrder.ten.value,
                sdt: addModelFormOrder.sdt.value,
                diachi: addModelFormOrder.diachi.value
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderOrder(dataArr);
        })
    addModelFormOrder.name.value = '';
    addModelFormOrder.sdt.value = '';
    addModelFormOrder.diachi.value = '';

})





function getspbyid(id) {
    var data = $.ajax({
        async: false,
        url: url + '/' + id,
        method: "GET",
        responseType: "json",
        success: function(repon) {
            return repon;
        }
    })
    return data.responseJSON;
}