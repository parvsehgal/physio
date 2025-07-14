const Network = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Connected Healthcare
              <span className="block" style={{ color: '#7ce3b1' }}>Network</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our platform connects you with a vast network of certified physiotherapists, 
              healthcare providers, and specialists working together to ensure you receive 
              the best possible care.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7ce3b1' }}></div>
                <span className="text-gray-700">Seamless referrals between specialists</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7ce3b1' }}></div>
                <span className="text-gray-700">Coordinated treatment plans</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7ce3b1' }}></div>
                <span className="text-gray-700">Real-time progress tracking</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg">
              <img 
                src="/networkImg.png" 
                alt="Healthcare Network Diagram" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Network;
