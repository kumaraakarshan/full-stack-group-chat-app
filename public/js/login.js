   


document.getElementById('loginBtn').addEventListener('click',async()=>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let res = await axios.post(`/login`,{
        email: email,
        password:password
    })

    console.log(res);

    if(res.data === 'email incorrect'){
        alert('User not found');
    }
    else if(res.data === 'password inccorect'){
        alert('User not authorized');
    }
    else if(res.data.token){
        //console.log(res.data);
        let token = res.data;
        token.connected = null;
        token = JSON.stringify(token);
        localStorage.setItem('token',`${token}`);
        location.href = `/chat`;
        
    }
})