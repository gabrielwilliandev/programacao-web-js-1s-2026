const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../view'));

app.get('/', (req, res) => {
    res.render('index.html', {
        erros: [],
        dados: {}
    });
});


app.post('/agendamento', (req, res) => {

    const dados = req.body;
    const erros = [];

    const camposObrigatorios = [
    'nome',
    'sobrenome',
    'cpf',
    'datanasc',
    'telefone',
    'cep',
    'endereco',
    'clinica',
    'especialidade',
    'dataconsulta',
    'horario'
];

camposObrigatorios.forEach(campo => {
    if (!dados[campo]) {
        erros.push(`O campo ${campo} é obrigatório.`);
    }
});

    if (erros.length > 0) {
        return res.render('index.html', {
            erros,
            dados
        });
    }

    dados.isCardio = dados.especialidade === "cardiologia";
    dados.isDerma = dados.especialidade === "dermatologia";
    dados.isNeuro = dados.especialidade === "neurologia";

    const dataAgendamento = new Date(dados.dataconsulta + 'T00:00:00');
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (dataAgendamento <= dataAtual) {
        return res.status(400).send('Erro: A data da consulta deve ser superior à data de hoje.');
    }

    res.render('agendamento.html', {
        dados_agendamento: dados
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});