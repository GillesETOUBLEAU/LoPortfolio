export interface SlideProps {
  isActive: boolean;
}

export interface OrbitNodeData {
  id: string;
  label: string;
  subLabel?: string;
  position: 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-right-mid' | 'bottom-right-mid' | 'bottom-left-mid' | 'top-left-mid';
}

export interface OrbitCenterData {
  label: string;
  subLabel?: string;
}

export interface NavItem {
  id: string;
  label: string;
}