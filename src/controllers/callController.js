const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const { deployMasterContract, fase1_receberMetadados, fase1_receberAlteracoes, fase1_enviarMetadadosParaFase2, fase1_consultar_edital, getFaseAddresses } = require('./smartContractController');

// Rota para "receber metadados do edital"
const receberMetadadosEdital = async (req, res) => {
  try {
    const { id_edital, title, year, url_document, ator, contas_editoras } = req.body;

    if (!contas_editoras || !Array.isArray(contas_editoras)) {
      return res.status(400).json({ message: 'O campo "contas_editoras" é obrigatório e deve ser um array.' });
    }

    // 1. Deploy do contrato mestre, que por sua vez já cria o contrato da fase 1
    const { masterContractAddress, publicationAddress } = await deployMasterContract(contas_editoras, id_edital);
    console.log(`Contrato Mestre implantado em: ${masterContractAddress}`);
    console.log(`Contrato da Fase 1 implantado em: ${publicationAddress}`);

    // 2. Enviar os metadados para o contrato mestre
    const timestamp = Math.floor(Date.now() / 1000);
    await fase1_receberMetadados(id_edital, title, year, url_document, timestamp, masterContractAddress);
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
        contract_address: publicationAddress, // Salva o endereço do contrato da fase 1
        master_contract_adress: masterContractAddress, // Salva o endereço do contrato mestre
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

    if (!old_values || !new_values || !ator) {
      return res.status(400).json({ message: 'Os campos "old_values", "new_values" e "ator" são obrigatórios.' });
    }

    const event = await prisma.tb_phase_call.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });

    const { master_contract_adress } = event

    // 2. Enviar os metadados para o contrato mestre
    const timestamp = Math.floor(Date.now() / 1000);
    await fase1_receberAlteracoes(Number(event_id), new_values.year, new_values.url_document, timestamp, master_contract_adress);

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
    const { ator, razao_social, book_id } = req.body;

    // 1. Consultar o evento no banco de dados para obter os dados necessários
    const event = await prisma.tb_phase_call.findUnique({
      where: {
        event_id: parseInt(event_id),
      },
    });

    // 2. Verificar se o evento foi encontrado
    if (!event) {
      return res.status(404).json({ message: `Nenhum registro encontrado com o event_id: ${event_id}` });
    }

    // 3. Extrair título e ano do evento
    console.log(JSON.stringify(event))
    const { master_contract_adress } = event;

    const result = await fase1_enviarMetadadosParaFase2(master_contract_adress);

    console.log(result)

    // 4. Atualizar o status do evento para "Forward"
    await prisma.tb_phase_call.update({
      where: {
        event_id: parseInt(event_id)
      },
      data: {
        event_type: 'Forward',
        actor: ator,
      },
    });

    const eventoFase2 = await prisma.tb_phase_submission.create({
      data: {
        publisher_id: Number(event_id),
        publisher_name: razao_social,
        book_id,
        book_status: 'Submetido', // Status inicial
        event_type: 'Registro de Obra',
        actor: ator,
        contract_address: result.contract2Address,
        master_contract_adress: master_contract_adress, // Endereço do contrato mestre
      },
    })

    if (!eventoFase2) {
      return res.status(500).json({ message: 'Não foi possível registrar a obra na fase 2.' });
    }

    res.status(201).json(eventoFase2);
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

const consultarEdital = async (req, res) => {
  try {
    const { masterContractAddress } = req.params;

    if (!masterContractAddress) {
      return res.status(400).json({ message: 'O endereço do contrato mestre é obrigatório.' });
    }

    const edital = await fase1_consultar_edital(masterContractAddress);

    const convertBigIntToString = (obj) => {
      const newObj = {};
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'bigint') {
          newObj[key] = Number(value.toString());
        } else {
          newObj[key] = value;
        }
      }
      return newObj;
    };

    const serializableData = convertBigIntToString(edital);

    res.status(200).json(serializableData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível consultar o edital no contrato.' });
  }
};

const consultarEnderecoFases = async (req, res) => {
  try {
    const { masterContractAddress } = req.params;

    if (!masterContractAddress) {
      return res.status(400).json({ message: 'O endereço do contrato mestre é obrigatório.' });
    }

    const faseAddresses = await getFaseAddresses(masterContractAddress);

    res.status(200).json(faseAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível consultar os endereços das fases no contrato.' });
  }
};



module.exports = {
  receberMetadadosEdital,
  alterarEdital,
  enviarParaProximaFase,
  visualizarInformacoes,
  consultarEdital,
  consultarEnderecoFases
};
