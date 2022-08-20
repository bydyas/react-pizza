import { useEffect, useContext } from 'react';

import { AppContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { filterSelector, setCategoryID, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const { categoryID, sort, currentPage } = useSelector(filterSelector);
  const { items, status } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

  const { searchValue } = useContext(AppContext);

  const pizzas = items
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const getPizzas = () => {
    const category = categoryID ? `&category=${categoryID}` : '';
    const sortPlaceholder = `&sortBy=${sort.sortProp}`;
    const order = `&order=desc`;

    dispatch(fetchPizzas({ currentPage, category, sortPlaceholder, order }));

    window.scrollTo(0, 0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getPizzas(), [categoryID, sort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={(i) => dispatch(setCategoryID(i))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{status.loading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(num) => dispatch(setCurrentPage(num))} />
    </div>
  );
}

export default Home;
