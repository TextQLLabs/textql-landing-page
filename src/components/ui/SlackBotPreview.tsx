import React from 'react';
import { Bell, Hash, Volume2, ChevronDown, MoreHorizontal, Search, Plus, Smile, Paperclip, Send } from 'lucide-react';

const SlackBotPreview = () => {
  return (
    <div className="flex w-[500px] h-[500px] bg-white overflow-hidden font-slack border border-gray-300 rounded-lg shadow-lg mx-auto">
      {/* Sidebar */}
      <div className="w-40 bg-slack-sidebar text-white flex flex-col">
        {/* Workspace header */}
        <div className="px-2 py-2 border-b border-slack-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs mr-2">
                T
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-400 rounded-full w-20 mb-1"></div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                  <div className="h-1.5 bg-gray-400 rounded-full w-8"></div>
                </div>
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slack-text-muted" />
          </div>
        </div>

        {/* Navigation */}
        <div className="px-2 py-1 space-y-1">
          <div className="flex items-center px-1 py-1">
            <div className="w-2 h-2 mr-2"></div>
            <div className="h-1.5 bg-gray-400 rounded-full w-12"></div>
          </div>
          <div className="flex items-center px-1 py-1">
            <div className="w-2 h-2 mr-2"></div>
            <div className="h-1.5 bg-gray-400 rounded-full w-10"></div>
          </div>
          <div className="flex items-center px-1 py-1">
            <div className="w-2 h-2 mr-2"></div>
            <div className="h-1.5 bg-gray-400 rounded-full w-16"></div>
          </div>
        </div>

        {/* Channels Section */}
        <div className="px-2 py-1">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="h-1.5 bg-gray-400 rounded-full w-12"></div>
            <Plus className="w-3 h-3 text-slack-text-muted" />
          </div>
          
          <div className="space-y-1 mt-1">
            {/* Active channel */}
            <div className="flex items-center bg-blue-600 text-white rounded px-1 py-1">
              <Hash className="w-3 h-3 mr-1" />
              <div className="h-1.5 bg-gray-200 rounded-full w-10"></div>
            </div>

            {/* Other channels */}
            <div className="flex items-center px-1 py-1">
              <Hash className="w-3 h-3 mr-1 text-gray-400" />
              <div className="h-1.5 bg-gray-400 rounded-full w-8"></div>
            </div>
            <div className="flex items-center px-1 py-1">
              <Volume2 className="w-3 h-3 mr-1 text-gray-400" />
              <div className="h-1.5 bg-gray-400 rounded-full w-12"></div>
              <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
            </div>
            <div className="flex items-center px-1 py-1">
              <Hash className="w-3 h-3 mr-1 text-gray-400" />
              <div className="h-1.5 bg-gray-400 rounded-full w-9"></div>
            </div>
            <div className="flex items-center px-1 py-1">
              <Hash className="w-3 h-3 mr-1 text-gray-400" />
              <div className="h-1.5 bg-gray-400 rounded-full w-14"></div>
            </div>
          </div>
        </div>

        {/* Direct messages */}
        <div className="px-2 py-1">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="h-1.5 bg-gray-400 rounded-full w-16"></div>
            <Plus className="w-3 h-3 text-slack-text-muted" />
          </div>
          
          <div className="space-y-1 mt-1">
            <div className="flex items-center px-1 py-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
              <div className="h-1.5 bg-gray-400 rounded-full w-12"></div>
              <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">1</span>
            </div>
            <div className="flex items-center px-1 py-1">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1"></div>
              <div className="h-1.5 bg-gray-400 rounded-full w-10"></div>
            </div>
            <div className="flex items-center px-1 py-1">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1"></div>
              <div className="h-1.5 bg-gray-400 rounded-full w-11"></div>
            </div>
          </div>
        </div>

        {/* Apps */}
        <div className="px-2 py-1">
          <div className="flex items-center justify-between px-1 py-1">
            <div className="h-1.5 bg-gray-400 rounded-full w-8"></div>
            <Plus className="w-3 h-3 text-slack-text-muted" />
          </div>
          
          <div className="space-y-1 mt-1">
            <div className="flex items-center px-1 py-1">
              <div className="w-3 h-3 bg-purple-600 rounded mr-1 flex items-center justify-center">
                <span className="text-xs font-bold">T</span>
              </div>
              <div className="h-1.5 bg-gray-400 rounded-full w-14"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-3 py-2 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-600" />
              <div className="h-2 bg-gray-300 rounded-full w-12"></div>
              <div className="text-gray-500 text-sm flex items-center">
                <span className="mx-1">|</span>
                <div className="h-1.5 bg-gray-300 rounded-full w-8"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-600 cursor-pointer" />
              <MoreHorizontal className="w-4 h-4 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-3 bg-white">
          {/* Analytics message from TextQL Ana */}
          <div className="mb-4">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                T
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-gray-900 text-sm">TextQL Ana</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-medium">APP</span>
                  <span className="text-xs text-gray-500">1:35 PM</span>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r p-3">
                  <div className="flex items-center mb-2">
                    <Bell className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-semibold text-sm">Alert triggered: 3 new alerts</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">Average session duration decreased by 55%</h3>
                      <p className="text-gray-700 text-xs">On March 04, 2023 average session duration decreased by 55% (101.23s) compared to March 03, 2023 (225.93s)</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">In San Francisco time on page increased by 105%</h3>
                      <p className="text-gray-700 text-xs">On March 04, 2023 San Francisco average time visitors spent on page increased by 105%, compared to February 25, 2023</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-blue-200">
                    <p className="text-xs text-gray-500 mb-2">Yesterday at 4:00 PM</p>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-xs text-gray-600 hover:bg-gray-100 px-1 py-1 rounded cursor-pointer">
                        <span>👁️</span>
                        <span>3</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 hover:bg-gray-100 px-1 py-1 rounded cursor-pointer">
                        <span>🎄</span>
                        <span>4</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 hover:bg-gray-100 px-1 py-1 rounded cursor-pointer">
                        <span>🤯</span>
                        <span>1</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600 hover:bg-gray-100 px-1 py-1 rounded cursor-pointer">
                        <Smile className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular user messages as placeholder bars */}
          <div className="mb-3">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-white font-bold text-xs">
                J
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="h-1.5 bg-gray-300 rounded-full w-12"></div>
                  <div className="h-1 bg-gray-200 rounded-full w-8"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded bg-pink-500 flex items-center justify-center text-white font-bold text-xs">
                J
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="h-1.5 bg-gray-300 rounded-full w-14"></div>
                  <div className="h-1 bg-gray-200 rounded-full w-8"></div>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Date separator */}
          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-200"></div>
            <div className="px-2 h-1 bg-gray-200 rounded-full w-8"></div>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="mb-3">
            <div className="flex items-start space-x-2">
              <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="h-1.5 bg-gray-300 rounded-full w-16"></div>
                  <div className="h-1 bg-gray-200 rounded-full w-6"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded-full w-5/6"></div>
                  <div className="h-1.5 bg-gray-200 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message input */}
        <div className="border-t border-gray-200 p-2 bg-white">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <div className="relative">
                <div className="w-full px-2 py-1.5 border border-gray-300 rounded bg-gray-50">
                  <div className="h-1.5 bg-gray-300 rounded-full w-20"></div>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Paperclip className="w-3 h-3 text-gray-400" />
                  <Smile className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>
            <button className="p-1.5 bg-green-600 text-white rounded transition-colors">
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackBotPreview;