const faixasMasculinaIMC = {
    6: [13.0, 17.7, 21.1],
    7: [12.9, 17.8, 21.8],
    8: [12.9, 18.1, 22.6],
    9: [12.9, 18.5, 23.6],
    10: [12.9, 19.0, 24.6],
    11: [13.3, 19.6, 25.5],
    12: [13.6, 20.3, 26.3],
    13: [14.0, 20.9, 26.9],
    14: [14.4, 21.6, 27.5],
    15: [15.0, 22.3, 27.9],
    16: [15.5, 22.9, 28.3],
    17: [16.1, 23.5, 28.7]
}

const faixasFemininaIMC = {
    6: [13.2, 17.0, 19.3],
    7: [13.1, 17.2, 19.8],
    8: [13.0, 17.4, 20.4],
    9: [13.1, 17.9, 21.2],
    10: [13.4, 18.6, 22.3],
    11: [13.8, 19.5, 23.5],
    12: [14.3, 20.5, 24.8],
    13: [15.0, 21.6, 26.92],
    14: [15.7, 22.7, 27.5],
    15: [16.3, 23.7, 28.5],
    16: [16.8, 24.4, 29.2],
    17: [17.2, 24.8, 29.5]
}

function calcularImc(){
    const altura = document.getElementById("altura").value
    const peso = document.getElementById("peso").value
    const idade = document.getElementById("idade").value
    const opcao = document.getElementsByName("sexo")
    let selecionado = false
    let sexo;
    let tag;

    for (var i = 0; i < opcao.length; i++) {
        if (opcao[i].checked) {
          selecionado = true
          sexo = opcao[i].value
          break
        }
    }

    if (altura == "" || peso == "" || idade == "" || selecionado == false){
        window.alert("Por favor, preencha todos os campos para obter o resultado.")
    }else{
        const alturaM = parseInt(altura)/100
        const result = document.getElementById("resultado")

        const imc = peso / (alturaM**2)

        if (idade > 17){
            tag = taxa_adulto(imc)
        } else {
            if (sexo == "m"){
                tag = taxaInfantoJuvenil(idade, imc, faixasMasculinaIMC)
            } else {
                tag = taxaInfantoJuvenil(idade, imc, faixasFemininaIMC)
            }
        }

        if (tag == "Erro ao calcular"){
            result.innerHTML = "<h2>Resultado:</h2>" +  "<p>Ocorreu um erro ao calcular o IMC.</p>"  
        } else {
            result.innerHTML = "<h2>Resultado:</h2>" +  "<p> IMC = "+imc.toFixed(2)+"kg/m²</p>" + "<p class='tag-imc'>"+tag+"</p>"
        }
        result.scrollIntoView({ behavior: "smooth" })
    }
}

function taxa_adulto(imc){
    let tag
    switch(true){
        case (parseFloat(imc) < 18.5):
            tag = "Magreza"
            break
        case (18.5 <= parseFloat(imc) && parseFloat(imc) <= 24.9):
            tag = "Normal"
            break
        case (24.9 < parseFloat(imc) && parseFloat(imc) <= 29.9):
            tag = "Sobrepeso"
            break
        case (29.9 < parseFloat(imc) && parseFloat(imc) <= 34.9):
            tag = "Obesidade grau I"
            break
        case (34.9 < parseFloat(imc) && parseFloat(imc) <= 39.9):
            tag = "Obesidade grau II"
            break
        case (39.9 < parseFloat(imc)):
            tag = "Obesidade grau III"
            break
        default:
            tag = "Erro ao calcular"
    }
    return tag
}

function taxaInfantoJuvenil(idade, imc, faixasIMC) {

    const faixa = faixasIMC[parseInt(idade)]

    if (!faixa) {
        return "Erro ao calcular"
    }

    if (imc <= faixa[0]) {
        return "Baixo Peso"
    } else if (imc < faixa[1]) {
        return "Normal"
    } else if (imc < faixa[2]) {
        return "Sobrepeso"
    } else {
        return "Obesidade"
    }
}