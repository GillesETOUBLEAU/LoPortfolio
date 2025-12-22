import { useReducer } from 'react';
import { PageId } from '../constants';

export type TabType = 'product' | 'crm' | 'press' | 'dealer';

interface NavigationState {
  activeSlide: string;
  currentPage: 'slides' | PageId;
  returnToSlide: string;
  activeTab: TabType;
}

type NavigationAction =
  | { type: 'SET_ACTIVE_SLIDE'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: TabType }
  | { type: 'NAVIGATE_TO_DETAIL_PAGE'; payload: { pageId: PageId; fromSlide: string; fromTab: TabType } }
  | { type: 'NAVIGATE_BACK_TO_SLIDES' };

const initialState: NavigationState = {
  activeSlide: 'cover',
  currentPage: 'slides',
  returnToSlide: 'ecosystem',
  activeTab: 'product',
};

function navigationReducer(state: NavigationState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case 'SET_ACTIVE_SLIDE':
      return {
        ...state,
        activeSlide: action.payload,
      };

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };

    case 'NAVIGATE_TO_DETAIL_PAGE':
      return {
        ...state,
        currentPage: action.payload.pageId,
        returnToSlide: action.payload.fromSlide,
        activeTab: action.payload.fromTab,
      };

    case 'NAVIGATE_BACK_TO_SLIDES':
      return {
        ...state,
        currentPage: 'slides',
      };

    default:
      return state;
  }
}

export function useNavigationState(initialSlide: string = 'cover') {
  const [state, dispatch] = useReducer(navigationReducer, {
    ...initialState,
    activeSlide: initialSlide,
  });

  const setActiveSlide = (slideId: string) => {
    dispatch({ type: 'SET_ACTIVE_SLIDE', payload: slideId });
  };

  const setActiveTab = (tab: TabType) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const navigateToDetailPage = (pageId: PageId, fromSlide: string, fromTab: TabType) => {
    dispatch({
      type: 'NAVIGATE_TO_DETAIL_PAGE',
      payload: { pageId, fromSlide, fromTab },
    });
  };

  const navigateBackToSlides = () => {
    dispatch({ type: 'NAVIGATE_BACK_TO_SLIDES' });
  };

  return {
    state,
    setActiveSlide,
    setActiveTab,
    navigateToDetailPage,
    navigateBackToSlides,
  };
}
