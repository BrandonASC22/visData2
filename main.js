function getInfoType(infoType) {
    switch(infoType) {
        case first:
            return {type: first_name};
        
        case last:
            return {type: last_name};
        
        case gender:
            return {type: gender};

        case all:
            return {type: all_info};
    }
}

function updateUI(userObj) {
    let firstName = document.querySelector("#first");
    firstName.innerHTML = `${userObj.name.first}`;

    let lastName = document.querySelector("#last");
    lastName.innerHTML = `${userObj.name.last}`;

    let gender = document.querySelector("#gender");
    gender.innerHTML = `${userObj.gender}`;

    let age = document.querySelector("#age");
    age.innerHTML = `${userObj.dob.age}`;

    let address = document.querySelector("#address");
    address.innerHTML = `${userObj.location.street.number} ${userObj.location.street.name}, ${userObj.city}, ${userObj.state}, ${userObj.country} ${userObj.postcode}.`;

    let email = document.querySelector("#email");
    email.innerHTML = `${userObj.email}`;

    let number = document.querySelector("#number");
    number.innerHTML = `${userObj.phone}`;

    let img = document.querySelector("#user_image");
    img.src = userObj.picture.large;
}

const randNumGenerator = (pick) => {
    let randDec = Math.random();
    randDec *= pick;
    return Math.floor(randDec);
}

function loadUser(userNum) {
    const url = `https://randomuser.me/api/?format=pretty&results=${userNum}`;
   fetch(url)
        .then(function(response) {
            console.log(response);
            return response.json();
        })

        .then(function(jsonData) {
            console.log(jsonData);

            let user = {
                first: jsonData.name.first,
                last: jsonData.name.last,
                gender: jsonData.gender,
                age: jsonData.dob.age,
                address: `${jsonData.location.street.number} ${jsonData.location.street.name}, ${jsonData.city}, ${jsonData.state}, ${jsonData.country} ${jsonData.postcode}.`,
                email: jsonData.email,
                number: jsonData.phone,
                img: jsonData.picture.large,
            };

            console.log(user);

            updateUI(user);
        })
}

let randomBtn = document.querySelector("#random_btn");
randomBtn.onclick = function(event) {
    event.preventDefault();

    let selectedOption = document.querySelector("input[name = 'type']:checked")

    let type = (selectedOption.value);

    let infoType = getInfoType(type);

    let infoCount = randomNumGenerator(infoType.pick);

    loadUser(infoCount);
}