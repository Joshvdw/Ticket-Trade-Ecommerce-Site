let titleInput = document.getElementById('title');

let modalInput = document.getElementById('modalId');

titleInput.onchange = handleChange;

function handleChange(e) {
    modalInput.value = titleInput.value.replace(/\s+/g, '');

}