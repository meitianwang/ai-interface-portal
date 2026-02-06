"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { models } from "@/lib/models-data";
import {
  Send,
  Settings,
  ChevronDown,
  Plus,
  MessageSquare,
  Trash2,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated response from ${selectedModel.name}. In a real implementation, this would connect to the OpenRouter API to generate responses using the selected model.`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-border bg-secondary/30">
          <div className="p-4">
            <button className="w-full flex items-center gap-2 h-10 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            <div className="p-2">
              <p className="text-xs text-muted-foreground px-2 mb-2">Recent</p>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left hover:bg-secondary transition-colors group">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 truncate">New conversation</span>
              </button>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Model Selector */}
          <div className="border-b border-border p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative inline-block">
                <button
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="flex items-center gap-2 h-9 px-3 bg-secondary rounded-lg text-sm hover:bg-secondary/80 transition-colors"
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold",
                      selectedModel.provider === "Anthropic" && "bg-orange-500",
                      selectedModel.provider === "OpenAI" && "bg-emerald-600",
                      selectedModel.provider === "Google" && "bg-blue-500"
                    )}
                  >
                    {selectedModel.providerLogo}
                  </div>
                  <span>{selectedModel.name}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      modelDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {modelDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-card border border-border rounded-xl shadow-lg z-10 py-2 max-h-80 overflow-y-auto">
                    {models.slice(0, 10).map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setModelDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors",
                          selectedModel.id === model.id && "bg-primary/10"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold",
                            model.provider === "Anthropic" && "bg-orange-500",
                            model.provider === "OpenAI" && "bg-emerald-600",
                            model.provider === "Google" && "bg-blue-500",
                            model.provider === "Meta" && "bg-blue-600",
                            model.provider === "Mistral AI" && "bg-violet-600",
                            model.provider === "DeepSeek" && "bg-cyan-600"
                          )}
                        >
                          {model.providerLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{model.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {model.provider}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto py-8 px-4">
              {messages.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Start a conversation
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Send a message to start chatting with {selectedModel.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4",
                        message.role === "user" && "justify-end"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                            selectedModel.provider === "Anthropic" &&
                              "bg-orange-500",
                            selectedModel.provider === "OpenAI" &&
                              "bg-emerald-600",
                            selectedModel.provider === "Google" && "bg-blue-500"
                          )}
                        >
                          {selectedModel.providerLogo}
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 group relative",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                        {message.role === "assistant" && (
                          <button
                            onClick={() =>
                              handleCopy(message.id, message.content)
                            }
                            className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                          selectedModel.provider === "Anthropic" &&
                            "bg-orange-500",
                          selectedModel.provider === "OpenAI" &&
                            "bg-emerald-600",
                          selectedModel.provider === "Google" && "bg-blue-500"
                        )}
                      >
                        {selectedModel.providerLogo}
                      </div>
                      <div className="bg-secondary rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={`Message ${selectedModel.name}...`}
                    rows={1}
                    className="w-full resize-none bg-secondary rounded-xl px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[48px] max-h-32"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 bottom-2 p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  Press Enter to send, Shift+Enter for new line
                </p>
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
