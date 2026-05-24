import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Logo } from '../../components/common/Logo';
import { Icon } from '../../assets/icons/Icon';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import type { LoginCredentials } from '../../types';
import pill1x from '../../assets/images/pill@1x.png';
import pill2x from '../../assets/images/pill@2x.png';
import decor1x from '../../assets/images/decor@1x.png';
import decor2x from '../../assets/images/decor@2x.png';
import styles from './LoginPage.module.css';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

export const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: yupResolver(schema),
  });

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (data: LoginCredentials) => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(data);
      login(response.token);
      navigate('/dashboard');
    } catch (err) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Logo */}
      <div className={styles.logoWrap}>
        <Logo showText={true} />
      </div>

      {/* Sol kolon — başlık + pill */}
      <div className={styles.leftCol}>
        <img
          src={pill1x}
          srcSet={`${pill1x} 1x, ${pill2x} 2x`}
          alt="medicine pill"
          className={styles.pillImg}
        />
        <h1 className={styles.heading}>
          Your medication,<br />
          delivered Say goodbye<br />
          to all{' '}
          <span className={styles.highlight}>your healthcare</span>
          <br />
          worries with us
        </h1>
      </div>

      {/* Dekor — sayfaya göre absolute, alta kesiliyor */}
      <img
        src={decor1x}
        srcSet={`${decor1x} 1x, ${decor2x} 2x`}
        alt=""
        className={styles.decorImg}
        aria-hidden="true"
      />

      {/* Sağ kolon — form */}
      <div className={styles.rightCol}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.inputGroup}>
            <input
              {...register('email')}
              type="email"
              placeholder="Email address"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              autoComplete="email"
            />
            {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrap}>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
              </button>
            </div>
            {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
          </div>

          {error && <p className={styles.globalError}>{error}</p>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};
