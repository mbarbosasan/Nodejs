// Refatorando código da aula anterior com Promises.

/*
  1. Obter um usuário
  2. Obter o número de telefone a partir de seu ID
  3. Obter o endereço do usuário pelo ID;
*/
// Importando um módulo interno do node.js;
const util = require('util');
const obterEnderecoAsync = util.promisify(getEndereco);

function getUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  })
}

function getTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "8599223344",
        ddd: 11,
      });
    }, 2000);
  });
}

function getEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0,
    })
  }, 2000);
}

const usuarioPromise = getUsuario();

usuarioPromise
  .then(function (usuario) {
    return getTelefone(usuario.id)
      .then(function resolverTelefone(resultado) {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id,
          },
          telefone: resultado,
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      }
    })
  }) 
  .then(function (resultado) {
  console.log(`
    Nome: ${resultado.usuario.nome},
    Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone},
  `);
  })
  .catch(function (error) {
  console.error("Erro na promise", error);
  })

// function resolverUsuario(erro, usuario) {
//   console.log("usuario", usuario);
// }

// getUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.error("Erro em usuário", error);
//     return;
//   }
//   getTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error("Erro em telefone", error);
//       return;
//     }
//     getEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error("Erro em endereco", error);
//         return;
//       }

//       console.log(`
//       Nome: ${usuario.nome},
//       Endereco: ${endereco.rua},
//       Telefone: (${telefone.ddd}) ${telefone.telefone}
//       `)
//     })
//   });

// });
