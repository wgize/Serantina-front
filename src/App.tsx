import "./App.css";
import { CartProvider } from "./contexts/CartContext";
import { Cart } from "./components/Cart";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Atmosphere from "./components/Atmosphere";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Atmosphere />
      <Contact />
      <Footer />
      <Cart />
    </CartProvider>
  );
}

export default App;
