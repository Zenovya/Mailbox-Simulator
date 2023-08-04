document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('#formulario')
    const emailIn = document.querySelector('#email');
    const ccIn = document.querySelector('#cc');
    const titleIn = document.querySelector('#asunto');
    const messageIn = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spin = document.querySelector('#spinner');
    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }
    
    //Generando eventos para cada campo
    emailIn.addEventListener('input', valid);
    ccIn.addEventListener('input', valid)
    titleIn.addEventListener('input', valid);
    messageIn.addEventListener('input', valid);
    form.addEventListener('submit', spinner);
    btnReset.addEventListener('click', resetForm);

    function spinner(e){
        e.preventDefault();

        spin.classList.add('flex');
        spin.classList.remove('hidden');

        //Delay para desaparecer el spinner
        setTimeout(()=>{
            spin.classList.add('hidden');
            spin.classList.remove('flex');
            
            //Reiniciando form
            resetForm();

            //Alerta de exito
            const alertGz = document.createElement('P');
            alertGz.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertGz.textContent = 'Mensaje enviado correctamente';
            form.appendChild(alertGz);

            setTimeout(()=>{
                alertGz.remove();
            },2000);

        }, 2500);
    }

    function valid(e) {
        if (e.target.value.trim() === '' && e.target.id !== 'cc') {
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

        if(e.target.id === 'cc' && e.target.value !== ''){
            if(!validEmail(e.target.value)){
                alert('(!) El Email no es valido.', e.target.parentElement);
                email[e.target.name] = '';
                submitValid();
                return;
            }
        } 

        //Borrando alertas
        clearAlert(e.target.parentElement);

        //asignar datos
        email[e.target.name] = e.target.value.trim().toLowerCase();
        email.cc = 'null';

        //Comprobando para activar el btn de enviar
        submitValid();
        console.log(email);
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

    function resetForm(){
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';

        form.reset();
        submitValid();
    }

});