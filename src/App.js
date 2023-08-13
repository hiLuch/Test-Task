import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import store from './redux/store';
import Layout from './layout/Layout';
import Main from './pages/main/Main';
import ShoppingCart from './components/shopping-cart/ShoppingCart';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/card" element={<ShoppingCart />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
