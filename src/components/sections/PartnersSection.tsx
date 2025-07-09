export const PartnersSection = () => {
  return (
    <section id="parceiros" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins">
          Nossos <span className="bg-gradient-to-r from-blue-600 to-emerald-400 bg-clip-text text-transparent">Parceiros</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Agradecemos a todos que acreditam e apoiam este evento de fé e esporte.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex justify-center items-center p-4 bg-gray-50 rounded-lg shadow-sm h-32 transition hover:shadow-md">
              <img 
                src="https://placehold.co/200x100/f0f0f0/a0a0a0?text=Logo+Parceiro" 
                alt={`Logo do Parceiro ${i + 1}`} 
                className="max-h-20 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://wa.me/5587999211865" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:brightness-110 transform hover:-translate-y-1"
          >
            <i className="fab fa-whatsapp mr-2"></i> Seja um Parceiro
          </a>
        </div>
      </div>
    </section>
  );
};