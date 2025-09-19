import React from 'react';

const DInvestTokenNews = () => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-white mb-4">D.INVEST Token Details</h3>
    <p className="text-gray-300 leading-relaxed">
      Der D.INVEST Token ist der Investment-Token des D.FAITH Ökosystems. Mit einem festen Preis von 5€ pro Token 
      und einer Total Supply von nur 10.000 Token bietet er eine einzigartige Möglichkeit, am Erfolg von Dawid Faith teilzuhaben.
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-slate-800/50 p-4 rounded-xl">
        <h4 className="text-purple-300 font-semibold mb-2">Token-Details</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Preis: 5,00€ pro Token (fest)</li>
          <li>• Total Supply: 10.000 Token</li>
          <li>• Gesamtkapital: 50.000€</li>
          <li>• Live auf Base Chain</li>
        </ul>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl">
        <h4 className="text-purple-300 font-semibold mb-2">Staking-Rewards</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• 0,1 D.FAITH pro Woche (Initial)</li>
          <li>• 6-Stufen Halving-System</li>
          <li>• Bis zu 104% ROI möglich</li>
          <li>• Automatische Smart Contract Ausschüttung</li>
        </ul>
      </div>
    </div>
    <div className="bg-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
      <h4 className="text-lg font-semibold text-purple-300 mb-3">Investment-Möglichkeit</h4>
      <p className="text-gray-300 text-sm mb-3">
        Durch das Staking von D.INVEST Token erhältst du wöchentliche D.FAITH Rewards. Das 6-Stufen Halving-System 
        sorgt für kontinuierliche Verknappung und potenzielle Wertsteigerung.
      </p>
      <div className="flex flex-wrap gap-3">
        <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">Fixed Price: 5€</span>
        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">Weekly Rewards</span>
        <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">High ROI Potential</span>
      </div>
    </div>
  </div>
);

export default DInvestTokenNews;