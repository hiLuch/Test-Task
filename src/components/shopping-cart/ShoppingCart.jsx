import React, { useEffect, useState } from 'react';
import style from './ShoppingCart.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeleteProductFromCard,
  setUpdateProductCard,
} from '../../redux/pruductSlice';

export default function ShoppingCart() {
  const [total, setTotal] = useState({});
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsSlice.productsInCard);

  // расчет итоговой суммы и количества товаров
  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    products.forEach((item) => {
      totalPrice += item.quantity
        ? Number(item.gprice) * item.quantity
        : Number(item.gprice);

      totalQuantity += item.quantity ? Number(item.quantity) : 1;
    });
    setTotal({ totalPrice, totalQuantity });
  }, [products]);

  // изменение количетсва и суммы товаров
  const handleChangeProductQuantity = (productId, quantity, totalAmount) => {
    dispatch(
      setUpdateProductCard({
        productId: productId,
        quantity: quantity,
        totalAmount: totalAmount,
      })
    );
  };

  // удаление товара из корзины
  const handleRemoveProduct = (productId) => {
    dispatch(setDeleteProductFromCard({ productId: productId }));
  };

  // оформление заказа - результат ответа отображен в консоли разработчика ( f12 )
  const handleMakeAnOrder = (products) => {
    dispatch({ type: 'POST_MAKE_AN_ORDER', products: products });
  };

  return (
    <div className={style.body}>
      <div className={style.productsContainer}>
        <table className={style.todoTable}>
          <thead>
            <tr>
              <th colSpan="6">
                <h4 style={{ textAlign: 'center' }}> Корзина товаров </h4>
              </th>
            </tr>
            <tr>
              <th>id</th>
              <th>Название товара</th>
              <th>Цена</th>
              <th>Указать количество</th>
              <th>Сумма</th>
              <th>
                <Link to="/">
                  <span className="link-btn">Выход </span>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((item, index) => (
                <tr key={index}>
                  <td>{item.gid}</td>
                  <td>{item.gname}</td>
                  <td>{item.gprice}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity || 1}
                      min="1"
                      max="10"
                      onChange={(el) =>
                        handleChangeProductQuantity(
                          item.gid,
                          el.target.value,
                          item.gprice * (item.quantity ? item.quantity : 1)
                        )
                      }
                    />
                  </td>
                  <td>
                    {item.quantity
                      ? item.gprice * item.quantity
                      : item.priceInQuantity
                      ? item.priceInQuantity
                      : item.gprice}
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemoveProduct(item.gid)}
                      className="order-btn"
                    >
                      удалить
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan="6">
                  <p style={{ textAlign: 'center', fontWeight: '300' }}>
                    Корзина пуста, нажмите выход и добавьте товары
                  </p>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={style.addToCart}>
        <table className={style.todoTable}>
          <thead>
            <tr>
              <th>Количество</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{total.totalQuantity}</th>
              <th>{total.totalPrice}</th>
              <th style={{ textAlign: 'center' }}>
                <button
                  onClick={() => handleMakeAnOrder(products)}
                  className={'link-btn'}
                >
                  Оформить заказ
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
