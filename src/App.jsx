import { useState, useEffect, lazy, Suspense } from 'react';
import useNav from './hooks/useNav';
import Nav from './components/Nav';
import Footer from './components/shared/Footer';
import SearchModal from './components/SearchModal';
import NotFoundPage from './components/pages/NotFoundPage';
import { ROUTES } from './routes';

const HomePage = lazy(() => import('./components/pages/HomePage'));
const FlowersPage = lazy(() => import('./components/pages/FlowersPage'));
const ColourWheelPage = lazy(() => import('./components/pages/ColourWheelPage'));
const BouquetsPage = lazy(() => import('./components/pages/BouquetsPage'));
const SeasonalPage = lazy(() => import('./components/pages/SeasonalPage'));
const TechniquesPage = lazy(() => import('./components/pages/TechniquesPage'));
const WeddingPage = lazy(() => import('./components/pages/WeddingPage'));
const ConditioningPage = lazy(() => import('./components/pages/ConditioningPage'));
const StyleGuidePage = lazy(() => import('./components/pages/StyleGuidePage'));
const QuizPage = lazy(() => import('./components/pages/QuizPage'));
const ArrangementBuilderPage = lazy(() => import('./components/pages/ArrangementBuilderPage'));
const GlossaryPage = lazy(() => import('./components/pages/GlossaryPage'));
const StemCalculatorPage = lazy(() => import('./components/pages/StemCalculatorPage'));
const TroubleshootingPage = lazy(() => import('./components/pages/TroubleshootingPage'));
const EquipmentPage = lazy(() => import('./components/pages/EquipmentPage'));
const MeaningsPage = lazy(() => import('./components/pages/MeaningsPage'));
const SustainabilityPage = lazy(() => import('./components/pages/SustainabilityPage'));
const WorkbookPage = lazy(() => import('./components/pages/WorkbookPage'));
const FoundationsPage = lazy(() => import('./components/pages/FoundationsPage'));
const ProportionScalePage = lazy(() => import('./components/pages/ProportionScalePage'));
const SympathyPage = lazy(() => import('./components/pages/SympathyPage'));
const LearnPage = lazy(() => import('./components/pages/LearnPage'));
const ToolsPage = lazy(() => import('./components/pages/ToolsPage'));
const HandTiedPage = lazy(() => import('./components/pages/HandTiedPage'));
const FoamFreePage = lazy(() => import('./components/pages/FoamFreePage'));
const WreathMakingPage = lazy(() => import('./components/pages/WreathMakingPage'));
const BridalBouquetsPage = lazy(() => import('./components/pages/BridalBouquetsPage'));
const CorsagesButtonholesPage = lazy(() => import('./components/pages/CorsagesButtonholesPage'));
const TableArrangementsPage = lazy(() => import('./components/pages/TableArrangementsPage'));
const WeddingStylesPage = lazy(() => import('./components/pages/WeddingStylesPage'));
const WeddingPricingPage = lazy(() => import('./components/pages/WeddingPricingPage'));
const WeddingCareerPage = lazy(() => import('./components/pages/WeddingCareerPage'));
const FlowerCareTimerPage = lazy(() => import('./components/pages/FlowerCareTimerPage'));

function PageLoading() {
  return (
    <div className="py-32 flex justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-stone-200 border-t-[#3D5C3A] animate-spin" />
    </div>
  );
}

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

  // Per-page title + meta description
  useEffect(() => {
    const route = ROUTES[page];
    document.title = route?.title ?? 'Page Not Found | My Floristry Helper';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', route?.description ?? ROUTES.home.description);
  }, [page]);

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
        <Suspense fallback={<PageLoading/>}>
          {pages[page] ?? <NotFoundPage go={go}/>}
        </Suspense>
      </div>
      <Footer go={go}/>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} go={go} />
    </div>
  );
}
