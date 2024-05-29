import PaymentsController from '../controllers/paymentsController';

export default (app) => {
  app.get('/payments/list/:id', PaymentsController.get);
  app.get('/payments/list-all', PaymentsController.get);
  app.post('/payments/create', PaymentsController.persist);
  app.post('/payments/update/:id', PaymentsController.persist);
  app.post('/payments/destroy/:id', PaymentsController.destroy);
};
