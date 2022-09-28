import NoticeHeader from "./components/NoticeHeader";
import Navbar from "./components/Navbar";

const Header = () => {
  return (
    <section className="min-h-max sticky top-0 z-50">
      <NoticeHeader />
      <Navbar />
    </section>
  );
};

export default Header;
