import { Toaster } from "sonner";
import DisplayWeather from "./pages/DisplayWeather";
import InputLocation from "./pages/InputLocation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputLocation />} />
          <Route path="/display-waether" element={<DisplayWeather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
