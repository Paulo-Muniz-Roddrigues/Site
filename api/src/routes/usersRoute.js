import UsersController from '../controllers/usersController';

export default (app) => {
  app.get('/users/list/:id', UsersController.get);
  app.get('/users/list-all', UsersController.get);
  app.post('/users/create', UsersController.persist);
  app.post('/users/register', UsersController.register);
  app.post('/users/update/:id', UsersController.persist);
  app.post('/users/login', UsersController.login);
  app.post('/users/destroy/:id', UsersController.destroy);
};
