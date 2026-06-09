import { useState } from "react"
import InputSection from "./pages/InputSection"
import OutputSection from "./pages/OutputSection"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"


const App = () => {
  const [result, setResult] = useState(null)
  function reset() {
    setResult(null)
  }
  return (
    <div className="h-screen overflow-hidden">
      <ToastContainer />
      <Navbar />
      {result && <div className="pb-40"><OutputSection result={result} reset={reset} /></div>}
      <InputSection result={result} setResult={setResult} />
    </div>
  )
}

export default App
