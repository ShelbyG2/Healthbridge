import { PlusIcon } from "lucide-react";

const PatientChat = () => {
  const receivedMessages = [
    { id: 1, text: "Hello, how can I help you today?" },
  ];
  const sentMessages = [{ id: 1, text: "Sure, I can help with that." }];
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <header className="relative overflow-hidden pb-6">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div
          className="relative z-10 pt-8 pb-6 px-4 md:px-6 bg-light-surface/80 dark:bg-dark-surface/80 
              backdrop-blur-lg border-b border-light-border/10 dark:border-dark-border/10"
        >
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
              Patient Chat
            </h1>
            <p className="text-light-secondary dark:text-dark-secondary text-lg">
              Bridge Chat
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div
                className="px-4 py-2 rounded-full bg-light-surface dark:bg-dark-surface 
                    border border-light-border/20 dark:border-dark-border/20"
              >
                <span className="text-light-secondary dark:text-dark-secondary">
                  <PlusIcon className="inline-block mr-2" /> Start a new chat
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="bg-light-bg-shape2/70 h-full flex-1">
        {receivedMessages.length > 0 && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                Received Messages
              </h2>
              {receivedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow"
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                Sent Messages
              </h2>
              {sentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow"
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientChat;
