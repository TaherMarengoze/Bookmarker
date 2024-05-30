var siteNameInput = document.getElementById('siteNameInput');
var siteUrlInput  = document.getElementById('siteUrlInput' );
var tableBody     = document.getElementById('tableBody'    );

var bookmarksKey = "bookmarks";

var bookmarks = [];
var localStorageData = localStorage.getItem(bookmarksKey);

if (localStorageData){
    bookmarks = JSON.parse(localStorageData);
    updateView(bookmarks);
}

function addBookmark(){
    var siteName = siteNameInput.value;
    var siteUrl = siteUrlInput.value;

    bookmarks.push({
        name: siteName.trim(),
        url: siteUrl.trim()
    });

    resetInputs();
    updateView(bookmarks);
    updateLocalStorage();

}

function deleteBookmark(index){
    bookmarks.splice(index,1);

    updateView(bookmarks);
    updateLocalStorage();
}

function resetInputs(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function updateView(bookmarksToDisplay){
    var tableRows = "";
    var objBookmark = {};

    for(i=0 ; i < bookmarksToDisplay.length ; i++){

        objBookmark = bookmarksToDisplay[i];

        tableRows +=
        `
        <tr>
            <td class="align-middle">${i+1}</td>
            <td class="align-middle">${objBookmark.name}</td>
            <td>
                <a href="${objBookmark.url}" class="btn btn-success" target="_blank">
                    <span>
                        <i class="fa fa-eye"></i>
                    </span>
                    <span>Visit</span>
                </a>
            </td>
            <td>
                <button onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa fa-trash"></i> Delete</button>
            </td>
        </tr>
        `
    }

    tableBody.innerHTML = tableRows;        
}

function updateLocalStorage(){
    localStorage.setItem(bookmarksKey,JSON.stringify(bookmarks));
}