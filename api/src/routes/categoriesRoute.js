import CategoriesController from '../controllers/categoriesController';

export default (app) => {
  app.get('/categories/list/:id', CategoriesController.get);
  app.get('/categories/list-all', CategoriesController.get);
  app.post('/categories/create', CategoriesController.persist);
  app.post('/categories/update/:id', CategoriesController.persist);
  app.post('/categories/destroy/:id', CategoriesController.destroy);
};
