import React from "react";
import { Container } from "react-bootstrap";
import "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import MyQuestionsScreen from "./screens/MyQuestionsScreen";
import QuestionScreen from "./screens/QuestionScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/my-profile" element={<MyProfileScreen />} />
            <Route path="/my-questions" element={<MyQuestionsScreen />} />
            <Route path="/questions/:id" element={<QuestionScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
