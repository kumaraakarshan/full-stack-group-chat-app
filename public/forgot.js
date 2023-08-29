const { AlexaForBusiness } = require("aws-sdk");

function forgotPass(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const token = localStorage.getItem('token')

    const obj = {
        email
    }

    console.log(obj)
    axios.post('http://localhost:3000/password/forgotpassword',obj , {header: {"Authorization": token}})
    .then(res => {
        document.body.innerHTML += `<div style="color:red;text-align:center;margin-top:70px;">Mail Successfuly sent <div>`
    })
    .catch(err => {
        console.log('something went wrong with forgotPassword', err)
        document.body.innerHTML += `<div style="color:red;text-align:center;margin-top:70px;"> ${err}<div>`
    })
}