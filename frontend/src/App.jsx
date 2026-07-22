import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Eagerly loaded core routes
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

// Lazy loaded page components
const MbtiPage = lazy(() => import('./pages/MbtiPage'));
const MbtiResult = lazy(() => import('./pages/MbtiResult'));

const EnneagramTest = lazy(() => import('./pages/EnneagramTest'));
const EnneagramResult = lazy(() => import('./pages/EnneagramResult'));
const LoveLanguagesTest = lazy(() => import('./pages/LoveLanguagesTest'));
const LoveLanguagesResult = lazy(() => import('./pages/LoveLanguagesResult'));
const AttachmentStylesTest = lazy(() => import('./pages/AttachmentStylesTest'));
const AttachmentStylesResult = lazy(() => import('./pages/AttachmentStylesResult'));
const InstinctualVariantsTest = lazy(() => import('./pages/InstinctualVariantsTest'));
const InstinctualVariantsResult = lazy(() => import('./pages/InstinctualVariantsResult'));
const TritypeTest = lazy(() => import('./pages/TritypeTest'));
const TritypeResult = lazy(() => import('./pages/TritypeResult'));
const ColorPsychologyTest = lazy(() => import('./pages/ColorPsychologyTest'));
const ColorPsychologyResult = lazy(() => import('./pages/ColorPsychologyResult'));
const JungianArchetypesTest = lazy(() => import('./pages/JungianArchetypesTest'));
const JungianArchetypesResult = lazy(() => import('./pages/JungianArchetypesResult'));
const MoralAlignmentTest = lazy(() => import('./pages/MoralAlignmentTest'));
const MoralAlignmentResult = lazy(() => import('./pages/MoralAlignmentResult'));
const ResilienceQuotientTest = lazy(() => import('./pages/ResilienceQuotientTest'));
const ResilienceQuotientResult = lazy(() => import('./pages/ResilienceQuotientResult'));
const AdhdTest = lazy(() => import('./pages/AdhdTest'));
const AdhdResult = lazy(() => import('./pages/AdhdResult'));
const HspTest = lazy(() => import('./pages/HspTest'));
const HspResult = lazy(() => import('./pages/HspResult'));
const BurnoutTest = lazy(() => import('./pages/BurnoutTest'));
const BurnoutResult = lazy(() => import('./pages/BurnoutResult'));

const DarkTriadTest = lazy(() => import('./pages/DarkTriadTest'));
const DarkTriadResult = lazy(() => import('./pages/DarkTriadResult'));
const DefenseTest = lazy(() => import('./pages/DefenseTest'));
const DefenseResult = lazy(() => import('./pages/DefenseResult'));
const ImposterTest = lazy(() => import('./pages/ImposterTest'));
const ImposterResult = lazy(() => import('./pages/ImposterResult'));

const IdentityDashboard = lazy(() => import('./pages/IdentityDashboard'));
const Wiki = lazy(() => import('./pages/Wiki'));
const Login = lazy(() => import('./pages/Login'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function LocalhostRoute({ children }) {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isLocalhost) {
    return <Navigate to="/error" replace />;
  }
  return children;
}

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen text-slate-800 relative w-full h-full font-sans overflow-x-hidden">
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-1 w-full mx-auto">
            <Suspense fallback={<PageLoader />}>
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
                <Route path="/test/jungian-archetypes" element={<JungianArchetypesTest />} />
                <Route path="/result/jungian-archetypes/:type" element={<JungianArchetypesResult />} />
                <Route path="/test/alignment" element={<MoralAlignmentTest />} />
                <Route path="/result/alignment/:type" element={<MoralAlignmentResult />} />
                <Route path="/test/resilience" element={<ResilienceQuotientTest />} />
                <Route path="/result/resilience/:type" element={<ResilienceQuotientResult />} />
                <Route path="/test/adhd" element={<AdhdTest />} />
                <Route path="/result/adhd/:type" element={<AdhdResult />} />
                <Route path="/test/hsp" element={<HspTest />} />
                <Route path="/result/hsp/:type" element={<HspResult />} />
                <Route path="/test/burnout" element={<BurnoutTest />} />
                <Route path="/result/burnout/:type" element={<BurnoutResult />} />
                <Route path="/test/dark-triad" element={<DarkTriadTest />} />
                <Route path="/result/dark-triad/:type" element={<DarkTriadResult />} />
                <Route path="/test/defense" element={<DefenseTest />} />
                <Route path="/result/defense/:type" element={<DefenseResult />} />
                <Route path="/test/imposter" element={<ImposterTest />} />
                <Route path="/result/imposter/:type" element={<ImposterResult />} />
                <Route path="/dashboard" element={<LocalhostRoute><IdentityDashboard /></LocalhostRoute>} />
                <Route path="/wiki" element={<Wiki />} />
                <Route path="/login" element={<LocalhostRoute><Login /></LocalhostRoute>} />
                <Route path="/error" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
}