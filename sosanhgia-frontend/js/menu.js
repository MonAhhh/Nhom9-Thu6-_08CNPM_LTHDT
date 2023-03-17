async function loadmenu(){
    var menu = 
    `<div class="container conmenu">
        <div class="contentmenu">
            <a href="index.html" class="nameweb">SOSANHGIA.COM</a>
            <button class="btncate" data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-bars"></i></button>
            <p class="allcate" data-toggle="modal" data-target=".bd-example-modal-lg">Tất cả <br>danh mục</p>
            <div class="inputsearch">
                <form method="get" action="product.html" id="formsearch">
                    <input name="search" class="input_search" placeholder="Tìm kiếm sản phẩm" >
                    <button class="btnsearch"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>
    </div>`
    document.getElementById("menu").innerHTML = menu

    var url = 'http://localhost:8080/api/public/allCateparent';
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers({
      })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += '<li onclick="loaddmcon('+list[i].id+')"><p class="catename">'+list[i].name+'</p></li>'
    }
    document.getElementById("listcategory").innerHTML = main
    loaddmFullcon();
}

async function loaddmFullcon(){
    var url = 'http://localhost:8080/api/public/allCategory'
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += '<li><a href="product.html?id='+list[i].id+'" class="catename">'+list[i].name+'</a></li>'
    }
    document.getElementById("listccon").innerHTML = main
}

async function loaddmcon(id){
    var url = 'http://localhost:8080/api/public/findCategoryByParent?id='+id;
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var list = await response.json();
    var main = ''
    for(i=0; i<list.length; i++){
        main += '<li><a href="product.html?id='+list[i].id+'" class="catename">'+list[i].name+'</a></li>'
    }
    document.getElementById("listccon").innerHTML = main
}

function loadFooter(){
    main = '<div class="container"><hr>'+
        '<footer class="text-center text-lg-start text-muted">'+
        '<section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">'+
        '</section>'+
        '<section class="">'+
        '<div class=" text-center text-md-start mt-5">'+
        '<div class="row mt-3">'+
        '<div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">'+
        '<h6 class="text-uppercase fw-bold mb-4"><i class="fas fa-gem me-3"></i>SOSANHGIA.COM</h6>'+
        '<p>'+
        'Chúng tôi cung cấp dịch vụ so sánh giá sản phẩm miễn phí, giúp mọi người tìm kiếm giá chính xác'+
        '</p>'+
        '</div>'+
        '<div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">'+
        '<h6 class="text-uppercase fw-bold mb-4">Không chỉ so sánh giá</h6>'+
        '<p><a class="text-reset">Nếu như giá cả vẫn chưa đủ để bạn quyết định mua hàng thì thông tin khuyến mãi, mã giảm giá, quà tặng kèm khi mua hàng tại từng nơi bán sẽ giúp bạn lựa chọn dễ dàng hơn.</a></p>'+
        '</div>'+
        '<div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">'+
        '<h6 class="text-uppercase fw-bold mb-4">Liên hệ</h6>'+
        '<p><i class="fas fa-home me-3"></i> Hà nội, Việt Nam</p>'+
        '<p><i class="fas fa-envelope me-3"></i> shop@gmail.com</p>'+
        '<p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>'+
        '<p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</section>'+
        '</footer>'+
        '</div>'
    document.getElementById("footer").innerHTML = main
}

