import ProjectRoutes from "./Routes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProjectRoutes />
      <Footer />
    </div>
  );
}

export default App;
