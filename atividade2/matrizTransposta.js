function transporMatriz(a){
    let linhas = a.length;
    let colunas = a[0].length;
    
    let transposta = [];

    for(let i = 0; i < colunas; i++){
        transposta[i] = []
        for(let j = 0; j < linhas; j++){
            transposta[i][j] = a[j][i]
        }
    }
    return transposta;
}

let matriz = [
  [1, 2, 3],
  [4, 5, 6]
];

let resultado = transporMatriz(matriz);

console.log(resultado);