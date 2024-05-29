import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Users.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Users.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  try {
    const {
      username,
      cpf,
      name,
      phone,
      passwordHash,
      role,
      email,
      recuperation,
    } = dados;

    const response = await Users.create({
      username,
      cpf,
      name,
      phone,
      passwordHash,
      role,
      email,
      recuperation,
    });

    return res.status(200).send({
      type: 'success',
      message: 'Cadastro realizado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops! não foi possivel criar',
      response: error.message,
    });
  }
};

const update = async (id, dados, res) => {
  const response = await Users.findOne({ where: { id } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => { response[field] = dados[field]; });

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      login,
      cpf,
      name,
      phone,
      password,
      role,
      email,
      recuperation,
    } = req.body;
    const response = await Users.findOne({
      where: {
        username: login,
      },
    });
    if (response) {
      throw new Error('Username já foi utilizado!');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    Users.create({
      username: login,
      cpf,
      name,
      phone,
      passwordHash,
      role,
      email,
      recuperation,
    });
    return res.status(200).send({
      message: 'Dados enviados',
      data: [],
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      where: {
        login: username,
      },
    });
    if (!user) {
      throw new Error('Usuario ou senha inválidos');
    }

    const { passwordHash } = user;
    const resposta = await bcrypt.compare(password, passwordHash);

    if (resposta) {
      const token = jwt.sign({ userId: user.id, userName: user.name }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
      return res.status(400).send({
        token,
      });
    }
    return res.status(400).send({
      message: 'Usuario ou senha inválidos',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await Users.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  register,
  login,
  destroy,
};
