import styles from './LoadingComponent.module.css';

export function LoadingComponent() {
  return (
    <section>
      <div className="column">
        <div className={styles.loading_container}>
          <div data-testid="loading" className={styles.ring}>
            Loading
            <span className={styles.circle}></span>
          </div>
        </div>
      </div>
    </section>
  );
}
