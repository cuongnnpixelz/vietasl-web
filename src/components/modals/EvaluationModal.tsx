import React, { useState } from 'react';
import { useAppStore } from '../../stores/appStore';
import { ThumbsUp, ThumbsDown, X, Check } from 'lucide-react';

export const EvaluationModal: React.FC = () => {
  const { isEvaluationModalOpen, setEvaluationModalOpen, showToast } = useAppStore();
  const [step, setStep] = useState<'ask' | 'feedback' | 'done'>('ask');
  const [feedbackText, setFeedbackText] = useState('');

  if (!isEvaluationModalOpen) return null;

  const handleClose = () => {
    setEvaluationModalOpen(false);
    setStep('ask');
    setFeedbackText('');
  };

  const handleLike = () => {
    setStep('done');
    showToast('Cảm ơn bạn đã đánh giá bản dịch tích cực!');
    setTimeout(handleClose, 1500);
  };

  const handleDislike = () => {
    setStep('feedback');
  };

  const handleSubmitFeedback = () => {
    setStep('done');
    showToast('Ý kiến đóng góp của bạn đã được ghi nhận.');
    setTimeout(handleClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#939293] hover:text-[#373F41] p-1 rounded-full"
        >
          <X size={20} />
        </button>

        {step === 'ask' && (
          <div className="text-center pt-2">
            <div className="w-12 h-12 rounded-full bg-[#D6E5F9] text-[#1447A6] flex items-center justify-center mx-auto mb-3">
              <ThumbsUp size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#373F41]">Bạn có hài lòng với bản dịch?</h3>
            <p className="text-xs text-[#939293] mt-1 mb-6">
              Đánh giá của bạn giúp cải thiện độ chuẩn xác của chuyển động ký hiệu ASL.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDislike}
                className="flex-1 py-3 px-4 rounded-xl border border-black/15 text-[#4B4B4B] font-bold text-sm hover:bg-black/5 active:bg-black/10 transition-colors flex items-center justify-center gap-2"
              >
                <ThumbsDown size={18} />
                <span>Chưa tốt</span>
              </button>

              <button
                onClick={handleLike}
                className="flex-1 py-3 px-4 rounded-xl bg-[#1447A6] text-white font-bold text-sm hover:bg-[#003F86] active:scale-95 transition-all shadow-md shadow-[#1447A6]/20 flex items-center justify-center gap-2"
              >
                <ThumbsUp size={18} />
                <span>Rất tốt</span>
              </button>
            </div>
          </div>
        )}

        {step === 'feedback' && (
          <div>
            <h3 className="text-base font-bold text-[#373F41]">Góp ý cải thiện</h3>
            <p className="text-xs text-[#939293] mt-1 mb-3">
              Ký hiệu nào chưa tự nhiên hoặc cần điều chỉnh thế tay?
            </p>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Nhập nhận xét hoặc đề xuất..."
              className="w-full h-24 p-3 rounded-lg border border-black/15 text-sm focus:outline-none focus:border-[#1447A6] resize-none"
            />
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-lg border border-black/15 text-xs font-semibold text-[#4B4B4B]"
              >
                Bỏ qua
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 py-2.5 rounded-lg bg-[#1447A6] text-white text-xs font-semibold hover:bg-[#003F86]"
              >
                Gửi góp ý
              </button>
            </div>
          </div>
        )}

        {step === 'done' && (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check size={26} />
            </div>
            <h4 className="font-bold text-[#373F41]">Cảm ơn bạn!</h4>
            <p className="text-xs text-[#939293] mt-1">Phản hồi của bạn đã được ghi nhận.</p>
          </div>
        )}
      </div>
    </div>
  );
};
