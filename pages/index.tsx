import styles from '@/styles/onboarding.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles['main-center-container']}>
      <h1>Make a difference with Dono</h1>
      <p className={styles['instruction-subtitle']}>Connect with volunteer opportunities in your local community. Collect unique badges when you volunteer at a new non-profit, and gain tokens to the Dono store.</p>
      <div className="btn-group">
        <Link href="/onboarding/donor-account-login"><button>Donor (Volunteer)</button></Link>
        <button>Donee (Registered non-profit)</button>
      </div>
    </div>
  );
}
