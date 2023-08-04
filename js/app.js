document.addEventListener('DOMContentLoaded', function () {
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    const emailIn = document.querySelector('#email');
    const titleIn = document.querySelector('#asunto');
    const messageIn = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')

    //Generando evento blur para cada input
    emailIn.addEventListener('input', valid);
    titleIn.addEventListener('input', valid);
    messageIn.addEventListener('input', valid);


    function valid(e) {
        if (e.target.value.trim() === '') {
            alert(`(!) El campo ${e.target.id} es obligatorio.`, e.target.parentElement);
            email[e.target.name] = '';
            submitValid();
            return;
        }

        if(e.target.id === 'email' && !validEmail(e.target.value)){
            alert('(!) El Email no es valido.', e.target.parentElement);
            email[e.target.name] = '';
            submitValid();
            return;
        }

        //Borrando alertas
        clearAlert(e.target.parentElement);

        //asignar datos
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Comprobando para activar el btn de enviar
        submitValid();
    }

    function alert(msg, div) {
        clearAlert(div);

        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = msg;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //Inyectar el error al formulario
        div.appendChild(error)
    }

    function clearAlert(ref){
        //Comprueba si ya existe
        const clear = ref.querySelector('.bg-red-600');
        if(clear){
            clear.remove();
        }
    }

    function validEmail(email){
        //Expresion regular de Emails
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }
    
    function submitValid(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }


});