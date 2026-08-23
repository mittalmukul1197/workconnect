import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Icon } from '../common/Icon';
import { useAuth } from '../../context/AuthContext';
import { useEscrow } from '../../context/EscrowContext';

export const WorkConnectEscrowVault = ({
  dealId = 'proj-501',
  dealTitle = '100 Ethnic Kurtis Stitching Order',
  businessName = 'Crafted Threads Boutique',
  workerName = 'Sunita Sharma (Master Tailor)',
  amount = '₹3,000',
  unitDetails = '100 pieces @ ₹30 / piece',
  onPaymentComplete
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { deals, agreeAsWorker, agreeAsBusiness, payToEscrow, submitWork, releasePayout } = useEscrow();

  // Active deal data from EscrowContext
  const activeDeal = deals[dealId] || {
    id: dealId,
    title: dealTitle,
    businessName,
    workerName,
    amount,
    unitDetails,
    businessAgreed: false,
    workerAgreed: false,
    escrowStatus: 'pending_agreements'
  };

  const { businessAgreed, workerAgreed, escrowStatus } = activeDeal;
  const isBothAgreed = businessAgreed && workerAgreed;

  // Roles
  const isWorker = user?.role === 'worker';
  const isHousehold = user?.role === 'household' || user?.clientType === 'household';
  const isBusiness = !isWorker && !isHousehold;
  const isHirer = isHousehold || isBusiness; // Either household client or business employer

  const clientRoleLabel = isHousehold ? t('role.hirer') : t('role.business');

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPayoutReceipt, setShowPayoutReceipt] = useState(false);

  // Handlers
  const handleWorkerSign = () => {
    agreeAsWorker(dealId);
  };

  const handleHirerSign = () => {
    agreeAsBusiness(dealId);
  };

  const handlePayToVault = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payToEscrow(dealId);
      setIsProcessing(false);
    }, 800);
  };

  const handleWorkSubmission = () => {
    setIsProcessing(true);
    setTimeout(() => {
      submitWork(dealId);
      setIsProcessing(false);
    }, 700);
  };

  const handlePayoutRelease = () => {
    setIsProcessing(true);
    setTimeout(() => {
      releasePayout(dealId);
      setIsProcessing(false);
      setShowPayoutReceipt(true);
      if (onPaymentComplete) onPaymentComplete();
    }, 900);
  };

  const getPerspectiveText = () => {
    if (isWorker) {
      return `${t('role.worker')} ${t('common.details')} (${user?.name || 'Sunita Sharma'})`;
    }
    if (isHousehold) {
      return `${t('role.hirer')} ${t('common.details')} (${user?.name || 'Rahul Sharma'})`;
    }
    return `${t('role.business')} ${t('common.details')} (${user?.name || 'Crafted Threads Boutique'})`;
  };

  return (
    <Card borderVariant="indigo" className="p-5 sm:p-6 space-y-5 bg-white shadow-xl text-slate-900 border-2 rounded-3xl animate-fade-in max-w-4xl mx-auto">
      
      {/* 🛡️ HEADER BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
            <Icon name="shield" className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm text-white tracking-wide">{t('escrow.vaultTitle')}</h3>
              <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 font-bold text-[10px]">
                {t('escrow.antiScamBadge')}
              </Badge>
            </div>
            <p className="text-[11px] text-indigo-200 mt-0.5">
              {t('escrow.headerDesc')}
            </p>
          </div>
        </div>

        {/* Auth Role Badge */}
        <div className="px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-left sm:text-right shrink-0">
          <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">{t('escrow.loggedPerspective')}</span>
          <span className="text-xs font-extrabold text-emerald-400">
            {getPerspectiveText()}
          </span>
        </div>
      </div>

      {/* 📜 DEAL SUMMARY CARD */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
        <div>
          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">{t('escrow.targetDeal')}</span>
          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{activeDeal.title}</h4>
          <p className="text-[11px] text-slate-500 font-medium">{activeDeal.unitDetails} • Ref: {activeDeal.id}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium shadow-2xs">
            {isHousehold ? t('escrow.clientLabel') : t('escrow.businessLabel')}<strong className="text-slate-900">{isHousehold ? (user?.name || 'Rahul Sharma') : activeDeal.businessName}</strong>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium shadow-2xs">
            {t('escrow.workerLabel')} <strong className="text-slate-900">{activeDeal.workerName}</strong>
          </div>
          <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shadow-2xs">
            {activeDeal.amount}
          </div>
        </div>
      </div>

      {/* 📍 VISUAL ESCROW STEPPER */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
          <span>{t('escrow.progressTitle')}</span>
          <span className="text-indigo-600 font-extrabold">
            {!isBothAgreed && t('escrow.step1Clicks')}
            {isBothAgreed && escrowStatus === 'ready_to_pay' && t('escrow.step2Ready')}
            {escrowStatus === 'paid_in_escrow' && t('escrow.step3Secured')}
            {escrowStatus === 'work_submitted' && t('escrow.step4Ready')}
            {escrowStatus === 'released_to_worker' && t('escrow.stepCompleted')}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {/* Step 1 */}
          <div className={`p-2.5 rounded-xl border transition-all ${
            isBothAgreed ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold' : 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
          }`}>
            <div className="flex items-center justify-between font-bold text-[11px] mb-0.5">
              <span>{t('escrow.step1Name')}</span>
              <span>{isBothAgreed ? t('escrow.done') : t('escrow.pending')}</span>
            </div>
            <p className="text-[10px] opacity-80">{t('escrow.dualApprovalNotice')}</p>
          </div>

          {/* Step 2 */}
          <div className={`p-2.5 rounded-xl border transition-all ${
            escrowStatus === 'paid_in_escrow' || escrowStatus === 'work_submitted' || escrowStatus === 'released_to_worker'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
              : isBothAgreed
              ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-bold animate-pulse'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-bold text-[11px] mb-0.5">
              <span>{t('escrow.step2Name')}</span>
              <span>
                {escrowStatus === 'paid_in_escrow' || escrowStatus === 'work_submitted' || escrowStatus === 'released_to_worker' ? t('escrow.secured') : t('escrow.pending')}
              </span>
            </div>
            <p className="text-[10px] opacity-80">{t('escrow.step2')}</p>
          </div>

          {/* Step 3 */}
          <div className={`p-2.5 rounded-xl border transition-all ${
            escrowStatus === 'work_submitted' || escrowStatus === 'released_to_worker'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
              : escrowStatus === 'paid_in_escrow'
              ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-bold text-[11px] mb-0.5">
              <span>{t('escrow.step3Name')}</span>
              <span>
                {escrowStatus === 'work_submitted' || escrowStatus === 'released_to_worker' ? t('escrow.delivered') : t('escrow.inProgress')}
              </span>
            </div>
            <p className="text-[10px] opacity-80">{t('escrow.step3')}</p>
          </div>

          {/* Step 4 */}
          <div className={`p-2.5 rounded-xl border transition-all ${
            escrowStatus === 'released_to_worker'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
              : escrowStatus === 'work_submitted'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-extrabold animate-pulse'
              : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}>
            <div className="flex items-center justify-between font-bold text-[11px] mb-0.5">
              <span>{t('escrow.step4Name')}</span>
              <span>{escrowStatus === 'released_to_worker' ? t('escrow.paid') : t('escrow.locked')}</span>
            </div>
            <p className="text-[10px] opacity-80">{t('escrow.step4')}</p>
          </div>
        </div>
      </div>

      {/* 🤝 SECTION 1: ROLE-SCOPED DEAL AGREEMENT */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3.5">
        <div className="flex items-center justify-between border-b border-indigo-200 pb-2.5">
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
              <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{t('escrow.step1Contract')}</span>
            </h4>
            <p className="text-[11px] text-slate-600">
              {t('escrow.step1Desc', { role: clientRoleLabel })}
            </p>
          </div>

          <Badge variant={isBothAgreed ? 'emerald' : 'amber'} className="font-extrabold text-[11px]">
            {isBothAgreed ? t('escrow.bothAgreed') : t('escrow.pendingClicks')}
          </Badge>
        </div>

        {/* AGREEMENT CARDS SCOPED TO USER ROLE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* WORKER VIEW ONLY: Worker Sign-off Card */}
          {isWorker && (
            <div className={`p-3.5 rounded-xl border space-y-2.5 transition-all ${
              workerAgreed ? 'bg-emerald-50 border-emerald-300 shadow-2xs' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">👷</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{t('escrow.yourWorkerSignOff')}</h5>
                    <p className="text-[10px] text-slate-500">{activeDeal.workerName}</p>
                  </div>
                </div>

                {workerAgreed ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] tracking-wider uppercase">
                    {t('escrow.youAgreed')}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] border border-slate-300 uppercase">
                    {t('escrow.actionNeeded')}
                  </span>
                )}
              </div>

              {!workerAgreed ? (
                <Button
                  size="sm"
                  variant="secondary"
                  fullWidth
                  icon="check"
                  onClick={handleWorkerSign}
                >
                  {t('escrow.workerSignOff')}
                </Button>
              ) : (
                <div className="p-2 rounded-lg bg-emerald-100/80 border border-emerald-300 text-[11px] text-emerald-900 font-semibold flex items-center gap-1.5">
                  <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t('escrow.youSignedWaiting', { role: clientRoleLabel })}</span>
                </div>
              )}
            </div>
          )}

          {/* WORKER VIEW ONLY: Read-only Hirer Status Card */}
          {isWorker && (
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">{t('escrow.hirerStatus', { role: clientRoleLabel })}</span>
                {businessAgreed ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                    {t('escrow.hirerAgreed')}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                    {t('escrow.awaitingHirer')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600">
                {businessAgreed
                  ? t('escrow.hirerAgreedDesc')
                  : t('escrow.awaitingHirerDesc')}
              </p>
            </div>
          )}

          {/* HIRER (HOUSEHOLD OR BUSINESS) VIEW ONLY: Hirer Sign-off Card */}
          {isHirer && (
            <div className={`p-3.5 rounded-xl border space-y-2.5 transition-all ${
              businessAgreed ? 'bg-emerald-50 border-emerald-300 shadow-2xs' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{isHousehold ? '🏠' : '🏢'}</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{t('escrow.yourHirerSignOff', { role: clientRoleLabel })}</h5>
                    <p className="text-[10px] text-slate-500">{isHousehold ? (user?.name || 'Rahul Sharma') : activeDeal.businessName}</p>
                  </div>
                </div>

                {businessAgreed ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[10px] tracking-wider uppercase">
                    {t('escrow.youAgreed')}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] border border-slate-300 uppercase">
                    {t('escrow.actionNeeded')}
                  </span>
                )}
              </div>

              {!businessAgreed ? (
                <Button
                  size="sm"
                  variant="primary"
                  fullWidth
                  icon="check"
                  onClick={handleHirerSign}
                >
                  {t('escrow.clickAgreeApprove', { role: clientRoleLabel })}
                </Button>
              ) : (
                <div className="p-2 rounded-lg bg-emerald-100/80 border border-emerald-300 text-[11px] text-emerald-900 font-semibold flex items-center gap-1.5">
                  <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t('escrow.youSignedVerified')}</span>
                </div>
              )}
            </div>
          )}

          {/* HIRER VIEW ONLY: Read-only Worker Status Card */}
          {isHirer && (
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">{t('escrow.workerStatus', { name: activeDeal.workerName })}</span>
                {workerAgreed ? (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                    {t('escrow.workerAgreed')}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[10px]">
                    {t('escrow.awaitingWorker')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600">
                {workerAgreed
                  ? t('escrow.workerAgreedDesc')
                  : t('escrow.awaitingWorkerDesc')}
              </p>
            </div>
          )}

        </div>
      </div>

      {/* 💳 SECTION 2: WORKCONNECT PLATFORM MIDDLEMAN VAULT (ROLE-SCOPED ACTION) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white space-y-3.5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
              {t('escrow.vaultStatus')}
            </span>
            <h4 className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-2 mt-0.5">
              {!isBothAgreed && (
                <>
                  <Icon name="lock" className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('escrow.payLockedBoth')}</span>
                </>
              )}
              {isBothAgreed && escrowStatus === 'ready_to_pay' && (
                <>
                  <Icon name="unlock" className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('escrow.payUnlockedDeposit')}</span>
                </>
              )}
              {escrowStatus === 'paid_in_escrow' && (
                <>
                  <Icon name="shield" className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('escrow.amountSafelyHeld', { amount: activeDeal.amount })}</span>
                </>
              )}
              {escrowStatus === 'work_submitted' && (
                <>
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('escrow.workCompletedReady')}</span>
                </>
              )}
              {escrowStatus === 'released_to_worker' && (
                <>
                  <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('escrow.payoutTransferred')}</span>
                </>
              )}
            </h4>
          </div>

          <span className="text-xl font-black text-emerald-400">{activeDeal.amount}</span>
        </div>

        {/* Clear Explanation Box when Payment is Locked */}
        {!isBothAgreed && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-xs">
              <Icon name="alert-triangle" className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t('escrow.payStatus')}</span>
            </div>
            <p className="text-[11px] text-amber-100/90 font-medium pl-5.5">
              {businessAgreed && !workerAgreed && t('escrow.payStatusDesc1', { role: clientRoleLabel })}
              {!businessAgreed && workerAgreed && t('escrow.payStatusDesc2', { role: clientRoleLabel })}
              {!businessAgreed && !workerAgreed && t('escrow.payStatusDesc3', { role: clientRoleLabel })}
            </p>
          </div>
        )}

        {/* Success Notice when Both Agreed */}
        {isBothAgreed && escrowStatus === 'ready_to_pay' && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2 font-bold animate-scale-up">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('escrow.payStatusDesc4', { role: clientRoleLabel })}</span>
          </div>
        )}

        {/* Role-Scoped Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-slate-300 max-w-md">
            <p className="leading-relaxed">
              {t('escrow.scamProtectionDesc')}
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0">
            
            {/* HIRER (HOUSEHOLD OR BUSINESS) CONTROLS */}
            {isHirer && (
              <>
                {!isBothAgreed && (
                  <button
                    disabled
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800/90 text-slate-400 font-extrabold text-xs cursor-not-allowed border border-slate-700/80 flex items-center justify-center gap-2 shadow-inner"
                  >
                    <Icon name="lock" className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{t('escrow.paymentLockedNeedsWorker')}</span>
                  </button>
                )}

                {isBothAgreed && escrowStatus === 'ready_to_pay' && (
                  <Button
                    variant="primary"
                    size="md"
                    icon="shield"
                    onClick={handlePayToVault}
                    disabled={isProcessing}
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black shadow-lg shadow-emerald-500/25 animate-bounce"
                  >
                    {isProcessing ? t('escrow.processingPayment') : t('escrow.payAmountVault', { amount: activeDeal.amount })}
                  </Button>
                )}

                {escrowStatus === 'paid_in_escrow' && (
                  <div className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center gap-2">
                    <Icon name="shield" className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{t('escrow.fundsSecuredExecuting')}</span>
                  </div>
                )}

                {escrowStatus === 'work_submitted' && (
                  <Button
                    variant="primary"
                    size="md"
                    icon="zap"
                    onClick={handlePayoutRelease}
                    disabled={isProcessing}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg shadow-emerald-500/25"
                  >
                    {isProcessing ? t('escrow.disbursing') : t('escrow.releasePaymentWorker')}
                  </Button>
                )}

                {escrowStatus === 'released_to_worker' && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t('escrow.payoutReleased')}</span>
                  </div>
                )}
              </>
            )}

            {/* WORKER ROLE CONTROLS */}
            {isWorker && (
              <>
                {escrowStatus === 'pending_agreements' && (
                  <div className="px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-400 text-xs font-bold flex items-center gap-2">
                    <Icon name="clock" className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t('escrow.waitingDualClicks')}</span>
                  </div>
                )}

                {escrowStatus === 'ready_to_pay' && (
                  <div className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center gap-2">
                    <Icon name="clock" className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{t('escrow.bothAgreedWaitingClient')}</span>
                  </div>
                )}

                {escrowStatus === 'paid_in_escrow' && (
                  <Button
                    variant="secondary"
                    size="md"
                    icon="check"
                    onClick={handleWorkSubmission}
                    disabled={isProcessing}
                    className="w-full sm:w-auto font-bold"
                  >
                    {isProcessing ? t('escrow.submitting') : t('escrow.submitWork')}
                  </Button>
                )}

                {escrowStatus === 'work_submitted' && (
                  <div className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{t('escrow.workSubmittedWaiting')}</span>
                  </div>
                )}

                {escrowStatus === 'released_to_worker' && (
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t('escrow.fundsReceivedWallet')}</span>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>

      {/* 🎉 FINAL SUCCESS CONFIRMATION RECEIPT */}
      {showPayoutReceipt && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1 animate-scale-up shadow-sm">
          <div className="flex items-center gap-2 font-black text-sm text-emerald-900">
            <Icon name="check-circle" className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t('escrow.scamFreeComplete')}</span>
          </div>
          <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
            {t('escrow.settlementDesc', { amount: activeDeal.amount, role: clientRoleLabel, name: activeDeal.workerName })}
          </p>
        </div>
      )}
    </Card>
  );
};
