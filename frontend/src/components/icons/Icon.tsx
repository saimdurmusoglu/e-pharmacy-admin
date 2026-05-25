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
  | "trash-2"
  | "calendar"
  | "finance"
  | "mdi-users"
  | "plus"
  | "chevron-down"
  | "eye"
  | "eye-off"
  | "database";

interface IconProps {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ name, size = 20, width, height, className }: IconProps) => (
  <svg
    width={width ?? size}
    height={height ?? size}
    className={`${styles.icon} ${className ?? ""}`}
    aria-hidden="true"
  >
    <use href={`/icons.svg#icon-${name}`} />
  </svg>
);
