function Categories({ value, onClickCategory }) {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Exclusive'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
