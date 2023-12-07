import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategory } from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

const categories = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories = () => {
  const activeCategory = useSelector(selectCategory);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setCategory(e.currentTarget.textContent || 'default value'));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            onClick={handleClick}
            className={activeCategory === category ? 'active' : ''}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
