async function loadBlogHome(){
    var url = 'http://localhost:8080/api/public/bloghomepage';
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += 
        `<div class="col-md-6 singelblog">
            <a href="blogdetail.html?id=${list[i].id}" class="blogname">${list[i].title}</a>
            <div class="contentblog">
                <a href="blogdetail.html?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgblog"></a>
                <p class="desc">
                    <p class="descontent">
                        <a href="blogdetail.html?id=${list[i].id}" class="xemthemblog">Xem thêm </a><span class="ngaydang">(${list[i].createdDate})</span><br>
                        ${list[i].description}</p>.
                    </p>
            </div>
        </div>`
    }
    document.getElementById("listbloghome").innerHTML = main
}

async function loadAllBlog(page){
    var url = 'http://localhost:8080/api/public/allblog?size=6&page='+page;
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var listresult = await response.json(); 
    var list = listresult.content
    var totalpage = listresult.totalPages
    var main = ''
    for(i=0; i<list.length; i++){
        main += 
        `<div class="col-md-6 singelblog">
            <a href="blogdetail.html?id=${list[i].id}" class="blogname">${list[i].title}</a>
            <div class="contentblog">
                <a href="blogdetail.html?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgblog"></a>
                <p class="desc">
                    <p class="descontent">
                        <a href="blogdetail.html?id=${list[i].id}" class="xemthemblog">Xem thêm </a><span class="ngaydang">(${list[i].createdDate})</span><br>
                        ${list[i].description}</p>.
                    </p>
            </div>
        </div>`
    }
    document.getElementById("listallblog").innerHTML = main
    var pg = ''
    for(i=0; i<totalpage; i++){
        var c = i+1
        // pg+= '<a class="page-numbers" onclick="loadAllBlog('+i+')">'+c+'</a>'
        pg += '<li onclick="loadAllBlog('+i+')" class="page-item"><a class="page-link pageabl">'+c+'</a></li>'
    }
    document.getElementById("listpage").innerHTML = pg
}

async function loadAblog() {
    var id = window.location.search.split('=')[1];
    if(id != null){
        var url = 'http://localhost:8080/api/public/getBlogById?id='+id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
            })
        });
        var blog = await response.json();
        console.log(blog)
        document.getElementById("fulnoidung").innerHTML = blog.content
        document.getElementById("ngaydangblog").innerHTML = '<i class="fa fa-calendar"></i> '+blog.createdDate
        document.getElementById("tieudeblog").innerHTML = blog.title
    }
}
