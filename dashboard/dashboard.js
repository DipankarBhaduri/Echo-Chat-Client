
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/rest/users')
        .then(response => response.json())
        .then(data => {
            displayUserList(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while fetching the user list.');
        });
});


function displayUserList(userList) {
    const userListElement = document.getElementById('user-list');

    userListElement.innerHTML = '';

    userList.forEach(user => {
        const listItem = document.createElement('li');
        const userLink = document.createElement('a');

        userLink.textContent = user.name;
        userLink.href = '#';

        userLink.addEventListener('click',  async(event)=> {
            event.preventDefault();
            const currentUser=JSON.parse(localStorage.getItem("currentUser"))

            // console.log({
            //     currentUser:currentUser
            // })
           
            // try{
            //     const response = await fetch(`http://localhost:8080/rest/message/${userId}`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             _id: currentUser._id
            //         })
            //     });
            
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! Status: ${response.status}`);
            //     }
            
            //     const data = await response.json();
            //     localStorage.setItem("prevMessages", JSON.stringify(data));
            // }catch(error){

            // }

            localStorage.setItem('selectedUser', JSON.stringify(user));
            window.location.href = '../chatBox/chatBox.html';
        });

        listItem.appendChild(userLink);
        userListElement.appendChild(listItem);
    });
}


// document.addEventListener('DOMContentLoaded', function () {
//     fetch('http://localhost:8080/rest/users')
//         .then(response => response.json())
//         .then(data => {
//             displayUserList(data);
//         })
//         .catch(error => {
//             console.error('Error fetching user list:', error);
//             alert('An error occurred while fetching the user list.');
//         });
// });

// function displayUserList(userList) {
//     const userListElement = document.getElementById('user-list');

//     userListElement.innerHTML = '';

//     userList.forEach(user => {
//         const listItem = document.createElement('li');
        
//         listItem.textContent = user.name;
//         listItem.style.cursor = 'pointer'; // Add this line to indicate it's clickable

//         listItem.addEventListener('click', async (event) => {
//             event.preventDefault();
//             const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//             try {
//                 const response = await fetch(`http://localhost:8080/rest/message/${user._id}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         _id: currentUser._id
//                     })
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 localStorage.setItem("prevMessages", JSON.stringify(data));
//             } catch (error) {
//                 console.error('Error fetching messages:', error);
//                 alert('An error occurred while fetching messages.');
//             }

//             localStorage.setItem('selectedUser', JSON.stringify(user));
//             window.location.href = '../chatBox/chatBox.html';
//         });

//         userListElement.appendChild(listItem);
//     });
// }
