import React, { useEffect } from 'react';
import { Header } from '../components/common/Header';
import { useTranslationStore } from '../stores/translationStore';
import { usePlayerStore } from '../stores/playerStore';
import { useAppStore } from '../stores/appStore';
import { globalRigController } from '../three/AvatarCanvas';
import { deleteHistoryItem, clearAllHistory } from '../services/db';
import { TranslationHistoryItem } from '../types';
import { History as HistoryIcon, Trash2, Play, Calendar } from 'lucide-react';

export const History: React.FC = () => {
  const { historyList, loadHistory, translateText } = useTranslationStore();
  const { setStatus, setSubtitles } = usePlayerStore();
  const { setRoute, showToast } = useAppStore();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleReplayItem = async (item: TranslationHistoryItem) => {
    try {
      const result = await translateText(item.inputText, false);
      if (result.clip) {
        usePlayerStore.getState().playClipNow(result.clip, item.inputText, item.gloss);
        setRoute('home');
      }
    } catch (e: any) {
      showToast('Lỗi phát lại: ' + e.message);
    }
  };

  const handleDeleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await deleteHistoryItem(id);
    await loadHistory();
    showToast('Đã xóa mục lịch sử.');
  };

  const handleClearAll = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử dịch?')) {
      await clearAllHistory();
      await loadHistory();
      showToast('Đã xóa toàn bộ lịch sử.');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F6F8] overflow-hidden select-none">
      <Header title="Lịch sử dịch" showBack />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-4">
        {historyList.length > 0 && (
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#939293] uppercase tracking-wider">
              {historyList.length} câu đã dịch gần đây
            </span>
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={14} />
              <span>Xóa toàn bộ</span>
            </button>
          </div>
        )}

        {historyList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-black/5 text-[#939293]">
            <HistoryIcon size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">Chưa có lịch sử dịch</p>
            <p className="text-xs mt-1">Các bản dịch của bạn sẽ được tự động lưu cục bộ tại đây.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {historyList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleReplayItem(item)}
                className="p-4 bg-white rounded-xl border border-black/5 hover:border-[#1447A6]/30 shadow-xs cursor-pointer active:scale-[0.99] transition-all flex items-center justify-between group"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#939293]">
                    <Calendar size={12} />
                    <span>{item.dateString}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#373F41] group-hover:text-[#1447A6] transition-colors">
                    "{item.inputText}"
                  </h4>
                  <div className="text-xs font-mono text-[#939293] bg-gray-50 px-2 py-0.5 rounded border border-black/5 inline-block">
                    Gloss: {item.gloss}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    className="w-8 h-8 rounded-full text-[#939293] hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                    title="Xóa mục này"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className="w-9 h-9 rounded-full bg-[#D6E5F9] text-[#1447A6] group-hover:bg-[#1447A6] group-hover:text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Phát lại trên avatar"
                  >
                    <Play size={16} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
