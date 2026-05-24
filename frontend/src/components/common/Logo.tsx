import logoFull from '../../assets/images/logo-full.svg';
import logoIcon from '../../assets/icons/logo-icon.svg';
import styles from './Logo.module.css';

interface LogoProps {
  showText?: boolean;
}

export const Logo = ({ showText = true }: LogoProps) => (
  <div className={styles.logoWrap}>
    {showText ? (
      <img src={logoFull} alt="E-Pharmacy" className={styles.logoFull} />
    ) : (
      <img src={logoIcon} alt="E-Pharmacy" className={styles.logoIcon} />
    )}
  </div>
);