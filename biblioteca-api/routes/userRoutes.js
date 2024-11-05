const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ajuste o caminho se necessário
const bcrypt = require('bcrypt');

// Criar um novo usuário
router.post('/', async (req, res) => {
    const { name, email, password, userType, nif, rm, phone } = req.body;

    // Validação básica
    if (!name || !email || !password || !userType) {
        return res.status(400).send({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verifique se o email já está em uso
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'E-mail já está em uso.' });
        }

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            userType,
            nif,
            rm,
            phone
        });

        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao cadastrar, tente novamente.', error });
    }
});

// Obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter usuários.', error });
    }
});

// Atualizar um usuário existente
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar o usuário.', error });
    }
});

// Deletar um usuário
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }
        res.send({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao deletar o usuário.', error });
    }
});

module.exports = router;
