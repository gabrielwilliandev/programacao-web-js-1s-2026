const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../view')));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../view'));

app.get('/', (req, res) => {
    res.render('index.html');
});


app.post('/agendamento', (req, res) => {
    const {nome, sobrenome, datanasc, telefone, cep, endereco, clinica, especialidade, dataconsulta, horario, observacao} = req.body;
    
    for (let campo in req.body) {
        if (campo !== 'observacao' && !req.body[campo]) {
            return res.status(400).send(`O campo ${campo} é obrigatório.`);
        }
    }


    const dataAgendamento = new Date(dataconsulta);
    const dataAtual = new Date();
    
    dataAtual.setHours(0, 0, 0, 0);
    dataAgendamento.setMinutes(dataAgendamento.getTimezoneOffset());

    if (dataAgendamento <= dataAtual) {
        return res.status(400).send('Erro: A data da consulta deve ser superior à data de hoje.');
    }
    res.render('agendamento.html', {
        dados_agendamento: req.body
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});