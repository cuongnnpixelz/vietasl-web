import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { useAppStore } from '../stores/appStore';
import {
  Sparkles,
  Languages,
  BookOpen,
  User,
  Gauge,
  CheckCircle2,
  ArrowRight,
  Play
} from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    icon: Languages,
    title: '1. Dịch văn bản & Giọng nói sang ASL',
    desc: 'Bấm vào nút tròn màu xanh ở giữa thanh công cụ (hoặc mục "Trình dịch" trong Menu) để nhập câu tiếng Anh hoặc bấm biểu tượng micro để nói. Hệ thống sẽ dịch và avatar 3D sẽ thực hiện ký hiệu ngay lập tức.'
  },
  {
    icon: User,
    title: '2. Tương tác với Nhân vật 3D',
    desc: 'Bạn có thể dùng chuột hoặc chạm vuốt màn hình để xoay nhân vật 360 độ, cuộn con lăn để phóng to/thu nhỏ. Bấm nút hình tròn góc trên bên phải để đổi giữa các nhân vật (Minh, Lan, ASL Bot).'
  },
  {
    icon: Gauge,
    title: '3. Điều khiển Tốc độ & Phụ đề',
    desc: 'Trong khi avatar ký hiệu, bạn có thể tạm dừng, tiếp tục hoặc bấm nút đo tốc độ để chọn X1 (bình thường), X2 (nhanh) hoặc X3 (rất nhanh). Nút phụ đề cho phép bật/tắt hiển thị từ và nhãn ASL Gloss.'
  },
  {
    icon: BookOpen,
    title: '4. Tra cứu Từ điển & Bảng chữ cái',
    desc: 'Mục "Từ điển" chứa hàng chục ký hiệu ASL phổ biến kèm giải nghĩa chi tiết bằng tiếng Việt. Ngoài ra, bảng chữ cái ngón tay (Fingerspelling A-Z) giúp bạn học cách tạo thế tay cho từng chữ cái khi gặp từ mới.'
  }
];

export const Tutorial: React.FC = () => {
  const { setRoute } = useAppStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = TUTORIAL_STEPS[currentStepIndex];
  const StepIcon = step.icon;

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F6F8] overflow-hidden select-none">
      <Header title="Hướng dẫn sử dụng" showBack />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-xl w-full mx-auto flex flex-col justify-between">
        <div className="space-y-6 pt-4">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2">
            {TUTORIAL_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentStepIndex ? 'w-8 bg-[#1447A6]' : 'w-2 bg-black/15'
                }`}
              />
            ))}
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl p-6 border border-black/10 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#D6E5F9] text-[#1447A6] flex items-center justify-center mx-auto mb-4 shadow-xs">
              <StepIcon size={32} />
            </div>

            <h3 className="text-lg font-bold text-[#373F41] mb-2">{step.title}</h3>
            <p className="text-xs sm:text-sm text-[#4B4B4B] leading-relaxed max-w-md mx-auto">
              {step.desc}
            </p>
          </div>

          {/* Feature Highlight Pills */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-3 rounded-xl border border-black/5 flex items-center gap-2 text-[#4B4B4B]">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Giao diện Tiếng Việt</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-black/5 flex items-center gap-2 text-[#4B4B4B]">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Ký hiệu ASL thực tế</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-black/5 flex items-center gap-2 text-[#4B4B4B]">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Đánh vần ngón tay A-Z</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-black/5 flex items-center gap-2 text-[#4B4B4B]">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>Chạy 100% trong trình duyệt</span>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="pt-6 pb-2 flex items-center gap-3">
          {currentStepIndex > 0 ? (
            <button
              onClick={() => setCurrentStepIndex((prev) => prev - 1)}
              className="py-3.5 px-5 rounded-xl border border-black/15 text-xs font-bold text-[#4B4B4B] hover:bg-black/5"
            >
              Quay lại
            </button>
          ) : (
            <button
              onClick={() => setRoute('home')}
              className="py-3.5 px-5 rounded-xl text-xs font-bold text-[#939293] hover:text-[#373F41]"
            >
              Bỏ qua
            </button>
          )}

          {currentStepIndex < TUTORIAL_STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStepIndex((prev) => prev + 1)}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#1447A6] hover:bg-[#003F86] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <span>Tiếp tục</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => setRoute('home')}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#1447A6] hover:bg-[#003F86] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Play size={16} fill="white" />
              <span>Bắt đầu trải nghiệm ngay</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
