import CupomsController from '../controllers/cupomsController';

export default (app) => {
  app.get('/cupoms/list/:id', CupomsController.get);
  app.get('/cupoms/list-all', CupomsController.get);
  app.post('/cupoms/create', CupomsController.persist);
  app.post('/cupoms/update/:id', CupomsController.persist);
  app.post('/cupoms/destroy/:id', CupomsController.destroy);
};
