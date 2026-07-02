// ===============================
// LOGIN PAGE
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if(email === "" || password === ""){

            alert("Please enter email and password.");

            return;
        }

        localStorage.setItem("userEmail", email);

        window.location.href = "dashboard.html";

    });

}


// ===============================
// DASHBOARD
// ===============================

const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const fileTable = document.getElementById("fileTable");
const searchInput = document.getElementById("searchInput");
const storageText = document.getElementById("storageText");
const progressBar = document.getElementById("progressBar");
const activityList = document.getElementById("activityList");
const logoutBtn = document.getElementById("logoutBtn");

let files = JSON.parse(localStorage.getItem("cloudFiles")) || [];


// ===============================
// DISPLAY FILES
// ===============================

function displayFiles(){

    if(!fileTable) return;

    fileTable.innerHTML = "";

    let totalSize = 0;

    files.forEach((file,index)=>{

        totalSize += file.size;

        let row = document.createElement("tr");

        row.innerHTML = `

        <td>${file.name}</td>

        <td>${file.type}</td>

        <td>${file.size.toFixed(2)} MB</td>

        <td>

        <button class="delete-btn" onclick="deleteFile(${index})">

        Delete

        </button>

        </td>

        `;

        fileTable.appendChild(row);

    });

    storageText.innerHTML = `${totalSize.toFixed(2)} MB / 100 MB Used`;

    progressBar.style.width = totalSize + "%";

}

displayFiles();


// ===============================
// UPLOAD FILE
// ===============================

if(uploadBtn){

uploadBtn.addEventListener("click",function(){

    if(fileInput.files.length===0){

        alert("Please select a file.");

        return;

    }

    let file = fileInput.files[0];

    let newFile = {

        name:file.name,

        type:file.type || "Unknown",

        size:file.size/(1024*1024)

    };

    files.push(newFile);

    localStorage.setItem("cloudFiles",JSON.stringify(files));

    displayFiles();

    addActivity("Uploaded : " + file.name);

    fileInput.value="";

});

}


// ===============================
// DELETE FILE
// ===============================

function deleteFile(index){

    addActivity("Deleted : " + files[index].name);

    files.splice(index,1);

    localStorage.setItem("cloudFiles",JSON.stringify(files));

    displayFiles();

}

window.deleteFile = deleteFile;


// ===============================
// SEARCH FILE
// ===============================

if(searchInput){

searchInput.addEventListener("keyup",function(){

let filter = searchInput.value.toLowerCase();

let rows = fileTable.getElementsByTagName("tr");

for(let i=0;i<rows.length;i++){

let fileName = rows[i].cells[0].innerText.toLowerCase();

if(fileName.includes(filter)){

rows[i].style.display="";

}

else{

rows[i].style.display="none";

}

}

});

}


// ===============================
// RECENT ACTIVITY
// ===============================

function addActivity(text){

if(!activityList) return;

let li = document.createElement("li");

li.innerHTML = text;

activityList.prepend(li);

}


// ===============================
// LOGOUT
// ===============================

if(logoutBtn){

logoutBtn.addEventListener("click",function(){

localStorage.removeItem("userEmail");

window.location.href="index.html";

});

}