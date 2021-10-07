import React, { Fragment, useState } from "react";
import { Observable } from 'windowed-observable'

export const Home = () => {
  const [data, setData] = useState({
    name: '',
    lastName: '',
    amount: ''
  });

  const observable = new Observable('fromReact');

  const path = window.location.pathname;

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const sendData = (event) => {
    event.preventDefault();
    if(path == '/'){
      let customEvent = new CustomEvent("submitRobot", {
        detail: {
          data: data
        }
      });
      window.dispatchEvent(customEvent);
    }else{
      observable.publish(data);
    }
  }

  return (
    <Fragment>
      <h1 className={path == '/' ? 'text-white' : 'text-dark'}>Formulario</h1>
      <form className="row mt-4" onSubmit={sendData}>
        <div className="col-md-6">
          <label className={path == '/' ? 'text-white' : 'text-dark'}>Nombres</label>
          <input className="form-control"
            placeholder="Nombres"
            type="text"
            name="name"
            onChange={handleInputChange} />
        </div>
        <div className="col-md-6 mt-4 mt-md-0">
          <label  className={path == '/' ? 'text-white' : 'text-dark'}>Apellidos</label>
          <input className="form-control"
            placeholder="Apellidos"
            type="text"
            name="lastName"
            onChange={handleInputChange} />
        </div>
        <div className="col-md-3 mt-4">
          <label className={path == '/' ? 'text-white' : 'text-dark'}>Cantidad de Robots que deseas ver</label>
          <input className="form-control"
            placeholder="# Robots"
            type="number"
            name="amount"
            onChange={handleInputChange} />
        </div>
        <div className="col-md-12 mt-4">
          <button  className={data.amount == ''? 'btn btn-secondary' : 'btn btn-primary'} type="submit" disabled={data.amount == ''} >Guardar</button>
        </div>

      </form>
    </Fragment>
  );
};
