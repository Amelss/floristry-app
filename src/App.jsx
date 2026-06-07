import { useState, useEffect } from 'react';
import useNav from './hooks/useNav';
import Nav from './components/Nav';
import Footer from './components/shared/Footer';
import SearchModal from './components/SearchModal';
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
import SympathyPage from './components/pages/SympathyPage';
import LearnPage from './components/pages/LearnPage';
import ToolsPage from './components/pages/ToolsPage';
import HandTiedPage from './components/pages/HandTiedPage';
import FoamFreePage from './components/pages/FoamFreePage';
import WreathMakingPage from './components/pages/WreathMakingPage';
import BridalBouquetsPage from './components/pages/BridalBouquetsPage';
import CorsagesButtonholesPage from './components/pages/CorsagesButtonholesPage';
import TableArrangementsPage from './components/pages/TableArrangementsPage';
import WeddingStylesPage from './components/pages/WeddingStylesPage';
import WeddingPricingPage from './components/pages/WeddingPricingPage';
import WeddingCareerPage from './components/pages/WeddingCareerPage';
import FlowerCareTimerPage from './components/pages/FlowerCareTimerPage';
export default function App() {
  const { page, go } = useNav();
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const pages = {
    home: <HomePage go={go}/>,
    flowers: <FlowersPage/>,
    wheel: <ColourWheelPage/>,
    bouquets: <BouquetsPage/>,
    seasonal: <SeasonalPage/>,
    techniques: <TechniquesPage go={go}/>,
    styles: <StyleGuidePage/>,
    quiz:    <QuizPage/>,
    builder: <ArrangementBuilderPage/>,
    wedding: <WeddingPage go={go}/>,
    bridalBouquets: <BridalBouquetsPage go={go}/>,
    corsagesButtonholes: <CorsagesButtonholesPage go={go}/>,
    tableArrangements: <TableArrangementsPage go={go}/>,
    weddingStyles: <WeddingStylesPage go={go}/>,
    weddingPricing: <WeddingPricingPage go={go}/>,
    weddingCareer: <WeddingCareerPage go={go}/>,
    conditioning: <ConditioningPage/>,
    glossary: <GlossaryPage/>,
    stemcalc: <StemCalculatorPage/>,
    flowertimer: <FlowerCareTimerPage go={go}/>,
    troubleshooting: <TroubleshootingPage/>,
    equipment: <EquipmentPage/>,
    meanings: <MeaningsPage/>,
    sustainability: <SustainabilityPage/>,
    workbook: <WorkbookPage/>,
    foundations: <FoundationsPage go={go}/>,
    proportion: <ProportionScalePage/>,
    sympathy: <SympathyPage/>,
    learn: <LearnPage go={go}/>,
    tools: <ToolsPage go={go}/>,
    handtied: <HandTiedPage go={go}/>,
    foamfree: <FoamFreePage go={go}/>,
    wreathmaking: <WreathMakingPage go={go}/>,
  };
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col" style={{fontFamily:'Jost, sans-serif'}}>
      <Nav page={page} go={go} onSearchOpen={() => setSearchOpen(true)}/>
      <div className="flex-1">
        {pages[page] || pages.home}
      </div>
      <Footer go={go}/>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} go={go} />
    </div>
  );
}
