import React, { useState } from 'react';
import { Header } from '../components/common/Header';
import { useSettingsStore } from '../stores/settingsStore';
import { useAppStore } from '../stores/appStore';
import { checkHybridHealth } from '../services/hybridClient';
import {
  Globe,
  Mic,
  Subtitles,
  History,
  Activity,
  ShieldCheck,
  Info,
  RotateCcw,
  Sparkles,
  Key,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSetting, resetToDefaults } = useSettingsStore();
  const { showToast } = useAppStore();

  const [isTestingKey, setIsTestingKey] = useState(false);
  const [healthInfo, setHealthInfo] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setIsTestingKey(true);
    try {
      const res = await checkHybridHealth(settings.geminiApiKey);
      if (res.configured) {
        setHealthInfo(`Đã kết nối thành công với ${res.model} (${res.availableSigns} ký hiệu)`);
        showToast('Kết nối Gemini AI thành công!');
      } else {
        setHealthInfo('Máy chủ sẵn sàng, nhưng chưa cấu hình khóa API.');
        showToast('Chưa nhập khóa Gemini API.');
      }
    } catch (e: any) {
      setHealthInfo('Không kết nối được: ' + e.message);
      showToast('Lỗi kết nối: ' + e.message);
    } finally {
      setIsTestingKey(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Đặt lại tất cả cài đặt về mặc định?')) {
      await resetToDefaults();
      showToast('Đã khôi phục cài đặt gốc.');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F6F8] overflow-hidden select-none">
      <Header title="Cài đặt hệ thống" showBack />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-6">
        {/* Language & Voice Settings */}
        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-black/5 pb-2.5">
            <Globe size={18} className="text-[#1447A6]" />
            <h3 className="text-xs font-bold text-[#373F41] uppercase tracking-wider">
              Ngôn ngữ & Dịch thuật
            </h3>
          </div>

          <div className="flex justify-between items-center py-1">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Ngôn ngữ giao diện (UI)</p>
              <p className="text-xs text-[#939293]">Cố định theo quy chuẩn hệ thống</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#D6E5F9] text-[#1447A6]">
              Tiếng Việt (vi-VN)
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-black/5">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Hệ thống ký hiệu đích</p>
              <p className="text-xs text-[#939293]">Ngôn ngữ ký hiệu biểu diễn bởi 3D avatar</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#D6E5F9] text-[#1447A6]">
              ASL (American Sign Language)
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-black/5">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Ngôn ngữ đầu vào (Text Input)</p>
              <p className="text-xs text-[#939293]">Hỗ trợ song ngữ Tiếng Việt và Tiếng Anh</p>
            </div>
            <select
              value={settings.inputLanguage}
              onChange={(e: any) => updateSetting('inputLanguage', e.target.value)}
              className="text-xs font-semibold bg-gray-50 border border-black/10 rounded-lg px-2.5 py-1.5 text-[#373F41] focus:outline-none"
            >
              <option value="vi">Tiếng Việt (vi-VN)</option>
              <option value="en">English (en-US)</option>
            </select>
          </div>

          <div className="flex justify-between items-center py-1 border-t border-black/5">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Nhận diện giọng nói (Microphone)</p>
              <p className="text-xs text-[#939293]">Ngôn ngữ xử lý cho Web Speech API</p>
            </div>
            <select
              value={settings.speechLanguage}
              onChange={(e: any) => updateSetting('speechLanguage', e.target.value)}
              className="text-xs font-semibold bg-gray-50 border border-black/10 rounded-lg px-2.5 py-1.5 text-[#373F41] focus:outline-none"
            >
              <option value="vi-VN">Tiếng Việt (Việt Nam)</option>
              <option value="en-US">English (United States)</option>
            </select>
          </div>
        </div>

        {/* AI Translation Engine (cuongnnpixelz/sign-studio Hybrid Engine) */}
        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-black/5 pb-2.5">
            <Sparkles size={18} className="text-[#1447A6]" />
            <h3 className="text-xs font-bold text-[#373F41] uppercase tracking-wider">
              Bộ dịch Hybrid AI (Gemini AI + Cục bộ)
            </h3>
          </div>

          <div className="flex justify-between items-center py-1">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Chế độ dịch thuật</p>
              <p className="text-xs text-[#939293]">
                {settings.translationEngine === 'hybrid'
                  ? 'Thông minh: Ưu tiên Gemini AI phân tích ngữ pháp, tự động chuyển về Cục bộ nếu ngoại tuyến'
                  : 'Ngoại tuyến: Dịch tức thì bằng từ điển cục bộ, không cần mạng'}
              </p>
            </div>
            <select
              value={settings.translationEngine}
              onChange={(e: any) => updateSetting('translationEngine', e.target.value)}
              className="text-xs font-semibold bg-gray-50 border border-black/10 rounded-lg px-2.5 py-1.5 text-[#373F41] focus:outline-none"
            >
              <option value="hybrid">✨ Thông minh (Gemini AI)</option>
              <option value="local">⚡ Ngoại tuyến (Cục bộ)</option>
            </select>
          </div>

          {settings.translationEngine === 'hybrid' && (
            <div className="pt-2 border-t border-black/5 space-y-3">
              <div>
                <label className="text-xs font-bold text-[#373F41] flex items-center gap-1.5 mb-1">
                  <Key size={14} className="text-[#1447A6]" />
                  <span>Google Gemini API Key (Tùy chọn)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={settings.geminiApiKey || ''}
                    onChange={(e) => updateSetting('geminiApiKey', e.target.value)}
                    placeholder="Dán khóa API Key của bạn (hoặc cấu hình trong .env.local)..."
                    className="flex-1 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs text-[#373F41] focus:outline-none focus:border-[#1447A6]"
                  />
                  <button
                    onClick={handleTestConnection}
                    disabled={isTestingKey}
                    className="px-3.5 py-2 bg-[#1447A6] hover:bg-[#003F86] text-white rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
                  >
                    {isTestingKey ? 'Đang thử...' : 'Kiểm tra'}
                  </button>
                </div>
                <p className="text-[11px] text-[#939293] mt-1">
                  Khóa API được lưu trữ an toàn trong trình duyệt của bạn và chỉ gửi tới endpoint dịch máy chủ nội bộ.
                </p>
              </div>

              {healthInfo && (
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-[#1447A6] flex items-center gap-2">
                  <Info size={14} className="shrink-0" />
                  <span>{healthInfo}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Display & Playback Preferences */}
        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-black/5 pb-2.5">
            <Subtitles size={18} className="text-[#1447A6]" />
            <h3 className="text-xs font-bold text-[#373F41] uppercase tracking-wider">
              Hiển thị & Hoạt ảnh
            </h3>
          </div>

          <div className="flex justify-between items-center py-1">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Phụ đề tiếng Việt</p>
              <p className="text-xs text-[#939293]">Hiển thị thẻ phụ đề văn bản khi nhân vật ký hiệu</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showSubtitles}
              onChange={(e) => updateSetting('showSubtitles', e.target.checked)}
              className="w-4 h-4 accent-[#1447A6] cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center py-1 border-t border-black/5">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Hiển thị nhãn ASL Gloss</p>
              <p className="text-xs text-[#939293]">Kèm mã ký hiệu ASL tiêu chuẩn (ví dụ: [HELLO])</p>
            </div>
            <input
              type="checkbox"
              checked={settings.showGloss}
              onChange={(e) => updateSetting('showGloss', e.target.checked)}
              className="w-4 h-4 accent-[#1447A6] cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center py-1 border-t border-black/5">
            <div>
              <p className="text-sm font-semibold text-[#373F41]">Tự động lưu lịch sử</p>
              <p className="text-xs text-[#939293]">Lưu các câu dịch vào cơ sở dữ liệu IndexedDB cục bộ</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoSaveHistory}
              onChange={(e) => updateSetting('autoSaveHistory', e.target.checked)}
              className="w-4 h-4 accent-[#1447A6] cursor-pointer"
            />
          </div>
        </div>

        {/* App Info & Reset */}
        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-black/5 pb-2.5">
            <ShieldCheck size={18} className="text-[#1447A6]" />
            <h3 className="text-xs font-bold text-[#373F41] uppercase tracking-wider">
              Thông tin hệ thống & Đặt lại
            </h3>
          </div>

          <div className="text-xs text-[#939293] space-y-1 leading-relaxed">
            <p><strong>Phiên bản:</strong> VietASL 2.0 Web (Hybrid Edition)</p>
            <p><strong>3D Character:</strong> Ícaro (VLibras Rig 83 bones, PBR 2K textures)</p>
            <p><strong>Sign System:</strong> ASL (American Sign Language Standard)</p>
            <p><strong>AI Engine:</strong> Google Gemini API + Offline Hybrid Lexicon</p>
          </div>

          <div className="pt-2 border-t border-black/5">
            <button
              onClick={handleReset}
              className="w-full py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Khôi phục cài đặt mặc định</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
