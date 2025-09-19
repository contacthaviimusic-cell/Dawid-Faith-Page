import React from 'react';

const DFaithAppNews = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-white mb-4">D.FAITH App Features</h3>
    <p className="text-gray-300 leading-relaxed">
      Die D.FAITH App revolutioniert das Fan-Engagement durch Blockchain-Technologie. Fans können jetzt durch 
      ihre natürlichen Social Media Aktivitäten D.FAITH Token verdienen und diese gegen exklusive Rewards eintauschen.
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-slate-800/50 p-4 rounded-xl">
        <h4 className="text-purple-300 font-semibold mb-2">App-Features</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Instagram/TikTok Integration</li>
          <li>• Automatische EXP-Sammlung</li>
          <li>• Live Leaderboard-System</li>
          <li>• Cross-Platform Tracking</li>
        </ul>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl">
        <h4 className="text-purple-300 font-semibold mb-2">Token-Rewards</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Like: 10 EXP → D.FAITH</li>
          <li>• Kommentar: 10 EXP → D.FAITH</li>
          <li>• Share: 10 EXP → D.FAITH</li>
          <li>• Live-Konzert: 150 EXP → D.FAITH</li>
        </ul>
      </div>
    </div>
    <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
      <h4 className="text-lg font-semibold text-purple-300 mb-3">D.FAITH Exklusiv Shop</h4>
      <p className="text-gray-300 text-sm mb-3">
        Nutze deine verdienten D.FAITH Token im exklusiven Shop für neue Songs, limitierte Merchandise, 
        signierte Editionen und Konzert-Tickets - alles 20-50% günstiger als normale Preise!
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Live auf Base Chain</span>
        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Fan-Rewards</span>
        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">Exklusiv Shop</span>
      </div>
    </div>
  </div>
);

export default DFaithAppNews;