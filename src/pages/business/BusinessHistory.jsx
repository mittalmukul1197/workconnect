import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Icon } from '../../components/common/Icon';

export const BusinessHistory = ({ onNavigate }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [downloadSuccessAlert, setDownloadSuccessAlert] = useState(null);

  const completedHistory = [
    {
      id: 'HIS-801',
      title: '50 Ethnic Kurtis Alteration & Overlock',
      category: 'Tailoring',
      workerName: 'Sunita Sharma',
      completedDate: '15 Aug 2026',
      totalPaid: '₹1,500',
      escrowTxnId: 'TXN-ESC-99210',
      ratingGiven: 5.0,
      status: 'Settled via WorkConnect Escrow'
    },
    {
      id: 'HIS-802',
      title: 'Commercial Solar Inverter Cabling',
      category: 'Electrical',
      workerName: 'Gurpreet Singh',
      completedDate: '10 Aug 2026',
      totalPaid: '₹2,400',
      escrowTxnId: 'TXN-ESC-98451',
      ratingGiven: 4.9,
      status: 'Settled via WorkConnect Escrow'
    },
    {
      id: 'HIS-803',
      title: '20 Custom Blazer Fitting & Stitching',
      category: 'Tailoring',
      workerName: 'Priya Kaur',
      completedDate: '02 Aug 2026',
      totalPaid: '₹1,800',
      escrowTxnId: 'TXN-ESC-97104',
      ratingGiven: 4.8,
      status: 'Settled via WorkConnect Escrow'
    },
    {
      id: 'HIS-804',
      title: 'Warehouse Main DB Short Circuit Repair',
      category: 'Electrical',
      workerName: 'Manish Kumar',
      completedDate: '24 Jul 2026',
      totalPaid: '₹850',
      escrowTxnId: 'TXN-ESC-95002',
      ratingGiven: 5.0,
      status: 'Settled via WorkConnect Escrow'
    }
  ];

  const filtered = completedHistory.filter(
    (item) => filterCategory === 'All' || item.category === filterCategory
  );

  const handleDownloadInvoice = (txnId) => {
    setDownloadSuccessAlert(`Invoice for ${txnId} downloaded successfully!`);
    setTimeout(() => {
      setDownloadSuccessAlert(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-indigo-100 bg-white shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Completed Work Order History</h1>
          <p className="text-xs text-slate-500 font-medium">
            28 projects completed with a 96% on-time delivery rate. All payouts settled 100% scam-free via WorkConnect Platform Escrow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="emerald" className="py-1 px-3 text-xs">
            🛡️ 100% Escrow Verified
          </Badge>
        </div>
      </div>

      {downloadSuccessAlert && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-scale-up">
          <div className="flex items-center gap-2 font-bold">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccessAlert}</span>
          </div>
          <button onClick={() => setDownloadSuccessAlert(null)} className="text-slate-500 hover:text-slate-700">
            <Icon name="x" className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Tailoring', 'Electrical'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              filterCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat} Orders
          </button>
        ))}
      </div>

      {/* History Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <Card key={item.id} borderVariant="emerald" className="p-5 space-y-4 bg-white shadow-sm hover:shadow-md rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                  <Badge variant="indigo">{item.category}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Completed on: <strong className="text-slate-800">{item.completedDate}</strong> • Ref: {item.id}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Settled Amount</span>
                <span className="text-lg font-black text-emerald-700">{item.totalPaid}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Assigned Local Artisan</span>
                <p className="font-bold text-slate-900">{item.workerName}</p>
                <p className="text-amber-700 font-bold text-[11px]">★ {item.ratingGiven} Rating Given</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Escrow Settlement Receipt</span>
                <p className="font-mono text-indigo-700 font-bold text-[11px]">{item.escrowTxnId}</p>
                <p className="text-emerald-700 font-semibold text-[10px]">{item.status}</p>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  icon="file-text"
                  onClick={() => handleDownloadInvoice(item.escrowTxnId)}
                >
                  Download Escrow Receipt
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
