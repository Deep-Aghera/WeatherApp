

// fetch('http://localhost:3000/weather?address=surat').then((data) => {
//     data.json().then((data) => {console.log(data)})
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location  = search.value;
    message1.innerHTML = "Loading...";
    message2.innerHTML = "";
    console.log('testing!',location);
    fetch(`http://localhost:3000/weather?address=${location}`).then((data) => {
    data.json().then((data) => {
        console.log(data);
        if(data.error) {
            message1.innerHTML = data.error;
            
        } else {
            message1.innerHTML = data.location;
            message2.innerHTML = data.forecast;
        }
       
    })
})

})