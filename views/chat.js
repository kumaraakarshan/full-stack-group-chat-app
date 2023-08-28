document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Connect to the WebSocket server

    const msgForm = document.getElementById('msg');
    const msgInput = document.getElementById('msginput');
    const groupIdInput = document.getElementById('groupid');
    const msgsContainer = document.getElementById('msgs');

    // Handle form submission to send a chat message
    msgForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = msgInput.value.trim();
        const groupId = groupIdInput.value;

        if (message && groupId) {
            // Emit a chat message event to the server
            socket.emit('chatMessage', { message, groupId });
            msgInput.value = '';
        }
    });

    // Handle incoming chat messages from the server
    socket.on('chatMessage', (data) => {
        const { message, groupId } = data;
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${groupId}: ${message}`;
        msgsContainer.appendChild(messageElement);
    });
});

// Example code to send a POST request
document.getElementById('cgp').addEventListener('click', async (e) => {
    e.preventDefault();
    const groupName = document.getElementById('gpname').value;
  
    try {
      const response = await axios.post('/api/groups', { name: groupName });
      if (response.status === 200) {
        alert('Group created successfully.');
        // Optionally, you can update the UI to reflect the newly created group.
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  });
  
