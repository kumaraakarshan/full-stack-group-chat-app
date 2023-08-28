   


document.getElementById('submitBtn').addEventListener('click',async()=>{
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let password = document.getElementById('password').value;

    let res = await axios.post(`/signup`,{name,email,number,password});
    console.log(res);

    if(res.data === 'success'){

        alert("Successfuly signed up");
        location.href = `/login`;

    }else if(res.data === 'fill all field'){
        
        alert('fill all field')

    }else if(res.data === 'failed'){

        alert('Something went wrong,Please Try after sometimes');

    }else if(res.data === 'user already exists'){

        alert( "User already exists, Please Login");
    }

});