import styles from "./Card.module.css";

const Card = ({ className, hover, ...props }: any) => {
  const style =
    styles.Card + " " + (className ?? "") + " " + (hover ? styles.hover : "");

  return <div className={style} {...props}></div>;
};

export default Card;
