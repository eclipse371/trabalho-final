import express from 'express'; 
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'M1nh4Chav3S3cr3t4',
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30 
  }
}));
app.use(cookieParser());

const porta = 4005;
const host = '0.0.0.0';
var user = [];
var usuarios = []; 
var vet = [];
app.get('/', (req, resp) => {
    resp.redirect('/login'); 
  });


  function menu(req, resp){
    var data = req.cookies['DataHoraUltimoAcesso'];
    if(!data){
     data = '0'
    }
    resp.send(`
        <html>
       <head>
       <meta charset="UTF-8">
       <title>Login</title>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
       </head>
       <body>
        <h2>MENU</h2>
  <form action="/cadastro" method="POST">
        <button type="submit" class="btn btn-primary">Cadastro de Usuários</button>
         </form>
         <form action="/sala" method="POST">
        <button type="submit" class="btn btn-primary">Bate-papo</button>
         </form>
         <form action="/lista" method="POST">
        <button type="submit" class="btn btn-primary">Lista</button>
         </form>
         <label>Data e hora do último acesso:</label>
         <div>${data}</data>
       </body>
       </html>
       `);
  }
  function login(req, resp){
    
    
    resp.send(`
        <html>
       <head>
       <meta charset="UTF-8">
       <title>Login</title>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
       </head>
       <body>
        <h2>Login</h2>
           <form method="POST" action="/login">
     <div class="form-group">
       <label for="exampleInputEmail1">Usuário</label>
       <input type="text" class="form-control" id="usuario"  name="usuario">
     </div>
     <div class="form-group">
       <label for="exampleInputPassword1">Senha</label>
       <input type="password" class="form-control" id="senha" name="senha">
     </div>
     <button type="submit" class="btn btn-primary">Login</button>
     <br><br>
   </form>
       </body>
       </html>
       `);
      

       }
  
  
  function cadastro(req, resp){
    resp.send(`
        <html>
        <head>
          <title>Cadastrar Produto</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
          <meta charset="UTF-8">
        </head>
        <body>
          <h2>Cadastro de Usuários</h2>
          <form method="POST" action="/lista">
            <div class="form-group">
              <label for="Nome">Nome</label>
              <input type="text" class="form-control" id="nome" placeholder="Nome" name="nome">
            </div>
            <div class="form-group">
              <label for="data">Data de nascimento</label>
              <input type="date" class="form-control" id="data" name="data">
            </div>
            <div class="form-group">
              <label for="nick">Nickname</label>
              <input type="text" class="form-control" id="nick"  name="nick">
            </div>
             <button type="submit" class="btn btn-primary">Cadastrar Usuário</button>
          </form>
        </body>
        </html>
      `);
  }
function lista(req, resp){
  const nome = req.body.nome;
   const data = req.body.data;
   const nick = req.body.nick;
 
if(req.method == 'POST'){
   if(nome && data && nick){
    const us = {nome,data,nick};

    usuarios.push({ nick });

    user.push(us);
    return resp.redirect('/lista');
   }
  }

    resp.write(`
      <html>
    <head>
    <meta charset="UTF-8">
    <title>Lista de Usuarios</title>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
   <body>
   <h2>Lista de Usuarios</h2>

   `);
   
   for(var i=0 ; i<user.length; i++){
   resp.write( `<table class="table">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Data de nascimento</th>
      <th scope="col">Nickname</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${user[i].nome}</td>
      <td>${user[i].data}</td>
      <td>${user[i].nick}</td>
    </tr>
    `);
   }
resp.write(`
     <form action="/cadastro" method="POST">
        <button type="submit" class="btn btn-primary">Continar cadastrando</button>
         </form>
         <form action="/menu" method="GET">
        <button type="submit" class="btn btn-primary">Voltar para o Menu</button>
         </form>
  </body>
</html>`);
      resp.end();
}

   
   function sala(req, resp) {

    
    resp.write(`
        <html>
            <head>
                <title>Sala</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
                <meta charset="UTF-8">
            </head>
            <body>
                <h2>Sala de bate-papo</h2>
                <form method="POST" action="/sala">
                    <label for="nick">Escolha seu nickname:</label>
                    <select name="nick" id="nick" class="form-control">
                        <option value="">Selecione um usuário</option>
    `);



    for (let i = 0; i < usuarios.length; i++) {
        resp.write(`
            <option value="${usuarios[i].nick}">${usuarios[i].nick}</option>
        `);
    }
    resp.write(`
                    </select>
                    <br>
                    <label for="msg">Mensagem</label>
                   <input type="text" class="form-control" id="msg"  name="msg" value=>
                    <form action="/sala" method="POST">
                    <button type="submit" class="btn btn-primary">Enviar a mensagem</button>
                </form>
                <br>
                <form action="/menu" method="GET">
                    <button type="submit" class="btn btn-primary">Voltar para o Menu</button>
                </form>
            </body>
        </html>
    `);
    const nick = req.body.nick;
    const msg = req.body.msg;
    if (req.method === "POST") {
      if(nick && msg){
      const data = new Date().toLocaleString();
      vet.push({ nick, msg, data});
      
      }
  }
  
    resp.write(` <html>
            <head>
                <title>Sala</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css">
                <meta charset="UTF-8">
            </head>
            <body>`);
            if(nick && msg){
            for(var i=0; i<vet.length; i++){
    resp.write(` <h3>${vet[i].nick}</h3>
      <div>${vet[i].data}</data>
            <textarea id="mensagem" name="mensagem" rows="4" cols="50" class="form-control">${vet[i].msg}</textarea>`)
          }
        }

          resp.write(` </body>
            </html>`)


    resp.end();
  }

  function autenticar(req,resp){
    const usuario  = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === 'admin' && senha === '123'){
      resp.cookie('DataHoraUltimoAcesso',new Date().toLocaleString(),{maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
    req.session.autentica = true ; 
    resp.redirect('/menu');
      }else{
 resp.send('<script>alert("Login inválido!");window.location.href="/";</script>');
    }

  }
  function logado(req, resp, next){
    if(req.session.autentica){
      next();
    }else{
      resp.redirect('/login');
    }
    }
    

    
  app.get('/login', login);
  app.post('/login', autenticar);
  app.get('/menu', logado, menu);
  app.post('/menu', logado, menu);
  app.post('/cadastro', logado, cadastro);
  app.get('/lista', logado, lista);
  app.post('/lista', logado ,lista);
  app.get('/sala', logado, sala);
 app.post('/sala', logado, sala);


  app.listen(porta, host, () =>{
    console.log(`Servidor iniciado e em execução no endereço http:// ${host}:${porta} `);
});