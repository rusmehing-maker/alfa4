import {StrictMode, Component, ErrorInfo, ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

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

