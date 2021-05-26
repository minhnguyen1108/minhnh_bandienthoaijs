const url = 'http://localhost:3000/products';
const addModelFormProduct = document.querySelector('.form-product');
const editModelFormProduct = document.querySelector('#edit-modal .form-editproduct');
let id = '';

fetch(url)
    .then(res => res.json())
    .then(data => {

        data.forEach(p => {
            renderProduct(p);
        });

    });

const tableProduct = document.querySelector('#show_product');
const renderProduct = (p) => {
    const output = `<tr data-id = '${p.id}' style="text-align: center;">
        <th scope="row">${p.id}</th>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td><img src="../../site/img/${p.img}" width="60px" height="70px"></td>
        <td>
        <button class="btn-edit mb-2 mr-2 btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Sửa</button>
            <button class="btn-del mb-2 mr-2 btn btn-focus">Xóa</button>
        </td>
    </tr>`;
    tableProduct.insertAdjacentHTML('beforeend', output);
    //delete
    const btndel = document.querySelector(`[data-id = '${p.id}'] .btn-del`);
    btndel.addEventListener('click', (e) => {
        fetch(`${url}/${p.id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(() => location.reload());
    });


    //edit
    const btnEdit = document.querySelector(`[data-id = '${p.id}'] .btn-edit`);
    btnEdit.addEventListener('click', (e) => {
        e.preventDefault();
        editModelFormProduct.name.value = p.name;
        editModelFormProduct.price.value = p.price;
        editModelFormProduct.img.value = p.img;
        // console.log(btnEdit);
    });
    //edit sp
    editModelFormProduct.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editModelFormProduct.name.value,
                    price: editModelFormProduct.price.value,
                    img: editModelFormProduct.img.value

                })
            })
            .then(res => res.json())
            .then(() => location.reload())
        editModelFormProduct.name.value = '';
        editModelFormProduct.price.value = '';
        editModelFormProduct.img.value = '';
    })

}

addModelFormProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addModelFormProduct.name.value,
                price: addModelFormProduct.price.value,
                img: addModelFormProduct.img.value
            })
        })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderProduct(dataArr);
        })
    addModelFormProduct.name.value = '';
    addModelFormProduct.price.value = '';
    addModelFormProduct.img.value = '';

})