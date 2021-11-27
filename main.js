const add = document.querySelector('#add');

if (localStorage.length > 0){
    for (let i = 0; i < localStorage.length; i++) {
        addNewNote(localStorage.getItem(i.toString()));
    }
}

add.addEventListener('click', ()=> addNewNote());

function addNewNote(text = ''){

    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>
    `
    const deleteBtn = note.querySelector('.delete');
    const editBtn = note.querySelector('.edit');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener('click', ()=> {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })
    deleteBtn.addEventListener('click', ()=> {
        note.remove();
        updateLS();
    })

    textArea.addEventListener('input', (e)=> {
        const {value} = e.target;
        main.innerHTML = marked(value);
        updateLS()
    })

    document.body.appendChild(note);
}

function updateLS(){
    localStorage.clear();
    const notesText = document.querySelectorAll('textarea');

    notesText.forEach((note, key) => localStorage.setItem(key.toString(), note.value));
}







