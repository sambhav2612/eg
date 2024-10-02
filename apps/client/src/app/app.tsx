// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Welcome from './pages/welcome';
import { TokenAvailable, TokenUnavailable } from './utils/CheckToken';

export function App() {
  return (
    <Router>
      <Routes>
        <Route element={<TokenUnavailable />}>
          <Route path="/welcome" element={<Welcome />} />
        </Route>
        <Route element={<TokenAvailable />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
