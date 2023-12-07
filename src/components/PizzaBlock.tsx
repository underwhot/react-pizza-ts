import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addPizza, selectPizzas } from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/store';

const pizzaTypes = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: string;
  rating: string;
};

type addPizzaProps = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  category: string;
  rating: string;
  amount: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const pizzas = useSelector(selectPizzas);
  const dispatch = useAppDispatch();

  let amount = 0;

  if (pizzas.find((pizza: { title: string }) => pizza.title === title)) {
    amount = pizzas.reduce(
      (acc: number, pizza: { title: string; amount: number }) => {
        if (pizza.title === title) {
          return acc + pizza.amount;
        }
        return acc;
      },
      0
    );
  }

  const addPizzaHandler = () => {
    const pizza: addPizzaProps = {
      id: id + pizzaTypes[activeType] + sizes[activeSize],
      imageUrl,
      title,
      type: pizzaTypes[activeType],
      size: sizes[activeSize],
      price,
      category,
      rating,
      amount: 1,
    };

    dispatch(addPizza(pizza));
  };

  return (
    <div className="pizza-block">
      <Link to={'/pizza/' + id}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <Link to={'/pizza/' + id} className="pizza-block__title">
        {title}
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, i) => (
            <li
              onClick={() => setActiveType(i)}
              className={activeType === i ? 'active' : ''}
              key={type}
            >
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}
              key={size}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          type="button"
          onClick={addPizzaHandler}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {amount > 0 && <i>{amount}</i>}
        </button>
      </div>
    </div>
  );
};
