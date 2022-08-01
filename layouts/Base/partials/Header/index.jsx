import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";

const Header = () => {
  return (
    <section className="min-h-max relative">
      <Navbar />
      <BottomBar />
    </section>
  );
};

export default Header;
