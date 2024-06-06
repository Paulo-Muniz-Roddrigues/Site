// import jwt from 'jsonwebtoken';
// import Users from '../models/Users';

// // eslint-disable-next-line consistent-return
// export default async (req, res, next) => {
//   try {
//     const token = req.headers.authorization || null;
//     // eslint-disable-next-line eqeqeq
//     if (!token || token == 'Bearer') {
//       return res.status(401).send({
//         message: 'Não Autorizado',
//       });
//     }
//     // eslint-disable-next-line no-unused-vars
//     const [_, tokenLimpo] = token.split(' ');

//     const decodedToken = jwt.verify(tokenLimpo, process.env.PRIVATE_KEY);

//     if (!decodedToken) {
//       return res.status(401).send({
//         message: 'Não Autorizado',
//       });
//     }
//     if (decodedToken.exp < (Date.now() / 1000)) {
//       return res.status(401).send({
//         message: 'Token expirado, faça login!',
//       });
//     }

//     const users = await Users.findOne({
//       where: {
//         id: decodedToken.userId,
//       },
//     });
//     if (!users) {
//       return res.status(401).send({
//         message: 'Conta incorreta!',
//       });
//     }
//     next();
//   } catch (error) {
//     return res.status(401).send({
//       message: 'Ops! erro de verificação',
//     });
//   }
// };
