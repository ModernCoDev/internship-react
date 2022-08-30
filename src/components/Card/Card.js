import classes from './Card.module.css';

const Card = (props) => {
  const additionalClass = props.className;

  return <div className={`${classes.card} ${additionalClass}`}>{props.children}</div>;
};

export default Card;
