import React from 'react';

export type ViewState = 'dashboard' | 'track' | 'analyze' | 'experiment' | 'data' | 'settings' | 'help';

export interface Recommendation {
  id: string;
  action: string;
  category: 'Marketing' | 'Sales' | 'Product' | 'RevOps';
  categoryColor: string;
  impact: 'High' | 'Medium' | 'Low';
  impactColor: string;
  status: 'Pending' | 'Implemented' | 'Dismissed';
}

export interface Simulation {
  id: string;
  hypothesis: string;
  status: 'Running' | 'Completed' | 'Draft';
  confidenceScore: number;
  predictedImpact: string;
  ownerName: string;
  ownerAvatar: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change: number | string; 
  subtext: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface LiveEvent {
  id: string;
  timestamp: string;
  type: 'Revenue' | 'Lead' | 'Traffic' | 'System';
  message: string;
  value?: string;
  delta?: 'positive' | 'negative' | 'neutral';
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  target: string;
  status: 'Healthy' | 'At Risk' | 'Critical';
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  category: 'Sales' | 'Marketing' | 'Finance';
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
  metric: string;
  impact: string;
}