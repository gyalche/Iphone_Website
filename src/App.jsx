import DisplaySection from './components/DisplaySection';
import Jumbotorn from './components/Jumbotorn';
import Nav from './components/Nav';
import WebgiViewer from './components/WebgiViewer';
import SoundSection from './components/soundSection';

function App() {
  return (
    <div className="App">
      <Nav />
      <Jumbotorn />
      <SoundSection />
      <DisplaySection />
      <WebgiViewer />
    </div>
  );
}

export default App;
