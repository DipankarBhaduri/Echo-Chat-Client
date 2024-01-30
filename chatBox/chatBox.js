document.addEventListener('DOMContentLoaded', function () {
    const storedSelectedUserData = localStorage.getItem('selectedUser');
    const selectedUser = storedSelectedUserData ? JSON.parse(storedSelectedUserData) : null;

    const selectedUserNameElement = document.getElementById('selected-user-name');
    if (selectedUser) {
        selectedUserNameElement.textContent = selectedUser.name;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const storedSelectedUserData = localStorage.getItem('selectedUser');
    const storedCurrentUserData = localStorage.getItem('currentUser');

    const selectedUser = storedSelectedUserData ? JSON.parse(storedSelectedUserData) : null;
    const currentUser = storedCurrentUserData ? JSON.parse(storedCurrentUserData) : null;

    const selectedUserNameElement = document.getElementById('selected-user-name');
    if (selectedUser) {
        selectedUserNameElement.textContent = selectedUser.name;
    }

    const sendMessageButton = document.getElementById('send-message-button');
    const messageTextArea = document.getElementById('message-textarea');
    const chatWindow = document.getElementById('chat-window');

    sendMessageButton.addEventListener('click', function () {
        const messageText = messageTextArea.value.trim();

        if (messageText) {
            const messagePayload = {
                message: messageText,
                date: new Date(),
                senderId: currentUser._id,
                receiverId: selectedUser._id,
            };

            const apiUrl = 'http://localhost:8080/rest/save/message';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messagePayload),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Failed to save message');
                    }
                })
                .then(data => {
                    console.log('Message saved successfully:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while saving the message.');
                });

            const messageElement = document.createElement('div');
            messageElement.textContent = `${currentUser.firstName}: ${messageText}`;
            chatWindow.appendChild(messageElement);

            messageTextArea.value = '';

        } else {
        }
    });
});

// document.addEventListener('DOMContentLoaded', async function () {
//     const storedSelectedUserData = localStorage.getItem('selectedUser');
//     const storedCurrentUserData = localStorage.getItem('currentUser');

//     const selectedUser = storedSelectedUserData ? JSON.parse(storedSelectedUserData) : null;
//     const currentUser = storedCurrentUserData ? JSON.parse(storedCurrentUserData) : null;

//     try {
//         const response = await fetch(`http://localhost:8080/rest/messages`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 senderId: currentUser._id,
//                 receiverId: selectedUser._id
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         displayMessages(data); // Assuming you have a displayMessages function to update the DOM
//     } catch (error) {
//         console.error('Error:', error);
//         // Handle the error as needed
//     }
// });


document.addEventListener('DOMContentLoaded', async function () {
    fetchDataAndUpdateMessages();

    setInterval(fetchDataAndUpdateMessages, 2000);
});

async function fetchDataAndUpdateMessages() {
    const storedSelectedUserData = localStorage.getItem('selectedUser');
    const storedCurrentUserData = localStorage.getItem('currentUser');

    const selectedUser = storedSelectedUserData ? JSON.parse(storedSelectedUserData) : null;
    const currentUser = storedCurrentUserData ? JSON.parse(storedCurrentUserData) : null;

    try {
        const response = await fetch(`http://localhost:8080/rest/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: currentUser._id,
                receiverId: selectedUser._id
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        clearMessages();

        const data = await response.json();
        displayMessages(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function clearMessages() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = ''; // Clear the content of the chat window
}


function displayMessages(messages) {

    // const chatWindow = document.getElementById('chat-window');

    const storedSelectedUserData = localStorage.getItem('selectedUser');
    const storedCurrentUserData = localStorage.getItem('currentUser');

    const selectedUser = storedSelectedUserData ? JSON.parse(storedSelectedUserData) : null;
    const currentUser = storedCurrentUserData ? JSON.parse(storedCurrentUserData) : null;

    const senderName = currentUser.firstName;
    const senderId = currentUser._id;
    const receiverName = selectedUser.name;

    const messageTextArea = document.getElementById('message-textarea');
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML = ''; 


    messages.forEach(message => {
        const messageElement = document.createElement('div');
        
        messageElement.textContent = `${message.senderId == senderId ? senderName : receiverName}: ${message.message}`;
        chatWindow.appendChild(messageElement);
    });

    const sendMessageButton = document.getElementById('send-message-button');

    sendMessageButton.addEventListener('click', async function () {
        const messageText = messageTextArea.value.trim();

        if (messageText) {
            try {
                const sendMessageResponse = await fetch('http://localhost:8080/rest/save/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: messageText,
                        date: new Date(),
                        senderId: currentUser._id,
                        receiverId: userId
                    })
                });

                if (!sendMessageResponse.ok) {
                    throw new Error(`HTTP error! Status: ${sendMessageResponse.status}`);
                }

                const newMessage = await sendMessageResponse.json();

                

                const newMessageElement = document.createElement('div');
                newMessageElement.textContent = `${currentUser.firstName}: ${newMessage.message}`;
                chatWindow.appendChild(newMessageElement);

                messageTextArea.value = '';
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while sending the message.');
            }
        } else {
        }
    });
}