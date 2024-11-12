import ReactDOM from "react-dom/client";
import './index.css';
import pizzaData from './data.js';

let favourites = [];

function App() {
  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  const toggleFavourite = (pizzaName) => {
    if (favourites.includes(pizzaName)) {
      favourites = favourites.filter((name) => name !== pizzaName);
    } else {
      favourites.push(pizzaName);
    }
    renderApp();  // Re-render to update UI after adding/removing favourites
  };

  return (
    <div>
      <Header isOpen={isOpen} />
      <Menu toggleFavourite={toggleFavourite} favourites={favourites} pizzas={pizzaData} />
      <Footer isOpen={isOpen} />
    </div>
  );
}

function Header({ isOpen }) {
  return (
    <header>
      <h1 className="header-title">
        Qistina's Pizza Co.
      </h1>
      <Tagline />
    </header>
  );
}

function Tagline() {
  return (
    <div className="tagline-container">
      <h3 className="tagline">
        Authentic Italian Cuisine, all from our stone oven!
      </h3>
      <button className="btn order-btn">Order</button>
    </div>
  );
}

function Menu({ toggleFavourite, favourites, pizzas }) {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {pizzas.map((pizza) => (
        <Pizza
          key={pizza.name}
          name={pizza.name}
          description={pizza.ingredients}
          price={pizza.price}
          imageUrl={pizza.photoName}
          toggleFavourite={toggleFavourite}
          isFavourite={favourites.includes(pizza.name)}
        />
      ))}
    </div>
  );
}

function Pizza({ name, description, price, imageUrl, toggleFavourite, isFavourite }) {
  return (
    <div className="pizza">
      <button
        onClick={() => toggleFavourite(name)}
        className={`favourite-btn ${isFavourite ? 'added' : 'add'}`}
      >
        {isFavourite ? 'Added to Favourites!' : 'Add to Favourites'}
      </button>

      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  );
}

function Footer({ isOpen }) {
  return (
    <footer className="footer">
      {isOpen ? (
        <p>We're currently open</p>
      ) : (
        <p>Sorry, we're closed.</p>
      )}
    </footer>
  );
}

function renderApp() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
}

renderApp();
