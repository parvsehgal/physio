const Stats = () => {
  const statistics = [
    { number: "10,000+", label: "Happy Patients" },
    { number: "500+", label: "Certified Therapists" },
    { number: "50+", label: "Cities Covered" },
    { number: "98%", label: "Success Rate" }
  ];
  
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#f0fdf7' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl lg:text-5xl font-bold" style={{ color: '#7ce3b1' }}>
                {stat.number}
              </div>
              <div className="text-gray-700 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
