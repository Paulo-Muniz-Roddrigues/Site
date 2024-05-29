import OrdersProductsController from '../controllers/ordersProductsController';

export default (app) => {
  app.get('/ordersProducts/list/:id', OrdersProductsController.get);
  app.get('/ordersProducts/list-all', OrdersProductsController.get);
  app.post('/ordersProducts/create', OrdersProductsController.persist);
  app.post('/ordersProducts/update/:id', OrdersProductsController.persist);
  app.post('/ordersProducts/destroy/:id', OrdersProductsController.destroy);
};
