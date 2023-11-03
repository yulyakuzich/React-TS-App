import './style.css';

export default function LoadingComponent() {
  return (
    <section>
      <div className="column">
        <div className="loading_container">
          <div className="ring">
            Loading
            <span className="circle"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
