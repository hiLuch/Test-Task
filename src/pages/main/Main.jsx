import React from 'react';
import style from './Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setProductFilters, setProductToCard } from '../../redux/pruductSlice';
import { Link } from 'react-router-dom';

const Main = () => {
  const dispatch = useDispatch();

  // стейт с отфильтрованными товарами
  const filteredProducts = useSelector(
    (state) => state.productsSlice.filterProducts
  );

  // стейт товаров в корзине
  const productInCard = useSelector(
    (state) => state.productsSlice.productsInCard
  );

  // обновление количества и суммы товаров
  const handleProductQuantity = (index, price, quantity) => {
    const updatedProducts = filteredProducts.map((item, i) => {
      if (i === index) {
        const priceInQuantity = price * (quantity ? quantity : 1);

        return {
          ...item,
          priceInQuantity: priceInQuantity,
          quantity: quantity,
        };
      } else {
        return item;
      }
    });

    dispatch(setProductFilters(updatedProducts));
  };

  // добавление товара в корзину
  const handleAddToCard = (product) => {
    dispatch(setProductToCard(product));
  };

  return (
    <div className={style.body}>
      <div className={style.inputContainer}></div>
      <div className={style.productsContainer}>
        <table className={style.todoTable}>
          <thead>
            <tr>
              <th colSpan="6">
                <h4 style={{ textAlign: 'center' }}>
                  {filteredProducts.length ? (
                    <p>{filteredProducts[filteredProducts.length - 1]}</p>
                  ) : (
                    <p>Выберите нужную категорию товаров</p>
                  )}
                </h4>
              </th>
            </tr>
            <tr>
              <th>id</th>
              <th>Название товара</th>
              <th>Цена</th>
              <th>Указать количество</th>
              <th>Сумма</th>
              <th>
                <Link to="/card">
                  <span className="link-btn">Перейти в корзину </span>
                </Link>
              </th>
            </tr>
          </thead>
          {filteredProducts.length ? (
            filteredProducts
              .slice(0, filteredProducts.length - 1)
              .map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{item.gid}</td>
                    <td>{item.gname}</td>
                    <td>{item.gprice}</td>
                    <td>
                      <input
                        key={index}
                        type="number"
                        value={item.quantity || 1}
                        min="1"
                        max="10"
                        disabled={productInCard.some(
                          (elem) => elem.gid === item.gid
                        )}
                        onChange={(el) =>
                          handleProductQuantity(
                            index,
                            item.gprice,
                            el.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      {item.priceInQuantity
                        ? item.priceInQuantity
                        : item.gprice}
                    </td>

                    {productInCard.some((elem) => elem.gid === item.gid) ? (
                      <td>
                        <span className={style.productAdded}>
                          товар в корзине &nbsp;☑
                        </span>
                      </td>
                    ) : (
                      <td>
                        <button
                          onClick={() => handleAddToCard(item, item.gid)}
                          className="order-btn"
                        >
                          добавить в корзину
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              ))
          ) : (
            <tbody></tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Main;
