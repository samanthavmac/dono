import styles from '@/styles/donor.module.scss';
import Link from 'next/link';
import SignOutButton from '@/components/SignOutButton';

export default function HomePage() {
  return (
    <div className={styles['main-container']}>
      <h1>Hello</h1>
      <SignOutButton/>
    </div>
  );
}
