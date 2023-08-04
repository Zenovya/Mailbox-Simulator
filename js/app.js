document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#formulario');
    const emailIn = document.querySelector('#email');
    const titleIn = document.querySelector('#asunto');
    const messageIn = document.querySelector('#mensaje');

    emailIn.addEventListener('blur', valid);
    titleIn.addEventListener('blur', valid);
    messageIn.addEventListener('blur', valid);


    function valid(e) {

        if (e.target.value.trim() === '') {
            alert(`(!) El campo ${e.target.id} es obligatorio.`);
        } else {
            
        }
    }

    function alert(msg) {
        const error = document.createElement('P');
        error.textContent = msg;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        form.appendChild(error)
    }

});