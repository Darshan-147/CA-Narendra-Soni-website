import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import Stats from "./components/Stats/Stats.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import Process from "./components/Process/Process.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Insights from "./components/Insights/Insights.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";

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
