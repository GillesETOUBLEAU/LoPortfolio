export interface SlideProps {
  isActive: boolean;
}

export interface OrbitNodeData {
  id: string;
  label: string;
  subLabel?: string;
  position: 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-right-mid' | 'bottom-right-mid' | 'bottom-left-mid' | 'top-left-mid' | 'top-right-mid-7' | 'bottom-right-mid-7' | 'bottom-right-mid-7-2' | 'bottom-left-mid-7' | 'bottom-left-mid-7-2' | 'top-left-mid-7' | 'top-right-mid-5' | 'bottom-right-mid-5' | 'bottom-left-mid-5' | 'top-left-mid-5' | 'top-right-mid-3' | 'top-left-mid-3';
}

export interface OrbitCenterData {
  label: string;
  subLabel?: string;
}

export interface NavItem {
  id: string;
  label: string;
}