// Speech Recognition Service using Web Speech API

export interface SpeechListenerCallbacks {
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  onStart: () => void;
}

export class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    lang: string,
    callbacks: SpeechListenerCallbacks
  ): boolean {
    if (!this.recognition) {
      callbacks.onError('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói (Web Speech API).');
      return false;
    }

    if (this.isListening) {
      this.stop();
    }

    this.recognition.lang = lang;

    this.recognition.onstart = () => {
      this.isListening = true;
      callbacks.onStart();
    };

    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      callbacks.onResult(finalTranscript);
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      let msg = 'Lỗi nhận diện giọng nói: ' + (event.error || 'không rõ');
      if (event.error === 'not-allowed') {
        msg = 'Quyền truy cập micro bị từ chối. Vui lòng cho phép quyền truy cập trong cài đặt trình duyệt.';
      } else if (event.error === 'no-speech') {
        msg = 'Không nhận thấy âm thanh giọng nói. Vui lòng thử nói lại.';
      }
      callbacks.onError(msg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      callbacks.onEnd();
    };

    try {
      this.recognition.start();
      return true;
    } catch (e: any) {
      this.isListening = false;
      callbacks.onError('Không thể bắt đầu ghi âm: ' + e.message);
      return false;
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();
