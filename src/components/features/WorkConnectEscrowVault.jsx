import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';

export const WorkConnectEscrowVault = ({
  dealId = 'DL-8821',
  dealTitle = '100 Ethnic Kurtis Stitching Order',
  businessName = 'Crafted Threads Boutique',
  workerName = 'Sunita Sharma (Master Tailor)',
  amount = '₹3,000',
  unitDetails = '100 pieces @ ₹30 / piece',
  initialBusinessAgreed = false,
  initialWorkerAgreed = false,
  onPaymentComplete
}) => {
  // Dual agreement states (Business click & Worker click)
  const [businessAgreed, setBusinessAgreed] = useState(initialBusinessAgreed);
  const [workerAgreed, setWorkerAgreed] = useState(initialWorkerAgreed);

  // Platform Escrow Vault Lifecycle:
  // 'pending_agreements' -> 'ready_to_pay' -> 'paid_in_escrow' -> 'work_completed' -> 'released_to_worker'
  const [escrowStatus, setEscrowStatus] = useState(
    initialBusinessAgreed && initialWorkerAgreed ? 'ready_to_pay' : 'pending_agreements'
  );
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayoutReceipt, setShowPayoutReceipt] = useState(false);

  // Both sides must agree
  const isBothAgreed = businessAgreed && workerAgreed;

  // Business Click handler
  const handleBusinessAgree = () => {
    setBusinessAgreed(true);
    if (workerAgreed) {
      setEscrowStatus('ready_to_pay');
    }
  };

  // Worker Click handler
  const handleWorkerAgree = () => {
    setWorkerAgreed(true);
    if (businessAgreed) {
      setEscrowStatus('ready_to_pay');
    }
  };

  // Pay WorkConnect (Middleman Vault)
  const handlePayToVault = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setEscrowStatus('paid_in_escrow');
      setIsProcessing(false);
    }, 900);
  };

  // Worker submits work completion
  const handleCompleteWork = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setEscrowStatus('work_completed');
      setIsProcessing(false);
    }, 700);
  };

  // WorkConnect disburses payout to Worker
  const handleReleasePayout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setEscrowStatus('released_to_worker');
      setIsProcessing(false);
      setShowPayoutReceipt(true);
      if (onPaymentComplete) onPaymentComplete();
    }, 1000);
  };

  return (
    <Card borderVariant="indigo" className="p-6 sm:p-8 space-y-6 bg-white shadow-2xl text-slate-900 border-2 rounded-3xl animate-fade-in">
      
      {/* 🛡️ HEADER: WORKCONNECT MIDDLEMAN ESCROW BANNER */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
            <Icon name="shield" className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-base text-white tracking-wide">WorkConnect Platform Escrow</h3>
              <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 font-bold">
                🛡️ 100% Scam Protection
              </Badge>
            </div>
            <p className="text-xs text-indigo-200 mt-1 max-w-xl">
              We act as the trusted <strong>Middleman</strong>. Payment is held safely by WorkConnect until both sides agree on the deal and work is completed.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left md:text-right shrink-0">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Escrow Amount</span>
          <span className="text-2xl font-black text-emerald-400">{amount}</span>
        </div>
      </div>

      {/* 📜 DEAL SUMMARY CARD */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">Target Deal</span>
          <h4 className="font-extrabold text-sm text-slate-900">{dealTitle}</h4>
          <p className="text-slate-500 font-medium">{unitDetails} • Ref: {dealId}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs">
            🏢 Business: <strong className="text-slate-900">{businessName}</strong>
          </div>
          <div className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold shadow-xs">
            👷 Worker: <strong className="text-slate-900">{workerName}</strong>
          </div>
        </div>
      </div>

      {/* 📍 VISUAL ESCROW STEPPER */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Escrow Middleman Progress</span>
          <span className="text-indigo-600 font-extrabold">
            {!isBothAgreed && 'Step 1 of 4: Dual Clicks Needed'}
            {isBothAgreed && escrowStatus === 'ready_to_pay' && 'Step 2 of 4: Ready for Payment'}
            {escrowStatus === 'paid_in_escrow' && 'Step 3 of 4: Funds Secured in Vault'}
            {escrowStatus === 'work_completed' && 'Step 4 of 4: Ready for Release'}
            {escrowStatus === 'released_to_worker' && 'Completed ✓'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {/* Step 1 */}
          <div className={`p-3 rounded-xl border transition-all ${
            isBothAgreed ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold' : 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
          }`}>
            <div className="flex items-center justify-between font-extrabold mb-1">
              <span>1. Dual Clicks</span>
              <span>{isBothAgreed ? '✓ Done' : '⏳ Pending'}</span>
            </div>
            <p className="text-[10px] opacity-80">Both parties agree to deal</p>
          </div>

          {/* Step 2 */}
          <div className={`p-3 rounded-xl border transition-all ${
            escrowStatus === 'paid_in_escrow' || escrowStatus === 'work_completed' || escrowStatus === 'released_to_worker'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
              : isBothAgreed
              ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold animate-pulse'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-extrabold mb-1">
              <span>2. Pay WorkConnect</span>
              <span>
                {escrowStatus === 'paid_in_escrow' || escrowStatus === 'work_completed' || escrowStatus === 'released_to_worker' ? '🔒 Secured' : '⏳ Pending'}
              </span>
            </div>
            <p className="text-[10px] opacity-80">Platform holds funds safely</p>
          </div>

          {/* Step 3 */}
          <div className={`p-3 rounded-xl border transition-all ${
            escrowStatus === 'work_completed' || escrowStatus === 'released_to_worker'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
              : escrowStatus === 'paid_in_escrow'
              ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-extrabold mb-1">
              <span>3. Work Output</span>
              <span>
                {escrowStatus === 'work_completed' || escrowStatus === 'released_to_worker' ? '✓ Delivered' : '⏳ In Progress'}
              </span>
            </div>
            <p className="text-[10px] opacity-80">Worker completes quota</p>
          </div>

          {/* Step 4 */}
          <div className={`p-3 rounded-xl border transition-all ${
            escrowStatus === 'released_to_worker'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
              : escrowStatus === 'work_completed'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-extrabold animate-pulse'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-extrabold mb-1">
              <span>4. Release Payout</span>
              <span>{escrowStatus === 'released_to_worker' ? '💸 Paid' : '🔒 Locked'}</span>
            </div>
            <p className="text-[10px] opacity-80">Vault disburses to Worker</p>
          </div>
        </div>
      </div>

      {/* 🤝 SECTION 1: REQUIRED DUAL AGREEMENT CLICKS */}
      <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-4">
        <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
          <div>
            <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <Icon name="check-circle" className="w-4.5 h-4.5 text-indigo-600" />
              <span>Step 1: Required Dual Agreement Clicks</span>
            </h4>
            <p className="text-[11px] text-slate-600">
              Payment is <strong>STRICTLY LOCKED</strong> until BOTH Business & Worker click to agree below.
            </p>
          </div>

          <Badge variant={isBothAgreed ? 'emerald' : 'amber'} className="font-extrabold text-xs">
            {isBothAgreed ? '🟢 Both Parties Agreed' : '⚠️ Pending Clicks'}
          </Badge>
        </div>

        {/* 2 Big Clear Cards for Business & Worker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card A: Business */}
          <div className={`p-4.5 rounded-2xl border space-y-3.5 transition-all ${
            businessAgreed ? 'bg-emerald-50/90 border-emerald-300 shadow-sm' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏢</span>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900">Business Sign-Off</h5>
                  <p className="text-[10px] text-slate-500">{businessName}</p>
                </div>
              </div>

              {businessAgreed ? (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xs">
                  ✓ AGREED
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold text-[10px] border border-slate-300 uppercase">
                  AWAITING CLICK
                </span>
              )}
            </div>

            {!businessAgreed ? (
              <Button
                size="md"
                variant="primary"
                fullWidth
                icon="check"
                onClick={handleBusinessAgree}
                className="shadow-md shadow-indigo-600/15"
              >
                Sign & Agree (as Business)
              </Button>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-[11px] text-emerald-900 font-bold flex items-center gap-2">
                <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Business clicked and approved deal terms.</span>
              </div>
            )}
          </div>

          {/* Card B: Worker */}
          <div className={`p-4.5 rounded-2xl border space-y-3.5 transition-all ${
            workerAgreed ? 'bg-emerald-50/90 border-emerald-300 shadow-sm' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">👷</span>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900">Worker Sign-Off</h5>
                  <p className="text-[10px] text-slate-500">{workerName}</p>
                </div>
              </div>

              {workerAgreed ? (
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xs">
                  ✓ AGREED
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold text-[10px] border border-slate-300 uppercase">
                  AWAITING CLICK
                </span>
              )}
            </div>

            {!workerAgreed ? (
              <Button
                size="md"
                variant="secondary"
                fullWidth
                icon="check"
                onClick={handleWorkerAgree}
                className="shadow-md shadow-emerald-600/15"
              >
                Sign & Agree (as Worker)
              </Button>
            ) : (
              <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-[11px] text-emerald-900 font-bold flex items-center gap-2">
                <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Worker clicked and approved deal terms.</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 💳 SECTION 2: WORKCONNECT PLATFORM MIDDLEMAN VAULT (PAYMENT ACTION) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
          <div>
            <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider block">
              Platform Escrow Status
            </span>
            <h4 className="font-black text-sm text-white flex items-center gap-2 mt-0.5">
              {!isBothAgreed && (
                <>
                  <Icon name="lock" className="w-4 h-4 text-amber-400" />
                  <span>Payment Disabled (Needs Both Clicks First)</span>
                </>
              )}
              {isBothAgreed && escrowStatus === 'ready_to_pay' && (
                <>
                  <Icon name="unlock" className="w-4 h-4 text-emerald-400" />
                  <span>Payment Unlocked! Pay to WorkConnect Middleman Vault</span>
                </>
              )}
              {escrowStatus === 'paid_in_escrow' && (
                <>
                  <Icon name="shield" className="w-4 h-4 text-emerald-400" />
                  <span>{amount} Safely Secured in WorkConnect Platform Vault</span>
                </>
              )}
              {escrowStatus === 'work_completed' && (
                <>
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                  <span>Work Completed — Ready to Disburse Payout</span>
                </>
              )}
              {escrowStatus === 'released_to_worker' && (
                <>
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                  <span>Payout Transferred to Worker</span>
                </>
              )}
            </h4>
          </div>

          <span className="text-2xl font-black text-emerald-400">{amount}</span>
        </div>

        {/* Clear Explanation Box when Payment is Locked */}
        {!isBothAgreed && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1 animate-fade-in">
            <div className="flex items-center gap-2 font-black text-amber-300 text-xs">
              <Icon name="alert-triangle" className="w-4 h-4 text-amber-400 shrink-0" />
              <span>WHY PAYMENT IS LOCKED RIGHT NOW:</span>
            </div>
            <p className="text-[11px] text-amber-100/90 font-medium pl-6">
              {businessAgreed && !workerAgreed && "🏢 Business has agreed ✓, BUT 👷 Worker has NOT agreed yet. Payment button stays disabled until Worker clicks Agree!"}
              {!businessAgreed && workerAgreed && "👷 Worker has agreed ✓, BUT 🏢 Business has NOT agreed yet. Payment button stays disabled until Business clicks Agree!"}
              {!businessAgreed && !workerAgreed && "Neither side has agreed yet. Both Business and Worker must click 'Sign & Agree' above."}
            </p>
          </div>
        )}

        {/* Success Notice when Both Agreed */}
        {isBothAgreed && escrowStatus === 'ready_to_pay' && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2.5 font-bold animate-scale-up">
            <Icon name="check-circle" className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Both Business & Worker agreed! Business can now make payment securely to WorkConnect Middleman Vault.</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-[11px] text-slate-300 max-w-md">
            <p className="leading-relaxed">
              <strong>Middleman Scam Guarantee:</strong> Payment goes directly to <strong>WorkConnect (Us)</strong> first. We safely hold the money until work is completed properly, then release it to the worker.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            {/* Case 1: Locked */}
            {!isBothAgreed && (
              <button
                disabled
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800/90 text-slate-400 font-black text-xs cursor-not-allowed border border-slate-700/80 flex items-center justify-center gap-2 shadow-inner"
              >
                <Icon name="lock" className="w-4 h-4 text-slate-500" />
                <span>🔒 Payment Locked (Needs Both Clicks)</span>
              </button>
            )}

            {/* Case 2: Unlocked Pay to Vault */}
            {isBothAgreed && escrowStatus === 'ready_to_pay' && (
              <Button
                variant="primary"
                size="lg"
                icon="shield"
                onClick={handlePayToVault}
                disabled={isProcessing}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm shadow-xl shadow-emerald-500/25 animate-bounce rounded-2xl py-3.5"
              >
                {isProcessing ? 'Processing Payment...' : `💳 Pay ${amount} to WorkConnect Escrow Vault`}
              </Button>
            )}

            {/* Case 3: Paid in Escrow -> Submit Work */}
            {escrowStatus === 'paid_in_escrow' && (
              <Button
                variant="secondary"
                size="lg"
                icon="check"
                onClick={handleCompleteWork}
                disabled={isProcessing}
                className="w-full sm:w-auto font-black rounded-2xl py-3.5"
              >
                {isProcessing ? 'Submitting...' : 'Worker: Submit Completed Work Output'}
              </Button>
            )}

            {/* Case 4: Work Completed -> Release Payout */}
            {escrowStatus === 'work_completed' && (
              <Button
                variant="primary"
                size="lg"
                icon="zap"
                onClick={handleReleasePayout}
                disabled={isProcessing}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl py-3.5 shadow-xl shadow-emerald-500/30"
              >
                {isProcessing ? 'Disbursing...' : 'WorkConnect: Release Payout to Worker'}
              </Button>
            )}

            {/* Case 5: Released */}
            {escrowStatus === 'released_to_worker' && (
              <div className="px-5 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-2">
                <Icon name="check-circle" className="w-4 h-4 text-emerald-400" />
                <span>Funds Paid to Worker ✓</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🎉 FINAL SUCCESS CONFIRMATION RECEIPT */}
      {showPayoutReceipt && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1.5 animate-scale-up shadow-md">
          <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
            <Icon name="check-circle" className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>100% Scam-Free Escrow Settlement Complete!</span>
          </div>
          <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
            WorkConnect received <strong className="text-emerald-900 font-bold">{amount}</strong> from Business as middleman, verified mutual agreement and work completion, and successfully transferred payout to <strong className="text-slate-900 font-bold">{workerName}</strong>. Zero scam issues!
          </p>
        </div>
      )}
    </Card>
  );
};
