module.exports.iniciaChat = function(application, req, res){
  let dadosForm = req.body;

  req.assert('apelido', 'Nome ou apelido é obrigatorio').notEmpty();
  req.assert('apelido', 'Nome ou apelido é deve conter entre 3 e 15 caracteres').len(3, 15);

  let err = req.validationErrors();

  if(err) {
    res.render('index', { validacao: err });
    return;
  }

  application.get('io').emit(
    'msgParaCliente',
    { apelido: dadosForm.apelido, mensagem: 'Acabou de entra no CHAT' }
  );

  res.render('chat', { dadosForm: dadosForm });
}