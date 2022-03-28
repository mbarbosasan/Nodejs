// Refatorando o código da aula passada agora também com Asyncs e Awaits;

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
main();
async function main() {
  try {
    console.time('medida-promise');
    const usuario = await getUsuario();
    // const telefone = await getTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      getTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ])

    const endereco = resultado[1]
    const telefone = resultado[0];

    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereco: ${endereco.rua}, ${endereco.numero};
      `)

    console.timeEnd('medida-promise');
  } catch (error) {
    console.error("Erro na promise", error);
  }
}

// const usuarioPromise = getUsuario();

// usuarioPromise
//   .then(function (usuario) {
//     return getTelefone(usuario.id)
//       .then(function resolverTelefone(resultado) {
//         return {
//           usuario: {
//             nome: usuario.nome,
//             id: usuario.id,
//           },
//           telefone: resultado,
//         }
//       })
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       }
//     })
//   }) 
//   .then(function (resultado) {
//   console.log(`
//     Nome: ${resultado.usuario.nome},
//     Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone},
//   `);
//   })
//   .catch(function (error) {
//   console.error("Erro na promise", error);
//   })