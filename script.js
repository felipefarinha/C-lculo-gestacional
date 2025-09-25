const dataHoje = new Date();
let dataInicial;

const button = document.querySelector('#btnCalc')

// === Configuração da data inicial ===
button.addEventListener('click', getValueOfDateStart)

function getValueOfDateStart() {
  
  const dateStart = document.querySelector('#dateStart').value

  const [ano, mes, dia] = dateStart.split('-').map(Number)
  dataInicial = new Date(ano, mes - 1, dia)
  
  const { meses, semanasRestantes, semanasCorridas } = diferencaMesesSemanas(dataInicial, dataHoje);

  const dataParto38 = new Date(dataInicial); dataParto38.setDate(dataParto38.getDate() + 38 * 7)
  const dataParto39 = new Date(dataInicial); dataParto39.setDate(dataParto39.getDate() + 39 * 7)
  const dataParto40 = new Date(dataInicial); dataParto40.setDate(dataParto40.getDate() + 40 * 7)

   const f = d => d.toLocaleDateString("pt-BR", { day:"2-digit", month:"2-digit", year:"numeric" })

  const objResult = {
    dataHoje,
    dataInicial,
    meses,
    semanasRestantes,
    semanasCorridas,
    dataParto38: f(dataParto38),
    dataParto39: f(dataParto39),
    dataParto40: f(dataParto40)
  }
  
  print(objResult, 'messageCalc')
}

// Função para calcular diferença em meses e semanas
function diferencaMesesSemanas(dataInicial, fim) {
  let anos = (fim.getFullYear()) - dataInicial.getFullYear();
  let meses = fim.getMonth() - dataInicial.getMonth() + anos * 12;

  // Se ainda não passou o dia do mês, tira 1 mês
  if (fim.getDate() < dataInicial.getDate()) meses -= 1;

  // Ajusta para calcular dias restantes
  let dataParcial = new Date(dataInicial);
  dataParcial.setMonth(dataInicial.getMonth() + meses);

  let diasRestantes = Math.floor((fim - dataParcial) / (1000 * 60 * 60 * 24));
  let semanasRestantes = Math.floor(diasRestantes / 7);

  // Função para calcular diferença total em semanas corridas
  let diffDias = Math.floor((fim - dataInicial) / (1000 * 60 * 60 * 24));
  const semanasCorridas = Math.floor(diffDias / 7);

  return { meses, semanasRestantes , semanasCorridas }
}

function print(objResult, id) {
  
  const {dataHoje, dataInicial, meses, semanasRestantes, semanasCorridas, dataParto38, dataParto39, 
dataParto40} = objResult
  const messageCalc = document.querySelector(`#${id}`)
  const message = `
          Hoje: ${dataHoje.toLocaleDateString("pt-BR")}
          Data da fecundação : ${dataInicial.toLocaleDateString("pt-BR")}
          Tempo de gestação: ${meses} meses e ${semanasRestantes} semanas (${semanasCorridas} semanas)
          
          Com 38 semanas, estimasse o parto no dia: ${dataParto38.toString()}
          Com 39 semanas, estimasse o parto no dia: ${dataParto39.toString()}
          Com 40 semanas, estimasse o parto no dia: ${dataParto40.toString()}
  `
  messageCalc.innerText = message
}
  