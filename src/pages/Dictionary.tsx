import React, { useState, useMemo } from 'react';
import { Header } from '../components/common/Header';
import { ASL_DICTIONARY, CATEGORIES } from '../asl/dictionary';
import { ASL_ALPHABET } from '../asl/fingerspelling';
import { CategoryBar } from '../components/dictionary/CategoryBar';
import { useAppStore } from '../stores/appStore';
import { useTranslationStore } from '../stores/translationStore';
import { usePlayerStore } from '../stores/playerStore';
import { globalRigController } from '../three/AvatarCanvas';
import { DictionaryItem } from '../types';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Play,
  Hand,
  Sparkles,
  Type
} from 'lucide-react';

export const Dictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'words' | 'alphabet'>('words');

  const { openWordDetail, setRoute } = useAppStore();
  const { translateText } = useTranslationStore();
  const { setStatus, setSubtitles } = usePlayerStore();

  const filteredWords = useMemo(() => {
    return ASL_DICTIONARY.filter((item) => {
      const matchesSearch =
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaningVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.gloss.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = activeCategory === 'all' || item.category === activeCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ASL_DICTIONARY.length };
    for (const item of ASL_DICTIONARY) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const handlePlayWord = async (e: React.MouseEvent, item: DictionaryItem) => {
    e.stopPropagation();
    try {
      const result = await translateText(item.word, false);
      if (result.clip || (result.tokens && result.tokens.length > 0)) {
        usePlayerStore.getState().playClipNow(result.clip, item.word, item.gloss, result.tokens);
        setRoute('home');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlayLetter = async (char: string) => {
    try {
      const result = await translateText(char, false);
      if (result.clip || (result.tokens && result.tokens.length > 0)) {
        usePlayerStore.getState().playClipNow(result.clip, `Chữ ${char}`, `fs-${char}`, result.tokens);
        setRoute('home');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F6F8] overflow-hidden select-none">
      <Header title="Từ điển ký hiệu ASL" showBack />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-4">
        {/* Search Bar (VLibras: dictionary-box & searchbar) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#939293]">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm từ tiếng Anh, nghĩa tiếng Việt, Gloss..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-black/10 text-sm text-[#373F41] placeholder:text-[#939293]/70 focus:outline-none focus:border-[#1447A6] shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-xs text-[#939293] hover:text-[#373F41]"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Tab Switcher: Từ vựng ASL vs Bảng chữ cái Fingerspelling */}
        <div className="flex bg-black/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('words')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'words'
                ? 'bg-white text-[#1447A6] shadow-xs'
                : 'text-[#4B4B4B] hover:text-[#1447A6]'
            }`}
          >
            <BookOpen size={15} />
            <span>Từ vựng ASL ({ASL_DICTIONARY.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('alphabet')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'alphabet'
                ? 'bg-white text-[#1447A6] shadow-xs'
                : 'text-[#4B4B4B] hover:text-[#1447A6]'
            }`}
          >
            <Type size={15} />
            <span>Bảng chữ cái ngón tay (A-Z)</span>
          </button>
        </div>

        {activeTab === 'words' && (
          <>
            {/* Category Filter Bar with visible scrollbar, drag-to-scroll, arrow buttons and wrap toggle */}
            <CategoryBar
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              categoryCounts={categoryCounts}
            />

            {/* Word List */}
            <div className="space-y-2">
              {filteredWords.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-black/5 text-[#939293]">
                  <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-medium">Không tìm thấy ký hiệu phù hợp</p>
                  <p className="text-xs mt-1">
                    Thử tìm bằng từ tiếng Anh (ví dụ: Hello, Thank you, Please)...
                  </p>
                </div>
              ) : (
                filteredWords.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openWordDetail(item)}
                    className="p-3.5 bg-white rounded-xl border border-black/5 hover:border-[#1447A6]/30 shadow-xs flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D6E5F9]/60 text-[#1447A6] flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-[#1447A6] group-hover:text-white transition-colors">
                        {item.word[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#373F41] capitalize">
                            {item.word}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-gray-100 text-[#4B4B4B] font-semibold">
                            {item.gloss}
                          </span>
                        </div>
                        <p className="text-xs text-[#1447A6] font-medium mt-0.5">
                          {item.meaningVi}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-[11px] text-[#939293] bg-gray-50 px-2 py-0.5 rounded-full border border-black/5">
                        {item.dominantHand === 'Both' ? '2 tay' : '1 tay'}
                      </span>
                      <button
                        onClick={(e) => handlePlayWord(e, item)}
                        className="w-8 h-8 rounded-full bg-[#D6E5F9] text-[#1447A6] hover:bg-[#1447A6] hover:text-white flex items-center justify-center transition-colors"
                        title="Phát ký hiệu này"
                      >
                        <Play size={14} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'alphabet' && (
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-xl border border-black/5 text-xs text-[#939293] flex items-center gap-2">
              <Sparkles size={16} className="text-[#1447A6] shrink-0" />
              <span>
                Nhấp vào từng chữ cái để xem cách avatar 3D tạo hình ngón tay tương ứng trong bảng chữ cái ngón tay ASL.
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {ASL_ALPHABET.map((item) => (
                <div
                  key={item.char}
                  onClick={() => handlePlayLetter(item.char)}
                  className="p-3 bg-white rounded-xl border border-black/5 hover:border-[#1447A6] hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-8 h-8 rounded-lg bg-[#D6E5F9] text-[#1447A6] font-black text-lg flex items-center justify-center">
                      {item.char}
                    </span>
                    <Play size={14} className="text-[#1447A6]" fill="currentColor" />
                  </div>
                  <p className="text-[11px] text-[#4B4B4B] font-medium mt-1 line-clamp-2">
                    {item.handshapeVi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
