document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENU HAMBÚRGUER RESPONSIVO ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fecha o menu ao clicar em qualquer link interno
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- 2. ANIMAÇÃO DE ENTRADA SUAVE (SCROLL ANIMATION) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const checkScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };

    // Executa uma vez no início e depois a cada rolagem
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // --- 3. VALIDAÇÃO E ENVIO DE FORMULÁRIO (SEM CONTEÚDO NO HTML) ---
    const contatoForm = document.getElementById('form-contato');

    if (contatoForm) {
        contatoForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            // Feedback dinâmico e limpo para o usuário
            alert(`Obrigado pelo contato, ${name}! Nossa equipe comercial responderá em breve no e-mail: ${email}.`);
            
            contatoForm.reset(); // Limpa os campos do formulário
        });
    }
});
