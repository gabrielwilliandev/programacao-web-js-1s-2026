const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../view')));

app.post('/enviar-dados', (req, res) => {
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
    res.send(`Sucesso! Agendamento realizado para ${nome} ${sobrenome} na clínica ${clinica} no dia ${dataconsulta} às ${horario}.`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});