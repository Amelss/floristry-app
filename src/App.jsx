import useNav from './hooks/useNav';
import Nav from './components/Nav';
import Footer from './components/shared/Footer';
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
import WorkbookPage from './components/pages/WorkbookPage';
import FoundationsPage from './components/pages/FoundationsPage';
import ProportionScalePage from './components/pages/ProportionScalePage';
import LearnPage from './components/pages/LearnPage';
import ToolsPage from './components/pages/ToolsPage';
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
    workbook: <WorkbookPage/>,
    foundations: <FoundationsPage go={go}/>,
    proportion: <ProportionScalePage/>,
    learn: <LearnPage go={go}/>,
    tools: <ToolsPage go={go}/>,
  };
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col" style={{fontFamily:'Jost, sans-serif'}}>
      <Nav page={page} go={go}/>
      <div className="flex-1">
        {pages[page] || pages.home}
      </div>
      <Footer go={go}/>
    </div>
  );
}
