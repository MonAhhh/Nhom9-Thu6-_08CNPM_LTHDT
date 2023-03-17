const totalProduct = []
function loc(){
    document.getElementById("listallproduct").innerHTML = ''
    var tanggiam =  document.getElementById("selectgia").value
    if(tanggiam == '1'){
        totalProduct.sort(compareTang);
    }
    else if(tanggiam == '2'){
        totalProduct.sort(compareGiam);
    }
    var mains = ''
    for(i=0; i<totalProduct.length;i++){
        mains += 
        `<a id="p16533779" class="grid__product-cell" href="${totalProduct[i].link}">
            <div class="grid__product-img">
                <img width="200" height="200" data-src="${totalProduct[i].image}" class=" lazyloaded" alt="iPhone 12 128GB" onerror="javascript:this.src='${totalProduct[i].image}'" src="${totalProduct[i].image}">
            </div>
            <button class="btn-product">${totalProduct[i].web}</button>
            <div class="grid__product-name">${totalProduct[i].name}</div>
            <div class="grid__product-price product-price">${formatmoney(totalProduct[i].price)}</div>
        </a>`
    }
    document.getElementById("listallproduct").innerHTML += mains
}

function compareTang( a, b ) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
}

function compareGiam( a, b ) {
    if ( a.price > b.price ){
      return -1;
    }
    if ( a.price < b.price ){
      return 1;
    }
    return 0;
}

async function loadByApiSearchGet(){
    var search = window.location.search.split('search=')[1];
    var idcate = window.location.search.split('id=')[1];
    if(search == null){
        search = ""
    }
    if(search != ""){
        search =  decodeURI(search)
    }
    var url = 'http://localhost:8080/api/public/findApiAscGet';
    if(idcate != null){
        var url = 'http://localhost:8080/api/public/findApiAscGet?id='+idcate;
    }
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var list = await response.json();
    for(i=0; i<list.length; i++){
        var listproduct = null;
        var first = list[i].firstApi
        var linkField = list[i].linkField
        var imageField = list[i].imageField
        var nameField = list[i].nameField
        var priceField = list[i].priceField
        var webName = list[i].webName
        var linkapi = list[i].urlApi
        var method = list[i].method
        if(method == 'GET'){
            linkapi = linkapi.replace('???',search)
            console.log(linkapi)
            const res = await fetch(linkapi, {method: 'GET',
                headers: new Headers({ 
                })
            });
            var listpro = await res.json();
            
            var arr = first.split(".");
            listproduct = listpro[arr[0]]
            if(arr.length  > 1){
                for(k=1; k <arr.length; k++){
                    listproduct = listproduct[arr[k]]
                }
            }
            console.log(listproduct)
            var mains = ''
            for(j=0; j< listproduct.length; j++){
                var obj = {
                    "name": listproduct[j][nameField],
                    "link":listproduct[j][linkField],
                    "image":listproduct[j][imageField],
                    "price":listproduct[j][priceField],
                    "web":webName
                }
                totalProduct.push(obj)
                if(j <= 8){
                mains += 
                `<a id="p16533779" class="grid__product-cell" href="${listproduct[j][linkField]}">
                    <div class="grid__product-img">
                        <img width="200" height="200" data-src="${listproduct[j][imageField]}" class=" lazyloaded" alt="iPhone 12 128GB" onerror="javascript:this.src='${listproduct[j][imageField]}'" src="${listproduct[j][imageField]}">
                    </div>
                    <button class="btn-product">${webName}</button>
                    <div class="grid__product-name">${listproduct[j][nameField]}</div>
                    <div class="grid__product-price product-price">${formatmoney(listproduct[j][priceField])}</div>
                </a>`
                }
            }
            document.getElementById("listallproduct").innerHTML += mains
        }
    }
    
}

