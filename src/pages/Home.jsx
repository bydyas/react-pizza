import { useState, useEffect, useContext } from 'react';

import { AppContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const { searchValue } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'rating',
    sortProp: 'rating',
  });

  const pizzas = data
    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map(({ id, ...item }) => <PizzaBlock key={id} {...item} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://62f273e3b1098f1508132820.mockapi.io/items?page=${currentPage}&limit=4&category=${
        categoryId ? categoryId : ''
      }&sortBy=${sortType.sortProp}&order=desc`,
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch(console.log);
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId} />
        <Sort value={sortType} onClickSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
}

export default Home;
