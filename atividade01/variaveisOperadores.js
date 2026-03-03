
function calcular(){
    var num1 = parseFloat(document.getElementById('n1').value) || 0;
    var num2 = parseFloat(document.getElementById('n2').value) || 0;
    var operacao = document.getElementById('operations').value;
    var resultado;

    switch(operacao){
        case 'sum':
            resultado = num1 + num2;
            break;
        case 'sub':
            resultado = num1 - num2;
            break;
        case 'div':
            resultado = num2 != 0 ? num1 / num2 : "Erro";
            break;
        case 'mult':
            resultado = num1 * num2;
            break;
    }

    document.getElementById('resultado').value = resultado;
}