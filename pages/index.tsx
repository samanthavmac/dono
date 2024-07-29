import styles from '../styles/onboarding.module.scss';

export default function Home() {
  return (
    <div className={styles['main-center-container']}>
      <h1>Make a difference with Dono</h1>
      <p>Gamify community involvement with Dono. Connect with volunteer opportunities in your local community. Collect unique badges when you volunteer at a new non-profit, and gain tokens to the Dono store.</p>
      <div className="btn-group">
        <button>Donor (Volunteer)</button>
        <button>Donee (Registered non-profit)</button>
      </div>
    </div>
  );
}
