import React, {useRef, useReducer} from 'react';
import "./App.css";

const initialState = {
  additionalPrice: 0,
  car: {
    price: 26395,
    name: "2019 Ford Mustang",
    image: "https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg",
    features: []
  },
  store: [
    {id: 1, name: "V-6 engine", price: 1500},
    {id: 2, name: "Racing detail package", price: 1500},
    {id: 3, name: "Premium sound system", price: 500},
    {id: 4, name: "Real spoiler", price: 250}
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice - action.item.price,
        car: { ...state.car, features: state.car.features.filter(x => x.id !== action.item.id)},
        store: [...state.store, action.item]
      };
    case "BUY_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice + action.item.price,
        car: { ...state.car, features: [...state.car.features, action.item] },
        store: state.store.filter(x => x.id !== action.item.id)
      };
    default:
      return state;
  }
};

const App = () => {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeFeature = item => {
    dispatch({type: "REMOVE_ITEM", item});
  };
  const buyItem = item => {
    dispatch({type: "BUY_ITEM", item});
  };
  
  return (
    <div className="boxes">
      <div className="box">
        <img className="image" src={state.car.image}/>
        <h2>{state.car.name}</h2>
        <p>Amount: ${state.car.price}</p>
        <h6>Added features:</h6>
        {state.car.features.length ? (
        <ol type="1">
          {state.car.features.map(item => {
              return (
                <li key={item.id}>
                  {item.name} (${item.price}) &nbsp;
                  <button className="button" onClick={() => removeFeature(item)}> - </button>
                </li>
              )
          })}
        </ol>
        ): <p>Nothing</p>}
      </div>
      <div className="box">
        <h6>Additional features:</h6>
        {state.store.length ? (
        <ol type="1">
          {state.store.map(item => {
              return (
                <li key={item.id}>
                  {item.name} (${item.price}) &nbsp;
                  <button className="button" onClick={() => buyItem(item)}> + </button>
                </li>
              )
          })}
        </ol>
        ): <p>Store is empty</p>}
      </div>
      <div className="box">
        <div className="content">
          <h4>Price of car: ${state.car.price}</h4>
          <h4>The cost of additions: ${state.additionalPrice}</h4>
          <h2>Total amount: ${state.car.price + state.additionalPrice}</h2>
        </div>
      </div>
    </div>
  );
} 

export default App;