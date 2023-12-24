const url = "https://soorchi.com/back/";
const lead_url = "https://soorchi.com/";
const static = "https://soorchi.com/static/";
const offer_id = 452;

let player_id = null;
let token = null;
let gender = "";
var GetPhone = document.getElementById('getphone');
var GetCode = document.getElementById('getcode');
var EndGame = document.getElementById('end_game');
var a1 = document.getElementById("textToCopy");
var endGame_Viral = "";

var currentUrl = window.location.href;
GetCode.style.display = "none";
EndGame.style.display = "none";


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function sendreq(offer) {

    let item = document.getElementById("getphoneinput")

    let val = item.value
    if (val == "000"){
        GetCode.style.display = 'flex';
        GetPhone.style.display = 'none';
    }

    if (val.length < 11) {
        alert("شماره تلفن باید 11 رقم باشد مثل(09120000000)");
    } else if ((val.length > 11)) {
        alert("شماره باید 11 رقم باشد . ");
    } else {
        let response = await fetch(`${url}account/get_phone_code`, {
            method: "POST",
            body: JSON.stringify({
                mobile: val,
                offer_id: offer_id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'X-CSRFToken': csrftoken
            }
        });
        let data = await response.json();
        if (response.status == 200) {
            GetCode.style.display = 'flex';
            GetPhone.style.display = 'none';
        } else {
            alert(data["message"])
            setInterval(function () {
                location.replace(`${lead_url}lead/${data['offer']}/?C=${data['customerID']}`)
            }, 1000);
        }
    }
};



async function sendCustomerData(code) {
    let response = await fetch(`${url}account/xvision_code_cheker`, {
        method: "POST",
        body: JSON.stringify({
            code: code,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'X-CSRFToken': csrftoken
        }
    });
    let data = await response.json();
    token = data.token
    data = data.data
    if (response.status == 200) {
        mydata = data
        GetCode.style.display = 'none';
        var game = document.getElementById("game");
        game.style.display = "block";
        var newIframe = document.createElement("iframe");
        newIframe.src = "./game/index.html";
        newIframe.id = "myIframe";
        newIframe.classList.add("w-full");
        newIframe.classList.add("h-full");
        game.appendChild(newIframe);

    } else if (response.status == 404) {
        alert("ثبت اطلاعات شما با مشکل مواجه شد  ")
    }
};


function endGame(data) {
    game.style.display = "none";
    document.getElementById("end_game").style.display = 'flex';
    var p1 = document.getElementById("end_game-message");
    var newdata = JSON.parse(data)
    p1.innerText = newdata.Items[newdata.Selected];

};
function sendrequest(status){

    switch (status) {
        case '0':
            sendreq(offer_id)
            break;
        case '1':
            var codeinput = document.getElementById('getcodeinput')
            var code =codeinput.value
            if(code !== ""){
                sendCustomerData(code)
            }else{
                codeinput.value = null
                alert("کد اشتباه است ")
            }     
            break;
        case '2':
            GetCode.style.display = 'none';
            GetPhone.style.display = 'flex';
            break;

        default:
            break;
    }
};

// function to auto copy text

// Function to copy text to clipboard



// Function to copy text to clipboard
function copyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
};


// Get the element to copy text from


// Get the copy button element
const copyButton = document.getElementById("copyButton");

// Add a click event listener to the element
a1.addEventListener("click", function () {
    // Get the innerText of the element
    const textToCopy = a1.innerText;

    // Copy the text to clipboard
    copyTextToClipboard(textToCopy);

    // Notify the user that the text has been copied
    alert("لینک کپی شد بفرست برای دوستات امتیاز بگیر");

});

// Add a click event listener to the copy button (optional)
copyButton.addEventListener("click", function () {
    // Get the innerText of the element
    const textToCopy = a1.innerText;

    // Copy the text to clipboard
    copyTextToClipboard(textToCopy);

    // Notify the user that the text has been copied
    alert("لینک کپی شد بفرست برای دوستات امتیاز بگیر");
});
