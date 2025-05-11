'use client';

import React, { useState } from 'react';
import { Check, X, AlertTriangle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ComplianceChecker({ region }) {
  const [productType, setProductType] = useState('food');
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  // Region-specific compliance requirements
  const complianceRequirements = {
    asean: {
      food: [
        { id: 'halal_cert', question: 'Do you have a halal certification from a recognized body in your country?', required: true },
        { id: 'ingredients', question: 'Are all ingredients halal-certified or from halal sources?', required: true },
        { id: 'facility', question: 'Is your production facility dedicated to halal products or properly segregated?', required: true },
        { id: 'packaging', question: 'Does your packaging include halal logo and certification details?', required: true },
        { id: 'traceability', question: 'Do you have a traceability system for all ingredients?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ],
      cosmetics: [
        { id: 'halal_cert', question: 'Do you have a halal certification for cosmetic products?', required: true },
        { id: 'ingredients', question: 'Are all ingredients free from alcohol, animal derivatives, and other non-halal substances?', required: true },
        { id: 'testing', question: 'Is your product free from animal testing?', required: true },
        { id: 'packaging', question: 'Does your packaging include halal logo and certification details?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ],
      pharmaceutical: [
        { id: 'halal_cert', question: 'Do you have a halal certification for pharmaceutical products?', required: true },
        { id: 'ingredients', question: 'Are all ingredients free from non-halal substances?', required: true },
        { id: 'gelatin', question: 'If using gelatin capsules, are they from halal sources?', required: true },
        { id: 'alcohol', question: 'Is the product free from alcohol or is alcohol use justified and minimized?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ]
    },
    china: {
      food: [
        { id: 'halal_cert', question: 'Do you have a halal certification from China Islamic Association or provincial bodies?', required: true },
        { id: 'ingredients', question: 'Are all ingredients halal-certified or from halal sources?', required: true },
        { id: 'facility', question: 'Is your production facility dedicated to halal products or properly segregated?', required: true },
        { id: 'chinese_label', question: 'Does your packaging include Chinese language labeling with halal information?', required: true },
        { id: 'import_reg', question: 'Do you have Chinese import registration for foreign products?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ],
      cosmetics: [
        { id: 'halal_cert', question: 'Do you have a halal certification recognized in China?', required: true },
        { id: 'ingredients', question: 'Are all ingredients free from alcohol, animal derivatives, and other non-halal substances?', required: true },
        { id: 'chinese_reg', question: 'Is your product registered with Chinese cosmetic authorities?', required: true },
        { id: 'chinese_label', question: 'Does your packaging include Chinese language labeling with halal information?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ]
    },
    russia: {
      food: [
        { id: 'halal_cert', question: 'Do you have a halal certification from Russia Muftis Council or recognized international body?', required: true },
        { id: 'ingredients', question: 'Are all ingredients halal-certified or from halal sources?', required: true },
        { id: 'facility', question: 'Is your production facility dedicated to halal products or properly segregated?', required: true },
        { id: 'russian_label', question: 'Does your packaging include Russian language labeling with halal information?', required: true },
        { id: 'customs', question: 'Do you have Russian customs clearance documentation for imported products?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ],
      fashion: [
        { id: 'halal_cert', question: 'Do you have a halal certification for textile products?', required: true },
        { id: 'materials', question: 'Are all materials from permissible sources?', required: true },
        { id: 'russian_label', question: 'Does your packaging include Russian language labeling?', required: true },
        { id: 'blockchain', question: 'Is your certification verified on blockchain?', required: false }
      ]
    }
  };

  const productTypes = {
    asean: ['food', 'cosmetics', 'pharmaceutical'],
    china: ['food', 'cosmetics'],
    russia: ['food', 'fashion']
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const resetForm = () => {
    setAnswers({});
    setShowResults(false);
  };

  const calculateCompliance = () => {
    const requirements = complianceRequirements[region]?.[productType] || [];
    
    let requiredCount = 0;
    let metCount = 0;
    let recommendedCount = 0;
    let metRecommendedCount = 0;
    
    requirements.forEach(req => {
      if (req.required) {
        requiredCount++;
        if (answers[req.id] === 'yes') {
          metCount++;
        }
      } else {
        recommendedCount++;
        if (answers[req.id] === 'yes') {
          metRecommendedCount++;
        }
      }
    });
    
    const requiredPercentage = requiredCount > 0 ? (metCount / requiredCount) * 100 : 0;
    const recommendedPercentage = recommendedCount > 0 ? (metRecommendedCount / recommendedCount) * 100 : 0;
    
    return {
      requiredPercentage,
      recommendedPercentage,
      metCount,
      requiredCount,
      metRecommendedCount,
      recommendedCount,
      isFullyCompliant: metCount === requiredCount,
      isPartiallyCompliant: metCount > 0 && metCount < requiredCount
    };
  };

  const compliance = calculateCompliance();
  const requirements = complianceRequirements[region]?.[productType] || [];
  const availableProductTypes = productTypes[region] || [];
  const regionTitle = region === 'asean' ? 'ASEAN' : region === 'china' ? 'China' : 'Russia';

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Halal Compliance Checker for {regionTitle}</h2>
      <p className="mb-6 text-gray-600">
        Check if your product meets the halal compliance requirements for {regionTitle} markets.
      </p>

      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {availableProductTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-6 mb-8">
            {requirements.map((req) => (
              <div key={req.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <p className="font-medium mb-1">{req.question}</p>
                    <p className="text-sm text-gray-500">
                      {req.required ? 'Required' : 'Recommended'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(req.id, 'yes')}
                      className={`px-4 py-2 rounded-lg ${
                        answers[req.id] === 'yes'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswerChange(req.id, 'no')}
                      className={`px-4 py-2 rounded-lg ${
                        answers[req.id] === 'no'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
          >
            Check Compliance
          </button>
        </form>
      ) : (
        <div>
          <div className={`p-6 rounded-lg mb-6 ${
            compliance.isFullyCompliant
              ? 'bg-green-50 border border-green-200'
              : compliance.isPartiallyCompliant
              ? 'bg-amber-50 border border-amber-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center mb-4">
              {compliance.isFullyCompliant ? (
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              ) : compliance.isPartiallyCompliant ? (
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
              ) : (
                <div className="bg-red-100 p-2 rounded-full">
                  <X className="h-6 w-6 text-red-600" />
                </div>
              )}
              <h3 className="ml-3 text-lg font-medium">
                {compliance.isFullyCompliant
                  ? 'Fully Compliant'
                  : compliance.isPartiallyCompliant
                  ? 'Partially Compliant'
                  : 'Not Compliant'}
              </h3>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Required Compliance</span>
                <span className="text-sm font-medium">{compliance.requiredPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    compliance.requiredPercentage === 100
                      ? 'bg-green-600'
                      : compliance.requiredPercentage >= 50
                      ? 'bg-amber-500'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${compliance.requiredPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {compliance.metCount} of {compliance.requiredCount} required criteria met
              </p>
            </div>

            {compliance.recommendedCount > 0 && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Recommended Compliance</span>
                  <span className="text-sm font-medium">{compliance.recommendedPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-blue-600"
                    style={{ width: `${compliance.recommendedPercentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {compliance.metRecommendedCount} of {compliance.recommendedCount} recommended criteria met
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <button
                onClick={() => toggleSection('required')}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
              >
                <span className="font-medium">Required Criteria</span>
                {expandedSection === 'required' ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {expandedSection === 'required' && (
                <div className="mt-2 space-y-2 pl-4">
                  {requirements
                    .filter(req => req.required)
                    .map(req => (
                      <div key={req.id} className="flex items-start p-2 border-b border-gray-100">
                        {answers[req.id] === 'yes' ? (
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        ) : answers[req.id] === 'no' ? (
                          <X className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                        ) : (
                          <HelpCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        )}
                        <span className={answers[req.id] === 'no' ? 'text-red-600' : ''}>{req.question}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            
            {requirements.some(req => !req.required) && (
              <div>
                <button
                  onClick={() => toggleSection('recommended')}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <span className="font-medium">Recommended Criteria</span>
                  {expandedSection === 'recommended' ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                
                {expandedSection === 'recommended' && (
                  <div className="mt-2 space-y-2 pl-4">
                    {requirements
                      .filter(req => !req.required)
                      .map(req => (
                        <div key={req.id} className="flex items-start p-2 border-b border-gray-100">
                          {answers[req.id] === 'yes' ? (
                            <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          ) : answers[req.id] === 'no' ? (
                            <X className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                          ) : (
                            <HelpCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                          )}
                          <span>{req.question}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
            >
              Check Another Product
            </button>
            
            {!compliance.isFullyCompliant && (
              <button
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
              >
                Get Compliance Assistance
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}