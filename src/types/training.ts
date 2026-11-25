export type Session = 'pagi' | 'siang' | 'penutup';

export interface MaterialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Analogy {
  title: string;
  body: string;
}

export interface CaseStudy {
  title: string;
  context: string;
  whatHappened: string;
  lesson: string;
}

export interface DoDontRow {
  doIt: string;
  dontIt: string;
  why: string;
}

export interface InstructorGuide {
  durationMinutes: number;
  talkingPoints: string[];
  discussionPrompt: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  action: string;
  tag: string;
}

export interface WorkflowDiagramSpec {
  title: string;
  subtitle: string;
  steps: WorkflowStep[];
}

export interface ModuleContent {
  id: number;
  slug: string;
  session: Exclude<Session, 'penutup'>;
  timeSlot: string;
  title: string;
  tagline: string;
  objectives: string[];
  workflowDiagram: WorkflowDiagramSpec;
  sections: MaterialSection[];
  analogy: Analogy;
  sasCases: CaseStudy[];
  doDont: DoDontRow[];
  instructorGuide: InstructorGuide;
  keyTakeaways: string[];
  lab: {
    title: string;
    summary: string;
  };
}

export interface ModuleExploration {
  explored: boolean;
  exploredItems: number;
  totalItems: number;
  lastVisitedAt?: string;
}

export interface LearningProgressState {
  version: 2;
  modules: Record<number, ModuleExploration>;
  theme: 'light' | 'dark';
}

export interface GoldenRule {
  id: number;
  title: string;
  rule: string;
  reason: string;
}

export interface LabProps {
  moduleId: number;
  instructorMode?: boolean;
  onMarkExplored: (exploredItems: number, totalItems: number) => void;
}
