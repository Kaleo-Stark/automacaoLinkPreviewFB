const puppeteer = require('puppeteer'); // IMPORTAÇÃO DA BIBLIOTECA PUPPETER

const login = ''; // ...................... LOGIN PARA LOGAR NO FACEBOOK.

const senha = ''; // ...................... SENHA PARA LOGAR NO FACEBOOK.

const linkPagina = ''; // ................. LINK DA PAGINA DO FACEBOOK, LINK JÁ NA AREA DE POSTAGEM.
// Exemplo: 'https://web.facebook.com/pg/<REFERENCIA DA PAGINA>/posts/?ref=page_internal'.

const linkPublicacao = ''; // ............. LINK DA PAGINA WEB COM O CONTEÚDO QUE DESEJA PUBLICAR O PREVIEW
// Exemplo: 'https://linkPublicacao.com.br/publicao.html'.

async function logarFacebook(login, senha, pagina) { // FUNÇÃO DE LOGIN NO FACEBOOK
    console.log('Navegando para o facebook ...');
    await pagina.goto('https://web.facebook.com/');  // ................... VAI PARA A PÁGINA DO FACEBOOK.

    console.log('Digitando login ...');
    await pagina.focus('#email'); // ...................................... FOCA O CURSOR NO INPUT DE LOGIN.
    await pagina.keyboard.type(login); // ................................. DIGITA O LOGIN.

    console.log('Digitando senha ...');
    await pagina.focus('#pass'); // ....................................... FOCA O CURSOR NO INPUT DE SENHA.
    await pagina.keyboard.type(senha); // ................................. DIGITA A SENHA.

    const form = await pagina.$('#login_form');  // ....................... CAPTURA O FORMULARIO DE ACESSO.

    await form.evaluate(form => form.submit()); // ........................ ENVIA LOGIN E SENHA PARA VALIDAÇÃO.
    console.log('logando')
    await pagina.waitForNavigation({ waitUntil: 'networkidle0' }); // ..... ESPERA A PAGINA NAVEGAR PARA A CONTA.
}
