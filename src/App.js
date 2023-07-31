import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MyRoutes from "./MyRoutes";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider

function App() {
  return (
    <div className="App">
      <AuthProvider> {/* Wrap the components with AuthProvider */}
        <Navbar />
        <MyRoutes />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
