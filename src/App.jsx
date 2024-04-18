import { useEffect, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { TiDelete } from "react-icons/ti";

import './App.css'

function App() {
  const [input, setInput] = useState('')
  let [valor, setValor] = useState(0)
  const [entradaCheck, setEntradaCheck] = useState('Receita')
  let [icon, setIcon] = useState(<TiDelete className='icon' />)
  let [financas, setFinancas] = useState([])
  let [receita, setReceita] = useState(0)
  let [despesas, setDespesas] = useState(0)
  let [saldo, setSaldo] = useState(0)

  function addTransacao(item, valor) {
    let arrayTemporario = [...financas, {
      id: financas.length + 1,
      nome: item,
      valor: Number(valor),
      entrada: entradaCheck === 'Receita' ? true : false,
      icon: icon,
    }]

    setFinancas(arrayTemporario)
    if (entradaCheck === 'Receita') {
      setReceita(Number(valor) + Number(receita))
      setSaldo(Number(valor) + Number(receita))
      return
    }

    if (entradaCheck === 'Despesas') {
      setDespesas(Number(valor) + Number(despesas))
      setSaldo(Number(saldo) - Number(valor))
      return
    }
  }
  const handlerSub = (e) => {
    if (input === '') {
      alert('Preencha uma transação')
      return
    }
    e.preventDefault()
    setInput('')
    setValor(0)
    addTransacao(input, valor)
  }

  function deleteTransacao(index) {
    const arrayTempo = [...financas.slice()]

    arrayTempo.splice(index, 1)

    if (financas[index].entrada) {
      setReceita(receita - financas[index].valor)
      setSaldo(saldo = receita - despesas)
    }
    if (!financas[index].entrada) {
      setDespesas(despesas - financas[index].valor)
      setSaldo(saldo = receita - despesas)
    }
      setFinancas(arrayTempo)


  }


  return (
    <div className='containerGeral'>
      <div className='container'>
        <header className='headerContainer'>
          <h1>Controle de Despesas</h1>
        </header>

        <div className='saldoContainer'>
          <h4>SALDO ATUAL</h4>
          <p>R$ {saldo}</p>
        </div>

        <div className='receitaContainer'>
          <div className='card_valores entrada'>
            <h4>RECEITAS</h4>
            <p>R$ {receita}</p>
          </div>
          <div className='card_valores despesas'>
            <h4>DESPESAS</h4>
            <p>R$ -{despesas}</p>
          </div>
        </div>
        <div className='transacao'>
          <h4>Transações</h4>
        </div>
        <div className='transacaoContainer'>
          {financas && financas.map((item, index) => (
            item.entrada
              ? <span key={item.id} className='transacoesPositivas'>
                <p>{item.nome}</p>
                <div className='containerIcon'>
                  <p>{item.valor}</p>
                  <button className='iconDel' onClick={() => deleteTransacao(index)}>
                    <p>{item.icon}</p>
                  </button>

                </div>
              </span>
              : null
          ))}

          {financas && financas.map((item, index) => (
            item.entrada
              ? null
              : <span key={item.id} className='transacoesNegativas'>
                <p>{item.nome}</p>
                <div className='containerIcon'>
                  <p>{item.valor}</p>
                  <button className='iconDel' onClick={() => deleteTransacao(index)}>
                    <p>{item.icon}</p>
                  </button>
                </div>
              </span>
          ))}

        </div>

        <div className='transacao'>
          <h4>Adicionar transação</h4>
        </div>
        <form className='formContainer' onSubmit={handlerSub}>
          <label>Nome:</label>
          <div className='inputContainer'>
            <input type="text" name='financas' value={input} onChange={(text) => setInput(text.target.value)} placeholder='Nome da transação' />
            <select onClick={(e) => setEntradaCheck(e.target.value)}>
              <option name="receita">Receita</option>
              <option name="despesas">Despesas</option>
            </select>
          </div>
          <label>Valor</label>
          <CurrencyInput
            className='inputValor'
            name="valor"
            value={valor}
            placeholder="Digite um valor"
            prefix='R$'
            decimalsLimit={2}
            onValueChange={(value) => setValor(value)}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          />
          <button type="submit">ADICIONAR</button>
        </form>
      </div >
    </div>
  )
}

export default App
