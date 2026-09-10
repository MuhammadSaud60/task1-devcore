import Header from "./components/Header"
import Hero from "./components/Hero"


function App() {  
  return (
    <main>
      {/* blur effect */}
     <div className="absolute top-[20%] right-[-5%] h-0 w-160 rotate-[-30deg] shadow-[0_0_900px_20px_#99bb63] -z-10">
      </div>
      <Header />
      <Hero/>

      
    </main>
  )
}

export default App
