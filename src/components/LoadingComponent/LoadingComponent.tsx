import './style.css';

export function LoadingComponent() {
  return (
    <section>
      <div className="column">
        <div className="loading_container">
          <div data-testid="loading" className="ring">
            Loading
            <span className="circle"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
