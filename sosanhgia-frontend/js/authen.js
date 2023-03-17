async function login() {
    var url = 'http://localhost:8080/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text(); 
    if(response.status > 300){
        swal({
            title: "Thông báo", 
            text: "tài khoản hoặc mật khẩu không chính xác!", 
            type: "error"
          },
        function(){ 
        });
    }
    if(response.status < 300){
        window.localStorage.setItem('token', token);
        window.location.replace('admin/index.html')
    }
}