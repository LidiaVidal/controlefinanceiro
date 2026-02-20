var dados = []

function subirDados(event) {
    event.preventDefault()
    var descricao = document.getElementById('descricao')
    var valor = document.getElementById('valor')
    var tipo = document.getElementById('tipo')
    var tabela = document.getElementById('tbody')

    if (descricao.value == "" || valor.value == "" || tipo.value == "") {
        window.alert('Digite todas as informações necessárias')
    } else {
        var novoDado = {
        descricao: descricao.value,
        valor: valor.value, 
        tipo: tipo.value
    }

    dados.push(novoDado)
    var dadoTabela = [novoDado.descricao, novoDado.valor, novoDado.tipo]
    var linha = document.createElement('tr')

    for(var i = 0; i < dadoTabela.length; i++) {
        var item = document.createElement('td')
        item.innerHTML = dadoTabela[i]
        linha.appendChild(item)
    }
    
    tabela.appendChild(linha)
    }


    descricao.value = "";
    valor.value= ""
    tipo.value= ""
}

function filtro() {
    var lisEnt = document.getElementById('lisEnt')
    var lisDes = document.getElementById('lisDes')
    var mostrarSaldo = document.getElementById('mostrarSaldo')

    lisEnt.innerHTML = '';
    lisDes.innerHTML = '';

    const listaEntrada = dados.filter(dado => dado.tipo == 'entrada')
    const listaDespesa = dados.filter(dado => dado.tipo == 'despesa')

    for(var i = 0; i < listaEntrada.length; i++) {
        var itemListaEnt = document.createElement('li')
        itemListaEnt.innerHTML = listaEntrada[i].descricao + " - R$" + listaEntrada[i].valor
        lisEnt.appendChild(itemListaEnt)
    }

    for (var i = 0; i < listaDespesa.length; i++) {
        var itemListaDes = document.createElement('li')
        itemListaDes.innerHTML = listaDespesa[i].descricao + " - R$" + listaDespesa[i].valor
        lisDes.appendChild(itemListaDes)
    }

    const totalEntrada = listaEntrada.reduce((acumulador, atual) => {
        const total = Number(acumulador) + Number(atual.valor)
        return total
    }, 0)

    const totalDespesa = listaDespesa.reduce((acumulador, atual) => {
        const total = Number(acumulador) + Number(atual.valor)
        return total
    }, 0)

    var saldo = totalEntrada - totalDespesa
    if (saldo < 0) {
        mostrarSaldo.style.color = 'red'
    } else if (saldo > 0) {
        mostrarSaldo.style.color = 'green'
    }
    mostrarSaldo.innerHTML = `Saldo atual: ${saldo.toLocaleString('pt-br', {
        style: 'currency', currency: 'BRL'
    })}`
}


