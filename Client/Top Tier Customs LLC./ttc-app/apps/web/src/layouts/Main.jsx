import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Main = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Main;
