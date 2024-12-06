document.addEventListener("DOMContentLoaded", function() {
    const campoSenha = document.getElementById('campo-senha');
    const caracteresElement = document.getElementById('caracteres');
    const aumentarBtn = document.getElementById('aumentar');
    const diminuirBtn = document.getElementById('diminuir');
    const checkboxes = document.querySelectorAll('.checkbox');
    const forcaElement = document.getElementById('forca');
    const entropiaElement = document.getElementById('entropia');
    const gerarSenhaBtn = document.getElementById('gerar-senha');
    
    let numCaracteres = 12;
    let maiusculo = true, minusculo = true, numero = true, simbolo = true;

    function gerarSenha() {
        let caracteres = '';
        let senha = '';
        if (maiusculo) caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (minusculo) caracteres += 'abcdefghijklmnopqrstuvwxyz';
        if (numero) caracteres += '0123456789';
        if (simbolo) caracteres += '!@#$%^&*()_+[]{}|;:,.<>?';

        for (let i = 0; i < numCaracteres; i++) {
            senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        campoSenha.value = senha;
        avaliarForca(senha);
    }

    function avaliarForca(senha) {
        let forca = 'fraca';
        let entropia = senha.length * 6;
        let temMaiusculo = /[A-Z]/.test(senha);
        let temMinusculo = /[a-z]/.test(senha);
        let temNumero = /\d/.test(senha);
        let temSimbolo = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(senha);

       
        if (senha.length > 8 && temMaiusculo && temMinusculo && temNumero && temSimbolo) {
            forca = 'forte';
            entropia += 20; 
        } else if (senha.length > 6 && ((temMaiusculo && temMinusculo) || (temNumero && temSimbolo))) {
            forca = 'media';
        }

        forcaElement.classList.remove('fraca', 'media', 'forte');
        forcaElement.classList.add(forca);

        entropiaElement.textContent = `Entropia: ${entropia} bits`;
    }

    aumentarBtn.addEventListener('click', function() {
        numCaracteres++;
        caracteresElement.textContent = numCaracteres;
        gerarSenha();
    });

    diminuirBtn.addEventListener('click', function() {
        if (numCaracteres > 4) {
            numCaracteres--;
            caracteresElement.textContent = numCaracteres;
            gerarSenha();
        }
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            maiusculo = document.querySelector('[name="maiusculo"]').checked;
            minusculo = document.querySelector('[name="minusculo"]').checked;
            numero = document.querySelector('[name="numero"]').checked;
            simbolo = document.querySelector('[name="simbolo"]').checked;
            gerarSenha();
        });
    });

    gerarSenhaBtn.addEventListener('click', gerarSenha);

    gerarSenha();
});
