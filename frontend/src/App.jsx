import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MbtiPage from './pages/MbtiPage';
import MbtiResult from './pages/MbtiResult';
import About from './pages/About';
import Contact from './pages/Contact';

import EnneagramTest from './pages/EnneagramTest';
import EnneagramResult from './pages/EnneagramResult';
import LoveLanguagesTest from './pages/LoveLanguagesTest';
import LoveLanguagesResult from './pages/LoveLanguagesResult';
import AttachmentStylesTest from './pages/AttachmentStylesTest';
import AttachmentStylesResult from './pages/AttachmentStylesResult';
import InstinctualVariantsTest from './pages/InstinctualVariantsTest';
import InstinctualVariantsResult from './pages/InstinctualVariantsResult';
import TritypeTest from './pages/TritypeTest';
import TritypeResult from './pages/TritypeResult';
import ColorPsychologyTest from './pages/ColorPsychologyTest';
import ColorPsychologyResult from './pages/ColorPsychologyResult';

export default function App() {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen text-slate-800 relative w-full h-full font-sans overflow-x-hidden">
        {/* We removed the full-app glowing blobs per user request 
            so that specific pages (like MbtiPage which uses pure white) 
            don't get unnatural overlaps on the edges. */}

        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-1 w-full mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/test/mbti" element={<MbtiPage />} />
              <Route path="/result/mbti/:type" element={<MbtiResult />} />
              <Route path="/test/enneagram" element={<EnneagramTest />} />
              <Route path="/result/enneagram/:type" element={<EnneagramResult />} />
              <Route path="/test/love-languages" element={<LoveLanguagesTest />} />
              <Route path="/result/love-languages/:type" element={<LoveLanguagesResult />} />
              <Route path="/test/attachment-styles" element={<AttachmentStylesTest />} />
              <Route path="/result/attachment-styles/:type" element={<AttachmentStylesResult />} />
              <Route path="/test/instinctual-variants" element={<InstinctualVariantsTest />} />
              <Route path="/result/instinctual-variants/:type" element={<InstinctualVariantsResult />} />
              <Route path="/test/tritype" element={<TritypeTest />} />
              <Route path="/result/tritype/:type" element={<TritypeResult />} />
              <Route path="/test/color-psychology" element={<ColorPsychologyTest />} />
              <Route path="/result/color-psychology/:type" element={<ColorPsychologyResult />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}