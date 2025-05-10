export default function IntegrationProcess() {
  const steps = [
    {
      number: 1,
      title: "Register",
      description: "Create a developer account and register your application to receive API keys and credentials."
    },
    {
      number: 2,
      title: "Choose Integration",
      description: "Select the appropriate APIs, SDKs, or platform connectors based on your application's requirements."
    },
    {
      number: 3,
      title: "Develop",
      description: "Implement the integration using our comprehensive documentation and developer tools."
    },
    {
      number: 4,
      title: "Test",
      description: "Thoroughly test your integration in our sandbox environment with simulated data and transactions."
    },
    {
      number: 5,
      title: "Go Live",
      description: "Deploy to production with our support team's assistance and monitoring tools."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Integration Process</h2>
        
        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-6 rounded-xl shadow-md relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}