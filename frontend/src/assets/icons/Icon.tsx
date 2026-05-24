import sprite from "./sprite.svg";
import styles from "./Icon.module.css";

type IconName =
  | "dashboard"
  | "orders"
  | "products"
  | "suppliers"
  | "customers"
  | "logout"
  | "menu"
  | "x"
  | "filter"
  | "edit"
  | "edit-2"
  | "trash"
  | "calendar"
  | "finance"
  | "mdi-users"
  | "plus"
  | "chevron-down"
  | "eye"
  | "eye-off";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon = ({name, size = 20, className}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={`${styles.icon} ${className ?? ""}`}
    aria-hidden="true"
  >
    <use href={`${sprite}#icon-${name}`} />
  </svg>
);
