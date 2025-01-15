import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import GlobalStyle from './assets/globalStyle';
import { HeightProvider } from './contexts/HeightContext';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import MyToast from './components/MyToast';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';


function App() {
  return (
    <HeightProvider>
      <ToastProvider>
        <CustomThemeProvider>
          <ThemedApp />
        </CustomThemeProvider>
      </ToastProvider>
    </HeightProvider>
  );
}

const ThemedApp = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/Login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <MyToast />
      </Router>
    </StyledThemeProvider>
  );
}

export default App;
