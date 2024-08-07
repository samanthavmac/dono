import styles from '@/styles/onboarding.module.scss';

export default function DoneeAccountLoginPage() {
  return (
    <div className={styles['main-center-container']}>
      <h1>I am a Donee</h1>
      <p className={styles['instruction-subtitle']}>Dono will sign you in, or create an account if you don’t have one.</p>
    </div>
  );
}
