import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { PizzaBlockSkeleton } from '../components/PizzaBlockSkeleton';
import { useAppDispatch } from '../redux/store';

import {
  selectCategory,
  selectSearchRequest,
  selectSort,
} from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  selectIsLoadingViaAPI,
  selectPizzas,
} from '../redux/slices/pizzasSlice';

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  amount?: number;
};

export const Home = () => {
  const dataPizza = useSelector(selectPizzas);
  const isLoading = useSelector(selectIsLoadingViaAPI);
  const activeCategory = useSelector(selectCategory);
  const activeSort = useSelector(selectSort);
  const searchRequest = useSelector(selectSearchRequest);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const category =
      activeCategory === 'Все' ? '' : `filter&category=${activeCategory}`;
    let sort;
    if (activeSort === 'популярности') {
      sort = `sortBy=rating`;
    } else if (activeSort === 'цене') {
      sort = `sortBy=price`;
    } else {
      sort = `sortBy=title`;
    }
    const order = 'order=asc';

    dispatch(fetchPizzas({ category, sort, order, searchRequest }));
  }, [activeCategory, activeSort, searchRequest]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  const preloader = new Array(4)
    .fill(null)
    .map((_, i) => <PizzaBlockSkeleton key={i} />);

  const pizzas = dataPizza.map((pizza: Pizza) => (
    <PizzaBlock
      types={[]}
      sizes={[]}
      category={''}
      rating={''}
      {...pizza}
      key={pizza.id}
    ></PizzaBlock>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? preloader : pizzas}</div>
    </div>
  );
};
