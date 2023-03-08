import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SniffspotIndex from "./pages/spot-index/SpotIndex";
import CreateSpot from "./pages/spot-create/CreateSpot";
import Navbar from "./components/common/navbar/Navbar";
import ShowSpot from "./pages/spot-show/SpotShow";


function AppRouter() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<SniffspotIndex />} />
          <Route exact path="/spots/new" element={<CreateSpot />} />
          <Route exact path="/spots/:id" element={<ShowSpot />} />
          <Route exact path="/spots/:id/edit" element={<CreateSpot />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
