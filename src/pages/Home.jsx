import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AppContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const { categoryID, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const pizzas = data
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryID ? `&category=${categoryID}` : '';
    const sortPlaceholder = `&sortBy=${sort.sortProp}`;
    const order = `&order=desc`;

    axios
      .get(
        `https://62f273e3b1098f1508132820.mockapi.io/items?page=${currentPage}&limit=4${category}${sortPlaceholder}${order}`,
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryID, sort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onClickCategory={(i) => dispatch(setCategoryID(i))} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(num) => dispatch(setCurrentPage(num))} />
    </div>
  );
}

export default Home;
