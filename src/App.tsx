import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '@/store';
import { Navbar } from '@/sections/Navbar';
import { Footer } from '@/sections/Footer';
import { Home } from '@/pages/Home';
import { Catalog } from '@/pages/Catalog';
import { Artisans } from '@/pages/Artisans';
import { CircularEconomy } from '@/pages/CircularEconomy';
import { Impact } from '@/pages/Impact';
import { Training } from '@/pages/Training';
import { Contact } from '@/pages/Contact';
import { Videos } from '@/pages/Videos';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Cart } from '@/pages/Cart';
import { Product } from '@/pages/Product';
import { LanguageProvider } from '@/store/LanguageContext';
import './App.css';

// Layout component for pages with navbar
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-0">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Routes without navbar (login/register) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Routes with navbar and footer - using index route to fix nested Routes issue */}
              <Route
                path="/*"
                element={
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/artisans" element={<Artisans />} />
                      <Route path="/circular-economy" element={<CircularEconomy />} />
                      <Route path="/impact" element={<Impact />} />
                      <Route path="/training" element={<Training />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/videos" element={<Videos />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/product/:id" element={<Product />} />
                    </Routes>
                  </MainLayout>
                }
              />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </StoreProvider>
  );
}

export default App;
