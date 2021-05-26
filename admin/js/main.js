const url = 'http://localhost:3000/nsx';
const url1 = 'http://localhost:3000/products';
const addModelForm = document.querySelector('.form-nsx');
const addModelFormProduct = document.querySelector('.form-product');
const editModelForm = document.querySelector('#edit-modal .form-editnsx');
const editModelFormProduct = document.querySelector('#edit-modals .form-editproduct');
let id = '';

//show nsx

fetch(url)
    .then(res => res.json())
    .then(data => {

        data.forEach(nsx => {
            renderNsx(nsx);
        });

    });

fetch(url1)
    .then(res => res.json())
    .then(data => {

        data.forEach(p => {
            renderProduct(p);
        });

    });

const tableNsx = document.querySelector('#table_show');
const tableProduct = document.querySelector('#show_product');
const renderNsx = (nsx) => {
    const output = `<tr data-id = '${nsx.id}'>
    <th scope="row">${nsx.id}</th>
    <td>${nsx.name}</td>
    <td>
    <button class="btn-edit mb-2 mr-2 btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Sửa</button>
        <button class="btn-del mb-2 mr-2 btn btn-focus">Xóa</button>
    </td>
</tr>`;
    tableNsx.insertAdjacentHTML('beforeend', output);
    //delete
    const btndel = document.querySelector(`[data-id = '${nsx.id}'] .btn-del`);
    btndel.addEventListener('click', (e) => {
        fetch(`${url}/${nsx.id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(() => location.reload());
    });


    //edit
    const btnEdit = document.querySelector(`[data-id = '${nsx.id}'] .btn-edit`);
    btnEdit.addEventListener('click', (e) => {
        e.preventDefault();
        id = nsx.id;
        editModelForm.id.value = nsx.id;
        editModelForm.name.value = nsx.name;
        // console.log(btnEdit);
    });
    //edit


    editModelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editModelForm.name.value
                })
            })
            .then(res => res.json())
            .then(() => location.reload())
        editModelForm.name.value = '';
    })

}

const renderProduct = (p) => {
    const output = `<tr data-id = '${p.id}' style="text-align: center;">
    <th scope="row">${p.id}</th>
    <td>${p.name}</td>
    <td>${p.price}</td>
    <td><img src="../../site/img/${p.img}" width="60px" height="70px"></td>
    <td>
    <button class="btn-edit-p mb-2 mr-2 btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Sửa</button>
        <button class="btn-del-p mb-2 mr-2 btn btn-focus">Xóa</button>
    </td>
</tr>`;
    tableProduct.insertAdjacentHTML('beforeend', output);
    //delete
    const btndelp = document.querySelector(`[data-id = '${p.id}'] .btn-del-p`);

    btndelp.addEventListener('click', (e) => {
        fetch(`${url}/${p.id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(() => location.reload());
    });
    console.log(btndelp)


    // //edit
    // const btnEditp = document.querySelector(`[data-id = '${p.id}'] .btn-edit-p`);
    // btnEditp.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     editModelFormProduct.name.value = p.name;
    //     editModelFormProduct.price.value = p.price;
    //     editModelFormProduct.img.value = p.img;
    //     // console.log(btnEdit);
    // });

    // //edit sp
    // editModelFormProduct.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     fetch(`${url1}/${id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: editModelFormProduct.name.value,
    //                 price: editModelFormProduct.price.value,
    //                 img: editModelFormProduct.img.value

    //             })
    //         })
    //         .then(res => res.json())
    //         .then(() => location.reload())
    //     editModelFormProduct.name.value = '';
    //     editModelFormProduct.price.value = '';
    //     editModelFormProduct.img.value = '';
    // })

}



// $('.form-nsx-sub').click(function(e) {
//     e.preventDefault();
//     alert('111');
//     fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: addModelForm.name.value
//             })
//         })
//         .then(res => res.json())

//     .then(data => {
//         const dataArr = [];
//         dataArr.push(data);
//         renderNsx(dataArr);
//         console.log(data);
//     })

//     addModelForm.name.value = '';
// });
//add sp
// addModelFormProduct.addEventListener('submit', (e) => {
//     e.preventDefault();
//     fetch(url1, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: addModelFormProduct.name.value,
//                 price: addModelFormProduct.price.value,
//                 img: addModelFormProduct.img.value
//             })
//         })
//         .then(res => res.json())
//         .then(data => {
//             const dataArr = [];
//             dataArr.push(data);
//             renderProduct(dataArr);
//         })
//     addModelFormProduct.name.value = '';
//     addModelFormProduct.price.value = '';
//     addModelFormProduct.img.value = '';

// })

//add nsx
addModelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addModelForm.name.value
            })
        })
        .then(res => res.json())

    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderNsx(dataArr);
        console.log(data);
    })

    addModelForm.name.value = '';

})