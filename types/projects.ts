export interface Project {
  id: string;
  title: string;
  category: 'energy' | 'containers' | 'metal';
  client: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  technicalSpecs: Record<string, string>;
  details: {
    problemStatement: string;
    engineeringApproach: string;
    results: string;
  };
}

