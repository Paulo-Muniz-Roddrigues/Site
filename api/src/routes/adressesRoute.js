import AdressesController from '../controllers/adressesController';

export default (app) => {
  app.get('/adresses/list/:id', AdressesController.get);
  app.get('/adresses/list-all', AdressesController.get);
  app.post('/adresses/create', AdressesController.persist);
  app.post('/adresses/update/:id', AdressesController.persist);
  app.post('/adresses/destroy/:id', AdressesController.destroy);
};