async function loadByApiSearchPost(){
    var search = window.location.search.split('search=')[1];
    var idcate = window.location.search.split('id=')[1];
    if(search == null){
        search = ""
    }
    if(search != ""){
        search =  decodeURI(search)
    }
    var url = 'http://localhost:8080/api/public/findApiAscGet';
    if(idcate != null){
        var url = 'http://localhost:8080/api/public/findApiAscGet?id='+idcate;
    }
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var list = await response.json();
    for(i=0; i<list.length; i++){
        var listproduct = null;
        var first = list[i].firstApi
        var linkField = list[i].linkField
        var imageField = list[i].imageField
        var nameField = list[i].nameField
        var priceField = list[i].priceField
        var webName = list[i].webName
        var linkapi = list[i].urlApi
        var method = list[i].method
        if(method == 'POST'){
            var body = list[i].body
            body = body.replace('???',search)
            var jsc = '{'+body+'}'
            jsc = JSON.parse(jsc)
            console.log(jsc)
            const response = await fetch(linkapi, {
                method: 'POST',headers: new Headers({
                    'Content-Type': 'application/json'
                }),body:JSON.stringify(jsc) });
            var result = await response.json()
            console.log(first)
            var arr = first.split(".");
            listproduct = result[arr[0]]
            if(arr.length  > 1){
                for(k=1; k <arr.length; k++){
                    listproduct = listproduct[arr[k]]
                }
            }
            console.log(listproduct)
            var mains = ''
            for(j=0; j< listproduct.length; j++){
                var obj = {
                    "name": listproduct[j][nameField],
                    "link":listproduct[j][linkField],
                    "image":listproduct[j][imageField],
                    "price":listproduct[j][priceField],
                    "web":webName
                }
                totalProduct.push(obj)
                if(j <= 8){
                mains += 
                `<a id="p16533779" class="grid__product-cell" href="${listproduct[j][linkField]}">
                    <div class="grid__product-img">
                        <img width="200" height="200" data-src="${listproduct[j][imageField]}" class=" lazyloaded" alt="iPhone 12 128GB" onerror="javascript:this.src='${listproduct[j][imageField]}'" src="${listproduct[j][imageField]}">
                    </div>
                    <button class="btn-product">${webName}</button>
                    <div class="grid__product-name">${listproduct[j][nameField]}</div>
                    <div class="grid__product-price product-price">${formatmoney(listproduct[j][priceField])}</div>
                </a>`
                }
            }
            document.getElementById("listallproduct").innerHTML += mains
        }

    }
    
}


async function loadJsoupSearch(){
    var search = window.location.search.split('search=')[1];
    var idcate = window.location.search.split('id=')[1];
    if(search == null){
        search = ""
    }
    if(search != ""){
        search =  decodeURI(search)
        search = search.replace('+',' ');
        search = stringToSlug(search)
        search = search.replace('-',' ')
    }
    
    var url = 'http://localhost:8080/api/public/searchjsoup?search='+search;
    if(idcate != null){
        var url = 'http://localhost:8080/api/public/searchjsoup?search='+search+'&id='+idcate; 
    }   
    const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
    })
    });
    var list = await response.json();
    console.log(list)
    var mains = ''
    for(i=0; i<list.length;i++){
        var prices = list[i].price.split(" ")[0].replace('₫','').replace('.','')
        var obj = {
            "name": list[i].name,
            "link":list[i].linkSp,
            "image":list[i].linkImage,
            "price":prices,
            'web':list[i].linkWeb.webName
        }
        totalProduct.push(obj)
        mains += 
        `<a id="p16533779" class="grid__product-cell" href="${list[i].linkSp}">
            <div class="grid__product-img">
                <img width="200" height="200" data-src="${list[i].linkImage}" class=" lazyloaded" alt="iPhone 12 128GB" onerror="javascript:this.src='${list[i].linkImage}'" src="${list[i].linkImage}">
            </div>
            <button class="btn-product">${list[i].linkWeb.webName}</button>
            <div class="grid__product-name">${list[i].name}</div>
            <div class="grid__product-price product-price">${list[i].price.split(" ")[0]}</div>
        </a>`
    }
    document.getElementById("listallproduct").innerHTML += mains
}

function stringToSlug(str) {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i=0, l=from.length ; i < l ; i++) {
      str = str.replace(RegExp(from[i], "gi"), to[i]);
    }
  
    str = str.toLowerCase()
          .trim()
          .replace(/[^a-z0-9\-]/g, '-')
          .replace(/-+/g, '-');
  
    return str;
  }
function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    return VND.format(money);
}
