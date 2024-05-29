import OrdersController from '../controllers/ordersController';

export default (app) => {
  app.get('/orders/list/:id', OrdersController.get);
  app.get('/orders/list-all', OrdersController.get);
  app.post('/orders/create', OrdersController.persist);
  app.post('/orders/update/:id', OrdersController.persist);
  app.post('/orders/destroy/:id', OrdersController.destroy);
};
