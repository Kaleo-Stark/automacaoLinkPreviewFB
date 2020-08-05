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

async function irPaginaEPublicar(linkPagina, linkPublicacao, pagina) { // FUNÇÃO DE NAVEGAR E PUBLICAR NA PAGINA   
    console.log('Navegando para a página e esperando 3s ...');
    await pagina.goto(linkPagina); // ..................................... NAVEGA PARA A PÁGINA NO LOCAL DE PUBLICAÇÃO.
    await pagina.waitFor(3000); // ........................................ ESPERA 3 SEGUNDOS PARA QUE TENHAMOS QUE A PÁGINA CARREGOU.
    
    console.log('Clicando para escrever a publicação e esperando 3s ...');
    await pagina.click('[aria-label="Escreva uma publicação..."]'); // .... CLICA NO CAMPO DE PUBLICAÇÃO.
    await pagina.waitFor(3000); // ........................................ ESPERA 3 SEGUNDOS.
    
    console.log('Escrevendo publicação, e esperando 3s ...');
    await pagina.keyboard.type(linkPublicacao); // ........................ ESCREVE O LINK DA POSTAGEM QUE DEVE APARECER O PREVIEW.
    await pagina.waitFor(3000);

    /*
    OBS: Quando escrevemos o link da postagem o preview não aparece, o preview so aparece quando colamos um link
         na area de texto então para resolver esse problema vamos selecionar o link, recortar e colar, assim o
         preview irá aparecer.
    */

    await pagina.keyboard.down('ControlLeft'); // ......................... APERTA A TECLA CONTROL E "SEGURA".
    await pagina.keyboard.press('a'); // .................................. APERTA A TECLA a, ASSIM SELECIONANDO TODO O LINK. 
    await pagina.keyboard.up('ControlLeft'); // ........................... "SOLTA" A TECLA CONTROL.

    await pagina.keyboard.down('ControlLeft'); // ......................... APERTA A TECLA CONTROL E "SEGURA".
    await pagina.keyboard.press('x'); // .................................. APERTA A TECLA x, ASSIM RECORTANDO O LINK SELECIONADO.
    await pagina.keyboard.up('ControlLeft'); // ........................... "SOLTA" A TECLA CONTROL.

    await pagina.keyboard.down('ControlLeft'); // ......................... APERTA A TECLA CONTROL E "SEGURA".
    await pagina.keyboard.press('v'); // .................................. APERTA A TECLA v, ASSIM COLANDO O LINK RECORTADO.
    await pagina.keyboard.up('ControlLeft'); // ........................... "SOLTA" A TECLA CONTROL.

    console.log('Esperando preview, 1 min ...')
    await pagina.waitFor(60000); // ....................................... ESPERA 1 MIN PARA QUE O PREVIEW SEJA CARREGADO.
    
    console.log('Tirando uma foto de como ficou ...')
    await pagina.screenshot({ path: 'postComPreview.png' }); // .................. TIRA UMA FOTO DA TELA PARA VER COMO ESTÁ O POST ANTES DE PUBLICAR.

    console.log('Postando e esperando 1 minuto ...')
    await pagina.click('button._1mf7'); // ................................ CLICA NO BOTÃO PARA PUBLICAR.
    await pagina.waitFor(60000);
    
    console.log('Post completo ;)');
}