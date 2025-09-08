require('dotenv').config();
const express = require('express');
const callRoutes = require('./routes/callRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá Mundo');
});

app.use('/api/edital', callRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/avaliacao', avaliacaoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
