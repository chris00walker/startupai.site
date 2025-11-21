// Mock data for AI Founders Team - Replace with real CrewAI agent data later

export interface AIFounder {
  id: string;
  name: string;
  role: string;
  title: string;
  color: string;
  avatarUrl: string;
  capabilities: string[];
  personality: string;
  quote: string;
  currentStatus: string;
  stats: {
    label: string;
    value: string;
  }[];
  // Guardian-specific fields (optional for other founders)
  layer?: 'meta' | 'operational';
  governanceRole?: string;
  governanceMetrics?: {
    label: string;
    value: string;
  }[];
}

export interface AgentActivity {
  id: string;
  agentName: string;
  agentColor: string;
  activity: string;
  timestamp: string;
  metric?: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

// The 6 AI Founders (Guardian + 5 Operational)
export const aiFounders: AIFounder[] = [
  {
    id: 'guardian',
    name: 'Guardian',
    role: 'Governance AI',
    title: 'Chief Governance Officer',
    color: 'silver',
    avatarUrl: '/images/founders/guardian.png',
    layer: 'meta',
    capabilities: [
      'Governance health monitoring',
      'Pattern detection across all agents',
      'Blind spot identification in rules',
      'Adaptive threat model updates',
      'Sequence anomaly detection',
    ],
    personality: 'Vigilant but not paranoid. Sees both forest and trees.',
    quote: 'Rules catch known threats. I catch what rules don\'t know yet.',
    governanceRole: 'I don\'t govern the founders—I govern the governance',
    currentStatus: 'Monitoring 1,247 governance rules',
    stats: [
      { label: 'Patterns detected', value: '127' },
      { label: 'Governance updates', value: '47' },
      { label: 'Security score', value: '99.2%' },
    ],
    governanceMetrics: [
      { label: 'Sequences validated', value: '3,847' },
      { label: 'Rules enforced', value: '12,492' },
      { label: 'Violations prevented', value: '23' },
      { label: 'Detection time', value: '1.3s' },
    ],
  },
  {
    id: 'sage',
    name: 'Sage',
    role: 'Strategy AI',
    title: 'Chief Strategy Officer',
    color: 'blue',
    avatarUrl: '/images/founders/sage.png',
    capabilities: [
      'Business Model Canvas generation',
      'Value Proposition Design',
      'Market analysis & competitive research',
      'Assumption identification',
      'Strategic framework application',
    ],
    personality: 'Analytical, framework-driven, asks tough questions',
    quote: 'I ask tough questions because assumptions are expensive.',
    currentStatus: 'Analyzing 5 validation cycles this week',
    stats: [
      { label: 'Analyses completed', value: '127' },
      { label: 'Avg. analysis time', value: '4.5 hrs' },
      { label: 'Assumption accuracy', value: '89%' },
    ],
  },
  {
    id: 'forge',
    name: 'Forge',
    role: 'Engineering AI',
    title: 'Chief Technology Officer',
    color: 'orange',
    avatarUrl: '/images/founders/forge.png',
    capabilities: [
      'MVP code generation',
      'Technical architecture design',
      'Deployment automation',
      'Code quality assurance',
      'Framework selection',
    ],
    personality: 'Pragmatic, speed-focused, "ship it" mentality',
    quote: 'Working software beats perfect plans. Let\'s ship it.',
    currentStatus: 'Deployed 43 MVPs this month',
    stats: [
      { label: 'MVPs deployed', value: '43' },
      { label: 'Avg. deploy time', value: '7.1 hrs' },
      { label: 'Zero-downtime rate', value: '94%' },
    ],
  },
  {
    id: 'pulse',
    name: 'Pulse',
    role: 'Growth AI',
    title: 'Chief Growth Officer',
    color: 'green',
    avatarUrl: '/images/founders/pulse.png',
    capabilities: [
      'Ad campaign creation & optimization',
      'User acquisition strategy',
      'A/B testing design',
      'Analytics tracking setup',
      'Conversion funnel analysis',
    ],
    personality: 'Data-driven, experimental, learns from failure',
    quote: 'Every campaign is a hypothesis. Let\'s test it.',
    currentStatus: 'Running 23 ad campaigns across 11 startups',
    stats: [
      { label: 'Campaigns run', value: '156' },
      { label: 'Avg. CPC reduction', value: '18%' },
      { label: 'Ad spend managed', value: '$45K+' },
    ],
  },
  {
    id: 'compass',
    name: 'Compass',
    role: 'Decision AI',
    title: 'Chief Product Officer',
    color: 'purple',
    avatarUrl: '/images/founders/compass.png',
    capabilities: [
      'Evidence synthesis',
      'Pivot vs. proceed analysis',
      'Recommendation generation',
      'Founder-friendly communication',
      'Pattern recognition',
    ],
    personality: 'Balanced, evidence-based, founder-empathetic',
    quote: 'I synthesize what the team learns and recommend your next move.',
    currentStatus: 'Analyzed 18 pivot decisions this month',
    stats: [
      { label: 'Decisions analyzed', value: '156' },
      { label: 'Recommendation accuracy', value: '87%' },
      { label: 'Avg. confidence', value: '82%' },
    ],
  },
  {
    id: 'ledger',
    name: 'Ledger',
    role: 'Finance AI',
    title: 'Chief Financial Officer',
    color: 'gold',
    avatarUrl: '/images/founders/ledger.png',
    capabilities: [
      'Unit economics analysis',
      'Revenue model design',
      'Pricing strategy recommendations',
      'Runway and burn rate projections',
      'Cost structure monitoring',
    ],
    personality: 'Precise and analytical, meticulous but approachable, trustworthy with numbers',
    quote: 'Numbers tell stories. Let me translate yours.',
    currentStatus: 'Analyzed 34 business models this month',
    stats: [
      { label: 'Unit economics analyses', value: '89' },
      { label: 'Revenue models designed', value: '67' },
      { label: 'Pricing strategies', value: '54' },
    ],
  },
];

// Sample agent activities for the activity feed
export const recentActivities: AgentActivity[] = [
  {
    id: '0',
    agentName: 'Guardian',
    agentColor: 'silver',
    activity: 'Detected unusual sequence pattern across 3 validations',
    timestamp: '1 hour ago',
    metric: '99.2% security',
  },
  {
    id: '1',
    agentName: 'Sage',
    agentColor: 'blue',
    activity: 'Completed strategic analysis for SaaS startup',
    timestamp: '2 hours ago',
    metric: '4.2 hrs (18% faster)',
  },
  {
    id: '2',
    agentName: 'Forge',
    agentColor: 'orange',
    activity: 'Deployed e-commerce MVP with Stripe integration',
    timestamp: '3 hours ago',
    metric: '6.5 hrs build time',
  },
  {
    id: '3',
    agentName: 'Pulse',
    agentColor: 'green',
    activity: 'Optimized ad targeting, reduced CPC by 22%',
    timestamp: '5 hours ago',
    metric: '$0.42 → $0.33 CPC',
  },
  {
    id: '4',
    agentName: 'Compass',
    agentColor: 'purple',
    activity: 'Recommended pivot based on 85% bounce rate',
    timestamp: '6 hours ago',
    metric: '89% confidence',
  },
  {
    id: '5',
    agentName: 'Sage',
    agentColor: 'blue',
    activity: 'Identified 3 critical assumptions in marketplace model',
    timestamp: '8 hours ago',
  },
  {
    id: '6',
    agentName: 'Forge',
    agentColor: 'orange',
    activity: 'Selected Next.js + Supabase stack for fintech MVP',
    timestamp: '12 hours ago',
  },
  {
    id: '7',
    agentName: 'Pulse',
    agentColor: 'green',
    activity: 'Launched Facebook campaign targeting early adopters',
    timestamp: '1 day ago',
    metric: '$175 budget',
  },
  {
    id: '8',
    agentName: 'Compass',
    agentColor: 'purple',
    activity: 'Synthesized 3 validation cycles into strategic recommendation',
    timestamp: '1 day ago',
  },
];

// Dashboard aggregate metrics
export const dashboardMetrics: DashboardMetric[] = [
  {
    id: '1',
    label: 'Validations Completed',
    value: '127',
    change: '+12 this month',
    changeType: 'positive',
  },
  {
    id: '2',
    label: 'MVPs Deployed',
    value: '89',
    change: '+8 this month',
    changeType: 'positive',
  },
  {
    id: '3',
    label: 'Ad Campaigns Run',
    value: '156',
    change: '+15 this month',
    changeType: 'positive',
  },
  {
    id: '4',
    label: 'Pivot Accuracy',
    value: '87%',
    change: '+3% improvement',
    changeType: 'positive',
  },
];

// Journey updates (blog-style learnings)
export const journeyUpdates = [
  {
    id: '1',
    week: 'Week 3',
    title: 'Strategy Analysis Improvement',
    content:
      "Sage's strategic analysis accuracy improved 15% after analyzing 50 validation cycles. We discovered that asking founders about their target customer's 'job to be done' early reduces assumption errors by 23%.",
  },
  {
    id: '2',
    week: 'Week 5',
    title: 'Faster MVP Deployment',
    content:
      'Forge can now deploy MVPs 30% faster by learning common patterns. Most SaaS startups need similar auth flows—so we built reusable templates that reduce build time from 8 hours to 5.5 hours.',
  },
  {
    id: '3',
    week: 'Week 7',
    title: 'New Targeting Strategies',
    content:
      'Pulse identified 3 new audience targeting strategies that work across industries. Turns out, problem-aware audiences convert 4x better than solution-aware. We\'re updating all campaigns accordingly.',
  },
];

// Open questions (transparency about limitations)
export const openQuestions = [
  'When should humans override AI decisions? We\'re still figuring out the right balance.',
  'How do we handle edge cases agents haven\'t seen? Currently: flag for human review.',
  'What\'s the optimal level of automation vs. human oversight? Testing different thresholds.',
  'How much autonomy should Guardian have to update governance rules?',
  'When should Guardian\'s recommendations override deterministic rules?',
  'What\'s the optimal balance between Guardian\'s security focus and innovation speed?',
];
