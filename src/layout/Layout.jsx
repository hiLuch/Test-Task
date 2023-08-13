import React from 'react';
import style from './Layout.module.css';
import SideMenu from '../components/side-menu/SideMenu';

const Layout = ({ children }) => {
  return (
    <div className={style.layout}>
      <div className={style.body}>
        <SideMenu />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
