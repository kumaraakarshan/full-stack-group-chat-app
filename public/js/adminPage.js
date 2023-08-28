window.addEventListener('DOMContentLoaded', async()=>{

    // let url = 'http://localhost:4000';
    let url = 'http://localhost:4000';

    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;

    let res = await axios.get(`${url}/admin/members`);
    console.log(res);
    console.log(res.data[0].users);

    let member = document.getElementById('member');
    res.data[0].users.forEach(element =>{
        console.log(element);

        let id = element.groupsUser.userId;
        let div = document.createElement('div');
        let p = document.createElement('button');
        let d = document.createElement('button');

        div.innerHTML = element.name;

        p.className = "btn btn-outline-primary btn-sm";
        p.innerHTML = 'Admin';
        d.className = "btn btn-outline-danger btn-sm";
        d.innerHTML = 'Remove';



        p.addEventListener('click', async()=>{
            let res = await axios.post(`${url}/admin/admin`,{id: id});
            console.log(res);
            p.className = "btn btn-success btn-sm";
            location.reload();
        });

        
        d.addEventListener('click', async()=>{
            let res = await axios.post(`${url}/admin/remove`,{id: id});
            console.log(res);
            d.className = "btn btn-danger btn-sm";
            location.reload();

        });

        div.appendChild(p);
        div.appendChild(d);

        member.appendChild(div);



    });
    

    document.getElementById('search').addEventListener('click', async()=>{
        try{

            let email = document.getElementById('email').value;
            let res = await axios.post(`${url}/admin/add`,{email: email});
            console.log(res);

            if(res.data === 'not admin'){
                alert('You are not Admin of this Group, So you can not perform this task');
            }
            else if(res.data === 'user not found'){
                alert('This user not found, make sure you are entering correct email');
            }else{

                let friend = document.getElementById('friend');
                res.data.forEach(element => {

                    //console.log(element);
                    let id = element.id;
                    let div = document.createElement('div');
                    let p = document.createElement('button');
                    let d = document.createElement('button');

                    div.innerHTML = element.name;


                    
                    p.className = "btn btn-outline-primary btn-sm";
                    p.innerHTML = 'Admin';
                    d.className = "btn btn-outline-danger btn-sm";
                    d.innerHTML = 'Remove';



                    p.addEventListener('click', async()=>{
                        let res = await axios.post(`${url}/admin/admin`,{id: id});
                        console.log(res);
                        p.className = "btn btn-success btn-sm";
                        location.reload();

                    });

                    
                    d.addEventListener('click', async()=>{
                        let res = await axios.post(`${url}/admin/remove`,{id: id});
                        console.log(res);
                        d.className = "btn btn-danger btn-sm";
                        location.reload();

                    });

                    div.appendChild(p);
                    div.appendChild(d);

                    friend.appendChild(div);
                            
                });
            }

        }catch(err){
            console.log(err);
        }
        


    });


});
  