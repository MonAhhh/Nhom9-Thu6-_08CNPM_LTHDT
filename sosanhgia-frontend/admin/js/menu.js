var header = `<a class="navbar-brand ps-3" href="index.html">Quản trị</a>
<button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
<div class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
<ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" onclick="logoutAdmin()" style="cursor: pointer;">Logout</a></li>
        </ul>
    </li>
</ul>`;
document.getElementById("topmenu").innerHTML = header


var menulist =
`<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
        <div class="nav">
            <div class="sb-sidenav-menu-heading">Danh mục</div>
            <a class="nav-link" href="cateparent.html">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                Danh mục cha
            </a>
            <a class="nav-link" href="category.html">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                Danh mục con
            </a>
            <div class="sb-sidenav-menu-heading">Link</div>
            <a class="nav-link" href="linkapi.html">
                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                Link api
            </a>
            <a class="nav-link" href="crawlweb.html">
                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                Link crawl Html
            </a>
            <div class="sb-sidenav-menu-heading">Blog</div>
            <a class="nav-link" href="index.html">
                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                Blog
            </a>
        </div>
    </div>
    <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        Admin
    </div>
</nav>`
document.getElementById("layoutSidenav_nav").innerHTML = menulist

function logoutAdmin(){
    localStorage.removeItem("token");
    window.location.replace("../login.html")
}

async function checkroleAdmin(){
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/admin/checkroleAdmin';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        alert("bạn không đủ quyền")
        window.location.replace('../login.html')
    }
  }