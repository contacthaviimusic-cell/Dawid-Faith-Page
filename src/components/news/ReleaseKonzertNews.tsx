import React from 'react';

const ReleaseKonzertNews = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-white mb-4">Event-Details</h3>
    <p className="text-gray-300 leading-relaxed">
      Das Release-Konzert wird ein einmaliges Erlebnis mit den ersten beiden Songs von Dawid Faith. 
      Erlebe &apos;Maria&apos; und &apos;Znikła&apos; live in einer intimen Atmosphäre bei Katys Garage in Dresden Neustadt.
    </p>
    <div className="bg-blue-900/30 p-6 rounded-2xl border border-blue-500/20">
      <h4 className="text-lg font-semibold text-blue-300 mb-4">Konzert-Info</h4>
      <div className="grid md:grid-cols-2 gap-4 text-gray-300">
        <div>
          <p className="font-medium">Datum & Zeit</p>
          <p className="text-sm">15. November 2025, 19:00 Uhr</p>
        </div>
        <div>
          <p className="font-medium">Location</p>
          <p className="text-sm">Katys Garage in Dresden Neustadt</p>
        </div>
        <div>
          <p className="font-medium">Songs</p>
          <p className="text-sm">Maria & Znikła (Premiere)</p>
        </div>
        <div>
          <p className="font-medium">Besonderheit</p>
          <p className="text-sm">Dawid Faith&apos;s erste Songs live</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-blue-500/20">
        <p className="text-gray-300 text-sm">
          Am 15. November um 19:00 Uhr bei Katys Garage in Dresden Neustadt erwartet dich ein unvergesslicher Abend voller Musik, Emotionen und Überraschungen. Feiere mit uns den Beginn von Dawid Faith&apos;s musikalischer Reise! Erlebe &apos;Maria&apos; und &apos;Znikła&apos; zum ersten Mal live in einer intimen Atmosphäre.
        </p>
      </div>
    </div>
    <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
      <h4 className="text-lg font-semibold text-purple-300 mb-3">Premiere Songs</h4>
      <div className="flex flex-wrap gap-3">
        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Maria</span>
        <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">Znikła</span>
        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Live Premiere</span>
      </div>
    </div>
  </div>
);

export default ReleaseKonzertNews;