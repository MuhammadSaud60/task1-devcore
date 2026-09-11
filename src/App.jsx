import About from "./components/About"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Work from "./components/Services"



function App() {  
  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden">
      {/* blur effect */}
     <div className="absolute top-[20%] right-[-5%] h-0 w-160 rotate-[-30deg] shadow-[0_0_900px_20px_#99bb63] -z-10">
      </div>
      <Header />
      <Hero/>
      <About />
      <Work />
      <Footer />
    

      
    </main>
  )
}

export default App
