export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export interface SplashScreenProps {
  onComplete?: () => void;
}

export interface OnboardingScreenProps {
  onComplete?: () => void;
}