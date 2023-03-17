var token = localStorage.getItem("token");
async function loadAllCategory() {
    var url = 'http://localhost:8080/api/public/allCategory';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listcategory = await response.json();
    var main = '';
    for (i = 0; i < listcategory.length; i++) {
        main += '<tr>'+
                    '<td>#'+listcategory[i].id+'</td>'+
                    '<td>'+listcategory[i].name+'</td>'+
                    '<td>'+listcategory[i].cateParents.name+'</td>'+
                    '<td><button onclick="deleteCateparent('+listcategory[i].id+')" class="btn btn-danger"><i class="fa fa-trash"></i> Xóa</button></td>'+
                    '<td><a href="addcategory.html?id='+listcategory[i].id+'" class="btn btn-success"><i class="fa fa-trash"></i> Sửa</a></td>'+
                '</tr>'
    }
    document.getElementById("listcategory").innerHTML = main
    $('#example').DataTable();
}

async function loadAllCateParentAdd() {
    var url = 'http://localhost:8080/api/public/allCateparent';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listcategory = await response.json();
    var main = '';
    for (i = 0; i < listcategory.length; i++) {
        main += '<option value="'+listcategory[i].id+'">'+listcategory[i].name+'</option>'
    }
    document.getElementById("listCatepa").innerHTML = main
}


async function loadACategory() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/categoryById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var category = await response.json();
        document.getElementById("idcategory").value = category.id
        document.getElementById("catename").value = category.name
        document.getElementById("listCatepa").value = category.cateParents.id
        document.getElementById("suggest").value = category.suggest
    }
}

async function saveCategory() {
    var id = window.location.search.split('=')[1];

    var url = 'http://localhost:8080/api/admin/addCategory';
    var tencategory = document.getElementById("catename").value
    var idparent = document.getElementById("listCatepa").value
    var suggest = document.getElementById("suggest").value
    if(tencategory == ""){
        alert("tên danh mục không được để trống");
        return;
    }
    var category = {
            "id":id,
            "name": tencategory,
            "suggest":suggest,
            "cateParents":{
                "id":idparent
            }
        }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(category)
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "thêm/sửa danh mục thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace('category.html')
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "thêm/sửa danh mục thất bại, Tên danh mục đã tồn tại", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}


async function deleteCateparent(id) {
    var url = 'http://localhost:8080/api/admin/deletecateparent?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "xóa danh mục thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "không thể xóa, đã có sản phẩm trong danh mục này", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}
