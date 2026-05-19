import useNav from './hooks/useNav';
import Nav from './components/Nav';
import HomePage from './components/pages/HomePage';
import FlowersPage from './components/pages/FlowersPage';
import ColourWheelPage from './components/pages/ColourWheelPage';
import BouquetsPage from './components/pages/BouquetsPage';
import SeasonalPage from './components/pages/SeasonalPage';
import TechniquesPage from './components/pages/TechniquesPage';
import WeddingPage from './components/pages/WeddingPage';
import ConditioningPage from './components/pages/ConditioningPage';
import StyleGuidePage from './components/pages/StyleGuidePage';
import QuizPage from './components/pages/QuizPage';
import ArrangementBuilderPage from './components/pages/ArrangementBuilderPage';
import GlossaryPage from './components/pages/GlossaryPage';
import StemCalculatorPage from './components/pages/StemCalculatorPage';
import TroubleshootingPage from './components/pages/TroubleshootingPage';
import EquipmentPage from './components/pages/EquipmentPage';
import MeaningsPage from './components/pages/MeaningsPage';
import SustainabilityPage from './components/pages/SustainabilityPage';

export default function App() {
  const { page, go } = useNav();
  const pages = {
    home: <HomePage go={go}/>,
    flowers: <FlowersPage/>,
    wheel: <ColourWheelPage/>,
    bouquets: <BouquetsPage/>,
    seasonal: <SeasonalPage/>,
    techniques: <TechniquesPage/>,
    styles: <StyleGuidePage/>,
    quiz:    <QuizPage/>,
    builder: <ArrangementBuilderPage/>,
    wedding: <WeddingPage/>,
    conditioning: <ConditioningPage/>,
    glossary: <GlossaryPage/>,
    stemcalc: <StemCalculatorPage/>,
    troubleshooting: <TroubleshootingPage/>,
    equipment: <EquipmentPage/>,
    meanings: <MeaningsPage/>,
    sustainability: <SustainabilityPage/>,
  };
  return (
    <div className="min-h-screen bg-[#FAF8F4]" style={{fontFamily:'Jost, sans-serif'}}>
      <Nav page={page} go={go}/>
      {pages[page] || pages.home}
    </div>
  );
}
