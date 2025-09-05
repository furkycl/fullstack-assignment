import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserList from "./components/UserList";
import PostList from "./components/PostList";

function App() {
  return (
    <div>
      {/* Rotalarımızı Routes bileşeni içinde tanımlıyoruz */}
      <Routes>
        {/* Ana sayfa için rota */}
        <Route path="/" element={<HomePage />} />

        {/* /users URL'i için UserList bileşenini göster */}
        <Route path="/users" element={<UserList />} />

        {/* /posts URL'i için PostList bileşenini göster */}
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </div>
  );
}

export default App;
