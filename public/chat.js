const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const userId = localStorage.getItem('userId');


  //top-display 

  document.getElementById("login-name").innerHTML = `${name}`;
  const currentGroup = document.getElementById("current-group-name");
  if(localStorage.getItem("groupName") != null) {
    currentGroup.innerHTML = `${localStorage.getItem("groupName")}`
  } else {
    currentGroup.innerHTML = "Select a Group";
  }

  function logout() {
    localStorage.clear();
    window.location.href="./login.html";
  }

 

  

    async function createGroup(event) {
      //event.preventDefault();
      try {
          const name = document.getElementById("create-group-input").value;
      const res = await axios.post('http://localhost:3000/create-group', {name, isAdmin:true}, {headers: { "Authorization": token }});
      //console.log('>>GrouP ID', res.data.group.id);
      const groupId = res.data.group.id;
      localStorage.setItem('groupId', groupId);
  
      }catch (err) {
          console.log(err);
      }
      
    }

    axios
  .get("http://localhost:3000/get-groups", {headers: { "Authorization": token }})
  .then((res) => {
    //getting groups
    const groupListDiv = document.getElementById("group-list");
    groupListDiv.innerHTML = "";
    res.data.groups.forEach((group) => {
      groupListDiv.innerHTML += `
          <li id="${group.id}" style="padding:5px 0;">
          <span style="color: white;">${group.name}</span>
          <button id="show-users">Show Users</button>
          <button id="change-group-btn" class="group-btn">Enter Chat</button>
          <button id="delete-group-btn" class="group-btn">Delete Group</button>
          <button id="add-user-btn">Add-Users</button>
          </li>
          `;
    });
  })
  .catch((err) => console.log(err));

  

  //get groups

  


  //chats
  
    //chats
    let localMsg = JSON.parse(localStorage.getItem("localMsg"));
    //console.log(typeof(localMsg))
    let lastId;
    if (localMsg.length == 0) {
      //console.log('hiiiiiiiiiiiiiiii')
      lastId = 0;
    }
    if (localMsg.length > 0) {
      lastId = localMsg[localMsg.length - 1].id;
    }
    const groupId = localStorage.getItem("groupId");
  
    if (localStorage.getItem("groupId") != null) {
      console.log('***********', lastId)
       //setInterval(() => {
      axios
        .get(`http://localhost:3000/get-chats?id=${lastId}&gId=${groupId}`, {headers: { "Authorization": token }})
        .then((response) => {
          console.log('*******RESP', response)
        
          let retrivedMsg = localMsg.concat(response.data.chat);

          console.log('all retrrrrrrrr',retrivedMsg)
          //deleting old messages from local storage
          if (retrivedMsg.length > 100) {
            for (let i = 0; i < retrivedMsg.length - 100; i++)
              retrivedMsg.shift();
          }
          localStorage.setItem("localMsg", JSON.stringify(retrivedMsg));
  
          const div = document.getElementById("group-chat-receive-box");
          retrivedMsg.forEach((chat) => {
            div.innerHTML += `<div id="${chat.id}>"><span style="color:green;"><b>${chat.name}:</b></span><span>${chat.message}</span></div>`;
          });
        })
        .catch((err) => console.log(err.response));
     //  }, 1000)
    }
  
    function sendGroupMsg(event) {
      event.preventDefault();
  
      if (localStorage.getItem("groupId") == null) {
        alert("Select a group first");
        document.getElementById("group-chat-input").value = "";
      } else {
        const input = document.getElementById("group-chat-input").value;
        const obj = {
          message: input,
          name: name,
          groupId: localStorage.getItem("groupId"),
        };
        console.log(obj);
        axios
          .post("http://localhost:3000/post-chat", obj, {headers: { "Authorization": token }})
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        document.getElementById("group-chat-input").value = "";
        document.getElementById("group-chat-receive-box").innerHTML += `
                  <div class="chat-span"><span ><b>${name}:</b></span><span>${input}</span></div>`;
      }
    }
  
    document
    .getElementById("group-list-wrapper")
    .addEventListener("click", (e) => {      //for changing/deleting group

      if (e.target.id === "change-group-btn") {
        const gId= e.target.parentNode.id;
        const gName= e.target.parentNode.children[0].innerText;
        console.log(gId,gName)
        localStorage.setItem("groupId", gId);
        localStorage.setItem("groupName", gName);
        localStorage.setItem("localMsg", "[]");
        window.location.reload();
      }

      if (e.target.id === "delete-group-btn") {
        const gId= e.target.parentNode.id;
        console.log(gId)
        if (confirm("Are you sure?")) {
          axios
            .delete(`http://localhost:3000/delete-group/${gId}`, {headers: { "Authorization": token }})
            .then((res) => {
              console.log(res.data);
              localStorage.removeItem("groupId");
              alert(`Group with id-${gId} is deleted successfully`);
            })
            .catch((err) => console.log(err.response.data));
        }
      }

      if (e.target.id === "show-users") {
        document.getElementById('user-list').style.display = 'block';
        const gId= e.target.parentNode.id;
        axios
          .get(`http://localhost:3000/get-users/?gId=${gId}`, {headers: { "Authorization": token }})
          .then((res) => {
            // console.log(res.data);
            document.getElementById("users-inside-group").innerHTML = "";
            res.data.userData.forEach((user) => {
              document.getElementById("users-inside-group").innerHTML += `
                        <li id="${user.groups[0].id}">
                            <span style="color: white;">${user.name}</span>
                            <span style="color: white;">${user.email}</span>
                            <span style="color: white;">${user.groups[0].usergroup.isAdmin}</span>
                            <button id="remove-user-btn" class="user-btn">Remove</button>
                            <button id="make-admin-btn">Make Admin</button>
                        </li> `;
            });
          })
          .catch((err) => console.log(err));
      }

      if (e.target.id === "remove-user-btn") {
        const obj = {
          email: e.target.parentNode.children[1].innerText,
          groupId: e.target.parentNode.id,
        };
        console.log(obj);
        if (confirm("Are you sure?")) {
          axios
            .post("http://localhost:3000/remove-user", obj, {headers: { "Authorization": token }})
            .then((res) => {
              console.log(res.data);
              alert(`user with ${obj.email} has been removed from the group`);
            })
            .catch((err) => {
              console.log(err.response);
              alert(`user with ${obj.email} not present in the group`);
            });
        }
      }

      if (e.target.id === "make-admin-btn") {
        const obj= {
            email: e.target.parentNode.children[1].innerText,
            groupId: e.target.parentNode.id
        }
        // console.log(obj)
        axios
          .post("http://localhost:3000/make-admin", obj, {headers: { "Authorization": token }})
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }

      if (e.target.id === "add-user-btn") {
        axios
    .get("http://localhost:3000/get-users", {headers: { "Authorization": token }})
    .then((res) => {
      // getting users
      // console.log(res.data);
      const userListDiv = document.getElementById("user-list");
      userListDiv.style.display = 'block';
      userListDiv.innerHTML = "";
      res.data.user.forEach((user) => {
        userListDiv.innerHTML += `
            <li id='user-${user.id}' class="user-list-inside" style="padding:5px 0;" user-list-li>
            <span style="color: white;">${user.name}</span>
            <span style="color: white;">${user.email}</span>
            <label for="accept">Admin</label>
            <input type="checkbox" id="accept">
            <button id="add-user-btn" class="user-btn">Add</button>
            </li> `;
      });
    })
    .catch((err) => console.log(err.response));
      }
    });

    //USERS FUNCTIONALITY

    //POSTING USERS
    
    document.getElementById("user-list").addEventListener("click", (e) => {
      //for adding/removing users
      const email = e.target.parentNode.children[1].innerText;
      // console.log(email)
      const isAdmin = e.target.parentNode.children[3].checked;
      //console.log(isAdmin)
  
      if (localStorage.getItem("groupId") == null) {
        return alert("Please select a group first");
      }
      const obj = {
        email: email,
        groupId: localStorage.getItem("groupId"),
        isAdmin: isAdmin,
      };
      // console.log(obj);
      if (e.target.id === "add-user-btn") {
        axios
          .post("http://localhost:3000/add-user", obj, {headers: { "Authorization": token }})
          .then((res) => {
            console.log(res.data);
            alert(`user with ${email} added to the group`);
          })
          .catch((err) => {
            //console.log(err.response.data);
            alert(`user with ${email} is already a member`);
          });
      }
    });


    function sendMedia() {
      axios.post('http://localhost:3000/upload')
      .then(res => {
        console.log(res)
        alert('File uploaded to S3 successfully')
      })
      .catch((err) => {
        console.log(err);
      });
    }
 
    


  //   /* For searching in user list*/
  // document.querySelector("[data-search]").addEventListener("input", (e) => {
  //   //search bar
  //   const value = e.target.value.toLowerCase();
  //   const userList = document.getElementById("user-list");
  //   const li = userList.getElementsByTagName("li");
  //   // console.log(li);
  //   // console.log(Array.from(li));
  //   Array.from(li).forEach((user) => {
  //     const email = user.children[0].textContent;
  //     const name = user.children[1].textContent;
  //     if (
  //       (email.toLowerCase().indexOf(value) ||
  //         email.toLowerCase().indexOf(value)) !== -1
  //     ) {
  //       user.style.display = "block";
  //     } else {
  //       user.style.display = "none";
  //     }
  //   });
  // });