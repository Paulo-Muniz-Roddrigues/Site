import ProductsController from '../controllers/productsController';

export default (app) => {
  app.get('/products/list/:id', ProductsController.get);
  app.get('/products/list-all', ProductsController.get);
  app.post('/products/create', ProductsController.persist);
  app.post('/products/update/:id', ProductsController.persist);
  app.post('/products/destroy/:id', ProductsController.destroy);
};
