/*
  1. Obter um usuário
  2. Obter o número de telefone a partir de seu ID
  3. Obter o endereço do usuário pelo ID;
*/

function getUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: "Aladin",
      dataNascimento: new Date(),
    });
  }, 1000);
}

function getTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: "8599223344",
      ddd: 11,
    });
  }, 2000);
}

function getEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0,
    })
  }, 2000);
}

function resolverUsuario(erro, usuario) {
  console.log("usuario", usuario);
}

getUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error("Erro em usuário", error);
    return;
  }
  getTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("Erro em telefone", error);
      return;
    }
    getEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error("Erro em endereco", error);
        return;
      }

      console.log(`
      Nome: ${usuario.nome},
      Endereco: ${endereco.rua},
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      `)
    })
  });

});
