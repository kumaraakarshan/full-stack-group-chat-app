window.addEventListener('DOMContentLoaded',async()=>{
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
 

    let id = location.href;

    let res = await axios.post(`/join`,{
        link: id
    }) 
    console.log(res);
    
    let card = document.getElementById('card');
    card.innerHTML = `
    <h5 class="card-title">Join Group</h5>

    <h6 id="groupName">You have been invited to join ${res.data.name}</h6>

    <button id="button" class="btn btn-primary" >Join</button>
    <button id="cancel" class="btn btn-primary" >Cancel</button>`;
    
    token = JSON.parse(token);
    token.connected = res.data.name;
    token = JSON.stringify(token);
    localStorage.setItem('token', token);

   
    document.getElementById('button').addEventListener('click', async ()=>{
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;

        let res = await axios.get(`/join`);
        //console.log(res);
        location.href = `$/chat`;
    })
    
    
    document.getElementById('cancel').addEventListener('click', async()=>{
        location.href = `/chat`;
    })
});