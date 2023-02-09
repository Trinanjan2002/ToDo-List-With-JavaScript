let itemsJSON = null;
let itemJsonArray = null;

populateTable();

add = document.getElementById("add");
add.addEventListener("click", () => {
    titl = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    itemsJSON = localStorage.getItem('itemsJSON');
    if (itemsJSON == null) {
        itemJsonArray = [];
        itemJsonArray.push({ titl, desc });
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
        document.getElementById("title").value = null;
        document.getElementById("description").value = null;
        console.log("Updated List");
    } else {
        itemJsonArray = JSON.parse(itemsJSON);
        itemJsonArray.push({ titl, desc });
        localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
        document.getElementById("title").value = null;
        document.getElementById("description").value = null;
        console.log("Updated List");
    }
    populateTable();
});

// Populate the table   
function populateTable() {
    itemsJSON = localStorage.getItem('itemsJSON');
    itemsJSON == null ? itemJsonArray = [] : itemJsonArray = JSON.parse(itemsJSON);
    tableBody = document.getElementById('tableBody');
    str = "";
    itemJsonArray.forEach((item, index) => {
        str += `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${item.titl}</td>
                        <td>${item.desc}</td>
                        <td><button class="btn btn-primary btn-sm" onclick="deleteItem(${index})">Delete</button></td>
                        </tr>`;
    });
    tableBody.innerHTML = str;
}

function clearStorage() {
    decision = confirm("All TODOs will be deleted...\nProceed Deleting?")
    if (decision) {
        localStorage.clear();
        console.log("Local Storage Cleared...");
        populateTable();
    } else {
        console.log("Local Storage Cleaning Cancelled...");
    }
};

function deleteItem(index) {
    itemsJSON = localStorage.getItem('itemsJSON');
    itemJsonArray = JSON.parse(itemsJSON);
    itemJsonArray.splice(index, 1);
    localStorage.setItem('itemsJSON', JSON.stringify(itemJsonArray));
    populateTable();
}