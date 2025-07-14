const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Rota para "receber metadados do edital"
const receberMetadadosEdital = async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const { id_edital, title, year, url_document, ator } = req.body;

    const novoEvento = await prisma.tb_phase_call.create({
      data: {
        call_id: id_edital,
        title: title,
        year: year,
        document_url: url_document,
        event_type: 'Receive',
        actor: ator,
      },
    });

    res.status(201).json(novoEvento);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Não foi possível armazenar os metadados do edital.', error });
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
