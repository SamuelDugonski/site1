const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const emailRecebimento = 'samueldugoguimaraes@gmail.com';

app.post('/send-feedback', (req, res) => {
    const { nome, contato, estrelas, feedback } = req.body;

    // Configuração do transporte de email
    const transporter = nodemailer.createTransport({
        service: 'seu_servico_de_email',
        auth: {
            user: 'clientediferencial@gmail.com',
            pass: 'ClienteDiferencial123'
        }
    });

    // Conteúdo do email
    const assunto = `${nome} - email/numero: ${contato}`;
    const corpoEmail = `Nome: ${nome}\nEmail/Numero: ${contato}\nEstrelas: ${estrelas}\nFeedback: ${feedback}`;

    const mailOptions = {
        from: 'seu_email@example.com',
        to: emailRecebimento,
        subject: assunto,
        text: corpoEmail
    };

    // Envio do email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar o email');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Email enviado com sucesso');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


const assunto = `${nome} - email/numero: ${contato}`;
const corpoEmail = `Nome: ${nome}\nEmail/Numero: ${contato}\nEstrelas: ${estrelasSelecionadas}\nFeedback: ${feedback}`;