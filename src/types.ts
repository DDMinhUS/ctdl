export type TabId = 'roadmap' | 'codelab' | 'quiz' | 'cheatsheet' | 'deploy';

export type PriorityLevel = 'Bắt buộc' | 'Trọng tâm' | 'Phân loại 9-10đ';

export interface LineAnnotation {
  lineRange: string;
  snippet: string;
  javaSyntax: string;
  algoRole: string;
}

export interface RubricCheck {
  id: string;
  label: string;
  patterns: string[]; // regex strings to verify presence
  points: number;
  hintIfMissing: string;
}

export interface AlgorithmItem {
  id: string;
  title: string;
  topic: string;
  week: string;
  priority: PriorityLevel;
  timeComplexity: string;
  spaceComplexity: string;
  summary: string;
  paperTips: string[];
  javaIdioms: { token: string; meaning: string }[];
  starterCode: string;
  skeletonCode: string;
  modelCode: string;
  lineExplanations: LineAnnotation[];
  rubricChecks: RubricCheck[];
}

export interface McqQuestion {
  id: string;
  topic: string;
  source: string;
  type: 'mcq' | 'tf';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  trapNote: string;
}

export interface EssayQuestion {
  id: string;
  topic: string;
  source: string;
  maxScore: number;
  estimatedMinutes: number;
  prompt: string;
  codeSnippet?: string;
  hints: string[];
  rubricCriteria: string[];
  modelAnswer: string;
  keyPoints: string[]; // for offline keyword/concept grading fallback
}

export interface GradeResult {
  score: number;
  maxScore: number;
  verdict: 'Xuất sắc' | 'Đạt yêu cầu' | 'Cần sửa thêm' | 'Chưa đạt';
  provider: string;
  summary: string;
  strengths: string[];
  bugsOrGaps: string[];
  paperExamWarnings: string[];
  improvedSnippet?: string;
}

export interface ApiKeyEntry {
  id: string;
  label: string;
  key: string;
  enabled: boolean;
  status?: 'idle' | 'ok' | 'quota' | 'invalid';
  lastError?: string;
}

export interface ApiSettings {
  keys: ApiKeyEntry[];
  preferredModel: string;
  customModel: string;
}
