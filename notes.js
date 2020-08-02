console.log('here we go');
showNotes();
importantNotes();// initial cheak
let btn = document.getElementById('noteBtn');
btn.addEventListener('click', function (e) {
    // console.log('clicked');
    let nTitle = document.getElementById('nTitle');
    let nText = document.getElementById('nText');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: nTitle.value,
        text: nText.value,
        isimp: "no"
    }
    if((nTitle.value && nText.value)!= ""){
    notesObj.push(myObj);
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    nText.value = "";
    nTitle.value = "";
    showNotes();
    importantNotes();

});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
 
    let html = "";

    notesObj.forEach(function (element, index) {

        if ((element.title && element.text) != "") {
            html += ` <div class="notecard card my-2 mx-5" id="id${index}" style="width: 19rem; height:100%;">
            <div class="card-body">
               <div class="impheading"><b class="markImpo" id="markImpo${index}" onclick="impo(${index})"><i class="fa fa-star-o" aria-hidden="true"></i></b>
               <b class="markImpofill" id="markImpofill${index}" onclick="fillimpo(${index})"><i class="fa fa-star" aria-hidden="true"></i></b>
               <b id="${index}" onclick="deleteNote(this.id)" class="markImpo"><i class="fa fa-times" aria-hidden="true"></i></b>
               </div>
               <h3 class="card-title" id="cTitle">${element.title} </h3>
                 <p class="card-text" id="editIt${index}" onmouseover="editText(${index})" style="font-size:18px" >${element.text}</p>
               <div class="cdbtn"> 
                   
               </div>
            </div>
      </div>`;
        }
    });

    let myntext = document.getElementById('notes');
    if (notesObj.length != 0) {
        myntext.innerHTML = html;
    }
    else {
        myntext.innerHTML = `Nothing to show! Use  "Add Note"  above section to add notes.`
    }
    importantNotes();
}
function importantNotes() {
    notesObj.forEach(function (element, index) {

        let unfill = document.getElementById('markImpo' + index);
        let fill = document.getElementById('markImpofill' + index);
        let soffill = document.getElementById('id' + index);

        if (element.isimp == "yes") {

            unfill.style.display = "none";
            fill.style.display = "inline-block";
            soffill.className = 'markedImp notecard card my-2 mx-4';
        }
        if (element.isimp == "no") {

            unfill.style.display = "inline-block";
            fill.style.display = "none";
            soffill.className = 'notecard card my-2 mx-4';
        }
    });
}
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
   
    notesObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


function impo(x) {
    let unfill = document.getElementById('markImpo' + x);
    let fill = document.getElementById('markImpofill' + x);
    let soffill = document.getElementById('id' + x);
    unfill.style.display = "none";
    fill.style.display = "inline-block";
    soffill.className = 'markedImp notecard card my-2 mx-4';
    notesObj[x].isimp = "yes";
    localStorage.setItem('notes', JSON.stringify(notesObj));
}

function fillimpo(x) {

    let unfill = document.getElementById('markImpo' + x);
    let fill = document.getElementById('markImpofill' + x);
    let soffill = document.getElementById('id' + x);
    unfill.style.display = "inline-block";
    fill.style.display = "none";
    soffill.className = 'notecard card my-2 mx-4';
    notesObj[x].isimp = "no";
    localStorage.setItem('notes', JSON.stringify(notesObj));
}

// let editText = document.querySelector('');
// editText.addEventListener('mouseover', function () {
//               console.log('yes mouse over is work');
// });

function editText(index) {
    // console.log("it is editText");
    // console.log(element);
    let editId = document.getElementById('editIt' + index);
    let editText = document.createElement('textarea');
    editText.className = "card-text textAreas form-control";
    editText.id = `textArea${index}`;
    editText.innerText = editId.innerText;
    editText.setAttribute('onmouseleave', `saveText(${index})`)
    editText.setAttribute('rows', '4');
    // editText.setAttribute('cols','25');
    // editText.innerText= `<textarea class="card-text" id="textArea${index}">${editId.innerText}</textarea>`;
    editId.replaceWith(editText);
    // onmouseover="editText(${index})"
    // editText.innerHTML.replace('<p>',"<textarea>");
    // editText.innerHTML.replace('</p>',"</textarea>");
}

function saveText(index) {
    let tValue = document.getElementById('textArea' + index);
    let textArea = document.getElementById('textArea' + index)
    let editId = document.createElement('p');
    editId.className = "card-text";
    editId.id = `editIt${index}`;
    editId.setAttribute('onmouseover', `editText(${index})`);
    notesObj[index].text = tValue.value;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // console.log(notesObj[index]);
    textArea.replaceWith(editId);
    editId.innerText = notesObj[index].text;

}

let search = document.getElementById('inputText');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function (element) {

        let cardTaxt = element.getElementsByTagName('p')[0].innerText;

        if (cardTaxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });

});

