/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar porta de escuta */
var server = app.listen(8080, function(){
    console.log('Servidor online na porta 8080');
});

let io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', socket => {
  console.log('Usuário conectou ...');

  socket.on('disconnect', () => {
    console.log('Usuário desconectou ...');
  });

  socket.on('msgParaServidor', function(data) {
    socket.emit(
      'msgParaCliente', 
      { apelido: data.apelido, mensagem: data.mensagem }
    );

    socket.broadcast.emit(
      'msgParaCliente', 
      { apelido: data.apelido, mensagem: data.mensagem }
    );

    if(parseInt(data.apelido_atualizado) == 0) {
      socket.emit(
        'participantesParaCliente', 
        { apelido: data.apelido, mensagem: data.mensagem }
      );

      socket.broadcast.emit(
        'participantesParaCliente', 
        { apelido: data.apelido }
      );
    }
  });
});