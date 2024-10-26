import React from 'react';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const BillingPage = () => {
  const currentPlan: Plan = {
    name: 'Small Business',
    price: 59.99,
    features: [
      'Up to 3 users',
      '2,500 minutes/user/month',
      'Call forwarding',
      'Voicemail',
      'Instant notifications',
      'Priority chat support',
      'Additional minutes from $9.99'
    ]
  };

  const plans: Plan[] = [
    {
      name: 'Freelancer',
      price: 14.99,
      features: [
        '1 user',
        '750 minutes/month',
        'Call forwarding',
        'Voicemail',
        'Basic support',
        'Additional minutes from $4.99'
      ]
    },
    {
      name: 'Small Business',
      price: 59.99,
      features: [
        'Up to 3 users',
        '2,500 minutes/user/month',
        'Call forwarding',
        'Voicemail',
        'Instant notifications',
        'Priority chat support',
        'Additional minutes from $9.99'
      ],
      isPopular: true
    },
    {
      name: 'Team',
      price: 139.99,
      features: [
        'Up to 10 users',
        '1,500 minutes/user/month',
        'Call forwarding',
        'Voicemail',
        'Instant notifications',
        'Priority chat support',
        'Additional minutes from $14.99'
      ]
    }
  ];

  const handlePlanChange = (plan: Plan) => {
    if (plan.name === currentPlan.name) {
      return;
    }

    if (plan.price < currentPlan.price) {
      alert('Your current plan will remain active until the end of the billing period. The new plan will take effect on your next billing date.');
    } else {
      alert('Your upgrade will take effect immediately. You will be charged the prorated difference for the remainder of the billing period.');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
          <p className="text-gray-500">Manage your subscription and billing details</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Current Plan: {currentPlan.name}</h2>
              <p className="text-gray-500">Next billing date: April 15, 2024</p>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${currentPlan.price}/mo
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-sm border ${
                plan.isPopular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
              } p-6 relative`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.name === currentPlan.name ? (
                <div className="px-4 py-2 bg-blue-500 text-white text-center rounded-lg">
                  Current Plan
                </div>
              ) : (
                <div>
                  <button
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors mb-2"
                    onClick={() => handlePlanChange(plan)}
                  >
                    {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    {plan.price > currentPlan.price 
                      ? 'Upgrade takes effect immediately' 
                      : 'Changes take effect next billing cycle'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;