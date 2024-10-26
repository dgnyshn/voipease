import { create } from 'zustand';

export type PlanType = 'freelancer' | 'small_business' | 'team';

interface PlanFeature {
  enabled: boolean;
  limit?: number;
  tooltip?: string;
}

interface PlanFeatures {
  users: PlanFeature;
  minutes: PlanFeature;
  callForwarding: PlanFeature;
  voicemail: PlanFeature;
  analytics: PlanFeature;
  internationalCalls: PlanFeature;
  support: PlanFeature;
  callRecording: PlanFeature;
  conferencing: PlanFeature;
  api: PlanFeature;
}

export const PLAN_CONFIGS: Record<PlanType, PlanFeatures> = {
  freelancer: {
    users: {
      enabled: true,
      limit: 1,
      tooltip: 'Single user only'
    },
    minutes: {
      enabled: true,
      limit: 100,
      tooltip: '100 minutes included, $0.02/min after'
    },
    callForwarding: {
      enabled: true,
      limit: 1,
      tooltip: 'Forward to one number'
    },
    voicemail: {
      enabled: true,
      tooltip: 'Basic voicemail features'
    },
    analytics: {
      enabled: false,
      tooltip: 'Upgrade for analytics features'
    },
    internationalCalls: {
      enabled: true,
      tooltip: 'Standard international rates apply'
    },
    support: {
      enabled: true,
      tooltip: 'Email support only'
    },
    callRecording: {
      enabled: false,
      tooltip: 'Upgrade for call recording'
    },
    conferencing: {
      enabled: false,
      tooltip: 'Upgrade for conference calls'
    },
    api: {
      enabled: false,
      tooltip: 'Upgrade for API access'
    }
  },
  small_business: {
    users: {
      enabled: true,
      limit: 3,
      tooltip: 'Up to 3 users included'
    },
    minutes: {
      enabled: true,
      limit: -1,
      tooltip: 'Unlimited minutes included'
    },
    callForwarding: {
      enabled: true,
      limit: 3,
      tooltip: 'Forward to up to 3 numbers'
    },
    voicemail: {
      enabled: true,
      tooltip: 'Enhanced voicemail with transcription'
    },
    analytics: {
      enabled: true,
      tooltip: 'Basic analytics included'
    },
    internationalCalls: {
      enabled: true,
      tooltip: 'Discounted international rates'
    },
    support: {
      enabled: true,
      tooltip: 'Priority email support'
    },
    callRecording: {
      enabled: true,
      tooltip: 'Call recording included'
    },
    conferencing: {
      enabled: true,
      limit: 5,
      tooltip: 'Up to 5 participants'
    },
    api: {
      enabled: false,
      tooltip: 'Upgrade for API access'
    }
  },
  team: {
    users: {
      enabled: true,
      limit: 10,
      tooltip: 'Up to 10 users included'
    },
    minutes: {
      enabled: true,
      limit: -1,
      tooltip: 'Unlimited minutes included'
    },
    callForwarding: {
      enabled: true,
      limit: 10,
      tooltip: 'Forward to up to 10 numbers'
    },
    voicemail: {
      enabled: true,
      tooltip: 'Premium voicemail with advanced features'
    },
    analytics: {
      enabled: true,
      tooltip: 'Advanced analytics included'
    },
    internationalCalls: {
      enabled: true,
      tooltip: 'Best international rates'
    },
    support: {
      enabled: true,
      tooltip: '24/7 priority support'
    },
    callRecording: {
      enabled: true,
      tooltip: 'Advanced call recording'
    },
    conferencing: {
      enabled: true,
      limit: 20,
      tooltip: 'Up to 20 participants'
    },
    api: {
      enabled: true,
      tooltip: 'Full API access included'
    }
  }
};

interface PlanState {
  currentPlan: PlanType;
  isFeatureEnabled: (feature: keyof PlanFeatures) => boolean;
  getFeatureLimit: (feature: keyof PlanFeatures) => number | undefined;
  getFeatureTooltip: (feature: keyof PlanFeatures) => string | undefined;
  getUserLimit: () => number;
  upgradePlan: (newPlan: PlanType) => Promise<void>;
}

const usePlanStore = create<PlanState>((set, get) => ({
  currentPlan: 'freelancer',

  isFeatureEnabled: (feature) => {
    const currentPlan = get().currentPlan;
    return PLAN_CONFIGS[currentPlan][feature].enabled;
  },

  getFeatureLimit: (feature) => {
    const currentPlan = get().currentPlan;
    return PLAN_CONFIGS[currentPlan][feature].limit;
  },

  getFeatureTooltip: (feature) => {
    const currentPlan = get().currentPlan;
    return PLAN_CONFIGS[currentPlan][feature].tooltip;
  },

  getUserLimit: () => {
    const currentPlan = get().currentPlan;
    return PLAN_CONFIGS[currentPlan].users.limit || 0;
  },

  upgradePlan: async (newPlan) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ currentPlan: newPlan });
  }
}));

export default usePlanStore;