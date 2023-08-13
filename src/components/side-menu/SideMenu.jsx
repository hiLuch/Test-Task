import React, { useEffect } from 'react';
import style from './SideMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setProductFilters } from '../../redux/pruductSlice';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsSlice.allProducts);

  // дефолтный запрос товаров с api при загрузке страницы
  useEffect(() => {
    dispatch({ type: 'GET_POSTS_REQUESTED' });
  }, []);

  // стейт категорий для бокового меню
  const category = useSelector((state) => state.productsSlice.category);

  // фильтрация товаров по выбранной категории
  const handleProductFilter = (productCategory) => {
    let productsInCategory = [];

    allProducts.forEach((item, i) => {
      if (item.rname === productCategory) {
        productsInCategory.push(item.goods, item.rname);
      }
    });

    dispatch(setProductFilters(productsInCategory));
  };

  return (
    <div className={style.menuContainer}>
      <button className={style.returnMainBtn}>
        <Link to="/">
          <h4 className={style.returnMainBtnTxt}>Категории товаров</h4>
        </Link>
      </button>

      {category.length ? (
        <>
          {category.map((nameCategory, index) => (
            <button
              className={style.sideMenuBtn}
              key={index}
              onClick={() => handleProductFilter(nameCategory)}
            >
              {nameCategory ? nameCategory : 'Без категории'}
            </button>
          ))}
        </>
      ) : (
        <p>ошибка подключения к API</p>
      )}
    </div>
  );
};

export default SideMenu;
