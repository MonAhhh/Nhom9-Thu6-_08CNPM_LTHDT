var token = localStorage.getItem("token");

async function loadAllCrawl() {
    var url = 'http://localhost:8080/api/public/allLinkWeb';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listcrawl = await response.json();
    var main = '';
    for (i = 0; i < listcrawl.length; i++) {
        main += '<tr>'+
                    '<td>#'+listcrawl[i].id+'</td>'+
                    '<td>#'+listcrawl[i].webName+'</td>'+
                    '<td><img src="'+listcrawl[i].webImage+'" style="width:100px"></td>'+
                    '<td>'+listcrawl[i].category.name+'</td>'+
                    '<td>'+listcrawl[i].linkSearch+'</td>'+
                    '<td><button onclick="deleteCrawl('+listcrawl[i].id+')" class="btn btn-danger"><i class="fa fa-trash"></i> Delete</button></td>'+
                    '<td><a href="addcrawl.html?id='+listcrawl[i].id+'" class="btn btn-success"><i class="fa fa-edit"></i> Update</a></td>'+
                    '<td><button onclick="loadDetailcrawl('+listcrawl[i].id+')" class="btn btn-success" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-eye"></i> Chi tiết link</button></td>'+
                '</tr>'
    }
    document.getElementById("listcrawl").innerHTML = main
    $('#example').DataTable();
}

async function loadACrawl() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/linkWebById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var crwal = await response.json();
        document.getElementById("idcrawl").value = crwal.id
        document.getElementById("webName").value = crwal.webName
        document.getElementById("urlsearch").value = crwal.linkSearch
        document.getElementById("classMain").value = crwal.classMain
        document.getElementById("classNameLink").value = crwal.classNameLink
        document.getElementById("classNamePrice").value = crwal.classNamePrice
        document.getElementById("classNameProName").value = crwal.classNameProName
        document.getElementById("classNameImage").value = crwal.classNameImage
        document.getElementById("listCategory").value = crwal.category.id
        document.getElementById("firstLinKWeb").value = crwal.firstLinKWeb
        document.getElementById("firstLinkImage").value = crwal.firstLinkImage
        document.getElementById("img_avatar").src = crwal.webImage
        linkbanner = crwal.webImage
    }
}

async function loadDetailcrawl(id) {
    var url = 'http://localhost:8080/api/public/linkWebById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var crawl = await response.json();
    document.getElementById("firs").innerText = crawl.classMain
    document.getElementById("pri").innerText = crawl.classNameLink
    document.getElementById("nas").innerText = crawl.classNamePrice
    document.getElementById("imgs").innerText = crawl.classNameProName
    document.getElementById("links").innerText = crawl.classNameImage
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
async function saveCrawl() {
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
    var linkSearch = document.getElementById("urlsearch").value
    var category = document.getElementById("listCategory").value
    var classMain = document.getElementById("classMain").value
    var classNameLink = document.getElementById("classNameLink").value
    var classNamePrice = document.getElementById("classNamePrice").value
    var classNameProName = document.getElementById("classNameProName").value
    var classNameImage = document.getElementById("classNameImage").value
    var firstLinKWeb = document.getElementById("firstLinKWeb").value
    var firstLinkImage = document.getElementById("firstLinkImage").value

    var crawl = {
        "id":id,
        "linkSearch":linkSearch,
        "webName":webName,
        "classMain":classMain,
        "classNameLink":classNameLink,
        "classNamePrice":classNamePrice,
        "classNameProName":classNameProName,
        "classNameImage":classNameImage,
        "webImage":linkbanner,
        "firstLinKWeb":firstLinKWeb,
        "firstLinkImage":firstLinkImage,
        "category":{
            "id":category
        }
    }

    var url = 'http://localhost:8080/api/admin/addLinkWeb';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(crawl)
    });
    if(response.status < 300){
        swal({
            title: "Notification", 
            text: "thêm/ cập nhật crawl thành công!", 
            type: "success"
          },
        function(){ 
            window.location.replace("crawlweb.html")
        });
    }
    else{
        swal({
            title: "Notification", 
            text: "thêm/ cập nhật crawl thành thất bại!", 
            type: "error"
          },
        function(){ 
        });
    }
}


async function deleteCrawl(id) {
    var url = 'http://localhost:8080/api/admin/deleteLinkWeb?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
            title: "Notification", 
            text: "Delete successful!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Notification", 
            text: "Can't delete this crawl", 
            type: "error"
          },
        function(){ 
            window.location.reload();
        });
    }
}
