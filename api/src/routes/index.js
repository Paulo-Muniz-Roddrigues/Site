import UsersRoute from './usersRoute';
import PaymentsRoute from './paymentsRoute';
import CupomsRoute from './cupomsRoute';
import CategoriesRoute from './categoriesRoute';
import AdressesRoute from './adressesRoute';
import ProductsRoute from './productsRoute';
import OrdersRoute from './ordersRoute';
import OrdersProductsRoute from './ordersProductsRoute';

function Routes(app) {
  UsersRoute(app);
  PaymentsRoute(app);
  CupomsRoute(app);
  CategoriesRoute(app);
  AdressesRoute(app);
  ProductsRoute(app);
  OrdersRoute(app);
  OrdersProductsRoute(app);
}

export default Routes;
