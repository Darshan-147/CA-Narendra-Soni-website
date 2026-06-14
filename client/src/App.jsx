import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Insights from "./components/Insights.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Process />
        {/* <Testimonials /> */}
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
