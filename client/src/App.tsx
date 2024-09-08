import React, {useState, useEffect} from 'react';
import s from './App.module.scss'
import {Outlet} from 'react-router-dom'

function App() {
  
  return (
    <div className={s.mainWrapper}>
      <div className={s.content}><Outlet /></div>
    </div>
  );
}

export default App;
