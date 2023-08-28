     let url = 'http://localhost:3000';
    //let url = 'http://localhost:3000';


document.getElementById('button').addEventListener('click',async()=>{
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let password = document.getElementById('password').value;

    let res = await axios.post(`${url}/signup`,{name,email,number,password});
    console.log(res);

    if(res.data === 'success'){

        alert("Successfuly signed up");
        location.href = `${url}/login`;

    }else if(res.data === 'fill all field'){
        
        alert('fill all field')

    }else if(res.data === 'failed'){

        alert('Something went wrong,Please Try after sometimes');

    }else if(res.data === 'user already exists'){

        alert( "User already exists, Please Login");
    }

});