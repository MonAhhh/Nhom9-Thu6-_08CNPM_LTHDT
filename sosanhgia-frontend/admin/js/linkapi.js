var token = localStorage.getItem("token");

async function loadAllApi() {
    var url = 'http://localhost:8080/api/public/allApi';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listapi = await response.json();
    var main = '';
    for (i = 0; i < listapi.length; i++) {
        main += '<tr>'+
                    '<td>#'+listapi[i].id+'</td>'+
                    '<td>#'+listapi[i].webName+'</td>'+
                    '<td><img src="'+listapi[i].webAvatar+'" style="width:100px"></td>'+
                    '<td>'+listapi[i].category.name+'</td>'+
                    '<td>'+listapi[i].urlApi+'</td>'+
                    '<td><button onclick="deleteLinkApi('+listapi[i].id+')" class="btn btn-danger"><i class="fa fa-trash"></i> Delete</button></td>'+
                    '<td><a href="addlinkapi.html?id='+listapi[i].id+'" class="btn btn-success"><i class="fa fa-edit"></i> Update</a></td>'+
                    '<td><button onclick="loadDetailApi('+listapi[i].id+')" class="btn btn-success" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-eye"></i> Chi tiết link</button></td>'+
                '</tr>'
    }
    document.getElementById("listapi").innerHTML = main
    $('#example').DataTable();
}

async function loadAnApi() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/findApiById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var api = await response.json();
        document.getElementById("idapi").value = api.id
        document.getElementById("webName").value = api.webName
        document.getElementById("urlApi").value = api.urlApi
        document.getElementById("method").value = api.method
        document.getElementById("listCategory").value = api.category.id
        document.getElementById("bodyadd").value = api.body
        document.getElementById("firstApi").value = api.firstApi
        document.getElementById("priceField").value = api.priceField
        document.getElementById("nameField").value = api.nameField
        document.getElementById("imageField").value = api.imageField
        document.getElementById("firstLinkField").value = api.firstLinkField
        document.getElementById("linkField").value = api.linkField
        document.getElementById("img_avatar").src = api.webAvatar
        linkbanner = api.webAvatar
    }
}

async function loadDetailApi(id) {
    var url = 'http://localhost:8080/api/public/findApiById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var api = await response.json();
    document.getElementById("pt").innerText = api.method
    document.getElementById("bod").innerText = api.body
    document.getElementById("firs").innerText = api.firstApi
    document.getElementById("pri").innerText = api.priceField
    document.getElementById("nas").innerText = api.nameField
    document.getElementById("imgs").innerText = api.imageField
    document.getElementById("links").innerText = api.linkField
}

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
        main += '<option value="'+listcategory[i].id+'">'+listcategory[i].name+' - '+listcategory[i].cateParents.name+'</option>'
    }
    document.getElementById("listCategory").innerHTML = main
    document.getElementById("listCategory").classList.add("selectpicker");
    $('.selectpicker').selectpicker();
}

var linkbanner = ""
async function saveLinkApi() {
    var id = window.location.search.split('=')[1];

    const filePath = document.getElementById('avatar')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload';
    const res = await fetch(urlUpload, { 
        method: 'POST', 
        headers: new Headers({ }),
        body: formData
    });
    if(res.status > 300 && id == null){
        linkbanner = "";
    }
    if(res.status < 300){
        linkbanner = await res.text();
    }


    var webName = document.getElementById("webName").value
    var urlApi = document.getElementById("urlApi").value
    var method = document.getElementById("method").value
    var category = document.getElementById("listCategory").value
    var firstApi = document.getElementById("firstApi").value
    var priceField = document.getElementById("priceField").value
    var nameField = document.getElementById("nameField").value
    var imageField = document.getElementById("imageField").value
    var firstLinkField = document.getElementById("firstLinkField").value
    var linkField = document.getElementById("linkField").value
    var bodys = document.getElementById("bodyadd").value

    var linkapi = {
        "id":id,
        "method":method,
        "body":bodys,
        "webName":webName,
        "webAvatar":linkbanner,
        "urlApi":urlApi,
        "firstApi":firstApi,
        "priceField":priceField,
        "nameField":nameField,
        "imageField":imageField,
        "linkField":linkField,
        "firstLinkField":firstLinkField,
        "category":{
            "id":category
        }
    }

    var url = 'http://localhost:8080/api/admin/addapi';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(linkapi)
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "thêm/ cập nhật api thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace("linkapi.html")
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "thêm/ cập nhật api thành thất bại!", 
            type: "error"
          },
        function(){ 
        });
    }
}


async function deleteLinkApi(id) {
    var url = 'http://localhost:8080/api/admin/deleteapi?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Notification", 
            text: "Delete link api successful!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Notification", 
            text: "Can't delete this api", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}
