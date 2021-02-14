import logo from './logo.svg';
import './App.css';
import { LibraryProvider } from './context/LibraryContext';
import Home from './userView/components/Home';

const App = () => {
  return (
    <LibraryProvider>
        <Home />
    </LibraryProvider>
  );
}

export default App;
