import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import SubmitPage from "./pages/SubmitPage/SubmitPage";
import SubmitedPage from "./pages/SubmitedPage/SubmitedPage";
import ComunityPage from "./pages/ComunityPage/ComunityPage";
import BackOfficePage from "./pages/BackOffice/BackOfficePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import BackOfficeEdit from "./pages/BackOfficeEdit/BackOfficeEdit";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/submited" element={<SubmitedPage />} />
        <Route path="/comunity" element={<ComunityPage />} />
        <Route path="/backoffice" element={<BackOfficePage />} />
        <Route path="/backoffice/:galleryId" element={<BackOfficeEdit />} />
        <Route path="/details/:galleryId" element={<DetailsPage />} />

        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
