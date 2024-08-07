import GoogleSignInButton from '@/components/GoogleSignInButton';
import styles from '@/styles/donor.module.scss';

export default function DonorAccountLoginPage() {
  return (
    <div className={styles['main-center-container']}>
      <h1>I am a Donor</h1>
      <p className={styles['instruction-subtitle']}>Dono will sign you in, or create an account if you don’t have one.</p>
      <GoogleSignInButton/>
    </div>
  );
}
