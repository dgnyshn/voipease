import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function Pricing() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handlePlanSelect = async (planName: string) => {
    await login(`${planName.toLowerCase()}@example.com`, 'trial');
    navigate('/dashboard');
  };

  const plans = [
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
      ],
      popular: false
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
      popular: true
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
      ],
      popular: false
    }
  ];

  return (
    <div id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${
                plan.popular
                  ? 'bg-blue-600 text-white transform scale-105'
                  : 'bg-white text-gray-900'
              } p-8 rounded-xl shadow-md relative`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-3 py-1 transform translate-x-2 -translate-y-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={plan.popular ? 'text-white/80' : 'text-gray-600'}>
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className={`h-5 w-5 ${
                      plan.popular ? 'text-white' : 'text-green-500'
                    } mr-2`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } px-6 py-3 rounded-lg transition-colors`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}