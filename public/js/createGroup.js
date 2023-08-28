   

let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;
  

document.getElementById('button').addEventListener('click', async()=>{
    try{

        
        let name = document.getElementById('groupName').value;
        let res = await axios.post(`/group/create`,{name : name});

        console.log(res);

        if(res.data === 'failed'){
            alert('Group name already exists! Choose different name');
        }
        else{
            let div = document.getElementById('card');
            let el = document.getElementById('link');
            el.value = res.data.link;
            el.style.visibility = 'visible';
            div.appendChild(el);
            alert('Group created succesflly! copy group invite link');

        }
    }catch(err){
        console.log(err);
    }
});



document.getElementById('cancel').addEventListener('click', async()=>{
    location.href = `/chat`
});



