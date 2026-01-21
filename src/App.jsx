import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import ChatPage from './Pages/Chat';
import ProfilePage from './Pages/Profile';
import SettingsPage from './Pages/Settings';
import OAuthCallback from './Pages/OAuthCallback';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Layout/ProtectedRoute';
import UpgradePage from './Pages/Upgrade';
import ShortcutsPage from './Pages/Shortcuts';
import HelpPage from './Pages/Help';
import LibraryPage from './Pages/Library';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route
          path="/chat"
          element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )}
        />
        <Route path="/chat/:id" element={(<ProtectedRoute><ChatPage /></ProtectedRoute>)} />
        <Route path="/profile" element={(<ProtectedRoute><ProfilePage /></ProtectedRoute>)} />
        <Route path="/settings" element={(<ProtectedRoute><SettingsPage /></ProtectedRoute>)} />
        <Route path="/upgrade" element={(<ProtectedRoute><UpgradePage /></ProtectedRoute>)} />
        <Route path="/shortcuts" element={(<ProtectedRoute><ShortcutsPage /></ProtectedRoute>)} />
        <Route path="/help" element={(<ProtectedRoute><HelpPage /></ProtectedRoute>)} />
        <Route path="/library" element={(<ProtectedRoute><LibraryPage /></ProtectedRoute>)} />
      </Routes>
    </>
  );
}

export default App;