import { ThemeProvider } from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { theme } from "styles/Theme"
import { GlobalStyle } from "styles/GlobalStyle"

import MainPage from "pages/mainPage"
import LoginPage from "pages/userPages/LoginPage/LoginPage"
import KakaoRedirectPage from "pages/mainPage/KakaoRedirectPage"
import HeaderLayout from "component/layouts/headerlayout"
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <header>
                    <meta
                        http-equiv="Content-Security-Policy"
                        content="upgrade-insecure-requests"
                    />
                </header>
                <Routes>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />}></Route>
                    {/* 헤더 */}
                    
                    <Route element={<HeaderLayout />} />
                    <Route path="/" element={<MainPage />} />
                    
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}