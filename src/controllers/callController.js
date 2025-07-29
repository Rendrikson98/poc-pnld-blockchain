const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { deployMasterContract, fase1_receberMetadados } = require('./smartContractController');

// Rota para "receber metadados do edital"
const receberMetadadosEdital = async (req, res) => {
  try {
    const { id_edital, title, year, url_document, ator, contas_editoras } = req.body;

    if (!contas_editoras || !Array.isArray(contas_editoras)) {
      return res.status(400).json({ message: 'O campo "contas_editoras" é obrigatório e deve ser um array.' });
    }

    // 1. Deploy do contrato mestre, que por sua vez já cria o contrato da fase 1
    const contractAddress = await deployMasterContract(contas_editoras, id_edital);
    console.log(`Contrato Mestre implantado em: ${contractAddress}`);

    // 2. Enviar os metadados para o contrato mestre
    const timestamp = Math.floor(Date.now() / 1000);
    await fase1_receberMetadados(id_edital, title, year, url_document, timestamp);
    console.log('Metadados enviados para o contrato da Fase 1.');

    // 3. Armazenar o evento no banco de dados
    const novoEvento = await prisma.tb_phase_call.create({
      data: {
        call_id: id_edital,
        title: title,
        year: year,
        document_url: url_document,
        event_type: 'Receive',
        actor: ator,
        contract_address: contractAddress, // Salva o endereço do contrato mestre
      },
    });

    res.status(201).json(novoEvento);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Não foi possível armazenar os metadados do edital.', error: error.message });
  }
};


const alterarEdital = async (req, res) => {
  try {
    const { event_id } = req.params; // Usando o event_id que é a chave primária
    const { old_values, new_values, ator } = req.body;

    const eventoAtualizado = await prisma.tb_phase_call.update({
      where: {
        event_id: parseInt(event_id), // Cláusula 'where' para encontrar o registro pelo ID
      },
      data: {
        title: new_values.title,
        year: new_values.year,
        document_url: new_values.url_document,
        old_values: old_values,
        new_values: new_values,
        event_type: 'Update',
        actor: ator,
      },
    });

    res.status(200).json(eventoAtualizado);
  } catch (error) {
    console.log(error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ message: `Nenhum registro encontrado com o event_id: ${req.params.event_id}` });
    }
    res.status(500).json({ message: 'Não foi possível registrar a alteração do edital.', error });
  }
};

// Rota para "Enviar metadados do Edital para próxima fase"
const enviarParaProximaFase = async (req, res) => {
    try {
        const { event_id } = req.params;
        const { ator } = req.body;
    
        const eventoProximaFase = await prisma.tb_phase_call.update({
          where:{
            event_id: parseInt(event_id)
          },
          data: {
            event_type: 'Forward', 
            actor: ator,         
          },
        });
    
        res.status(201).json(eventoProximaFase);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Não foi possível enviar os metadados para a próxima fase.' });
      }
};

// Rota para visualizar todas as informações
const visualizarInformacoes = async (req, res) => {
  try {
    const todosEventos = await prisma.tb_phase_call.findMany({
        orderBy: {
            created_at: 'desc' 
        }
    });
    res.status(200).json(todosEventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível buscar as informações.' });
  }
};

module.exports = {
  receberMetadadosEdital,
  alterarEdital,
  enviarParaProximaFase,
  visualizarInformacoes,
};
