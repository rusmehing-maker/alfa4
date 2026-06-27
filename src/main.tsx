import {StrictMode, Component, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    console.error("GLOBAL RUNTIME CRASH DETECTED:", e.error);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `<div style="color: #ff4d4d; padding: 40px; font-family: monospace; background: #080808; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border: 1px solid #ff4d4d33;">
        <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 20px; letter-spacing: 0.1em; text-transform: uppercase;">Критический сбой приложения</h1>
        <p style="color: #a0a0a0; font-size: 13px; max-width: 600px; margin-bottom: 30px; line-height: 1.6;">Не удалось запустить приложение из-за ошибки времени выполнения. Пожалуйста, проверьте консоль разработчика.</p>
        <div style="background: #000; color: #ff6666; padding: 20px; text-align: left; border: 1px solid #331111; max-width: 800px; width: 100%; overflow-x: auto; font-size: 11px; white-space: pre-wrap; line-height: 1.5; border-radius: 4px;">
          <strong>Ошибка:</strong> ${e.message}\n\n<strong>Источник:</strong> ${e.filename}:${e.lineno}:${e.colno}\n\n<strong>Стек вызовов:</strong>\n${e.error?.stack || 'Нет стека'}
        </div>
      </div>`;
    }
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error("UNHANDLED REJECTION DETECTED:", e.reason);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `<div style="color: #ff4d4d; padding: 40px; font-family: monospace; background: #080808; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border: 1px solid #ff4d4d33;">
        <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 20px; letter-spacing: 0.1em; text-transform: uppercase;">Сбой асинхронной операции</h1>
        <p style="color: #a0a0a0; font-size: 13px; max-width: 600px; margin-bottom: 30px; line-height: 1.6;">Асинхронный промис был отклонён без обработки ошибки.</p>
        <div style="background: #000; color: #ff6666; padding: 20px; text-align: left; border: 1px solid #331111; max-width: 800px; width: 100%; overflow-x: auto; font-size: 11px; white-space: pre-wrap; line-height: 1.5; border-radius: 4px;">
          <strong>Причина:</strong> ${e.reason?.message || e.reason || 'Неизвестно'}\n\n<strong>Стек вызовов:</strong>\n${e.reason?.stack || 'Нет стека'}
        </div>
      </div>`;
    }
  });
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in App:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#030303] text-gray-100 flex flex-col items-center justify-center p-8 select-none font-sans">
          <div className="max-w-md w-full bg-neutral-900 border border-red-500/30 p-6 text-center space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500 font-bold mx-auto text-xl">
              !
            </div>
            <h1 className="text-lg font-serif uppercase tracking-wider text-white">Произошла ошибка</h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              При загрузке приложения произошел сбой. Пожалуйста, сообщите разработчику или обновите страницу.
            </p>
            <div className="p-3 bg-black text-left font-mono text-[9px] text-red-400 overflow-x-auto rounded border border-neutral-800 max-h-40">
              {this.state.error?.toString()}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs uppercase tracking-wider font-mono"
            >
              Перезагрузить страницу
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

