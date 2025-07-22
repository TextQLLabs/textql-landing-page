import React from 'react';
import { Search, Archive, Star, Inbox, Send, Paperclip, AlertTriangle } from 'lucide-react';

const EmailBotPreview = () => {
  return (
    <div className="w-[500px] h-[500px] bg-white overflow-hidden border border-gray-300 rounded-lg shadow-lg mx-auto">
      {/* Gmail Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-medium text-gray-700">Gmail</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-32 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-2 space-y-1">
            <div className="flex items-center space-x-2 bg-red-100 text-red-600 rounded px-2 py-1">
              <Inbox className="w-3 h-3" />
              <span className="text-xs font-medium">Inbox</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">3</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded">
              <Star className="w-3 h-3 text-gray-400" />
              <div className="h-1 bg-gray-300 rounded-full w-10"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded">
              <Send className="w-3 h-3 text-gray-400" />
              <div className="h-1 bg-gray-300 rounded-full w-8"></div>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded">
              <Archive className="w-3 h-3 text-gray-400" />
              <div className="h-1 bg-gray-300 rounded-full w-12"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Email List Header */}
          <div className="bg-white border-b border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-700">Inbox</h2>
              <div className="text-xs text-gray-500">1-3 of 3</div>
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {/* TextQL Analytics Alert Email - Highlighted */}
            <div className="border-b border-gray-200 bg-blue-50 hover:bg-blue-100 cursor-pointer">
              <div className="px-3 py-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white font-bold text-xs">T</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">TextQL Analytics</span>
                      <span className="text-xs text-gray-500">2:15 PM</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-800">Alert: Critical metrics change detected</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      Average session duration decreased by 55% (101.23s → 225.93s) on March 04, 2023. 
                      San Francisco time on page increased by 105% compared to February 25, 2023...
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">High Priority</div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular emails as placeholder bars */}
            <div className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <div className="px-3 py-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white font-bold text-xs">J</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-1.5 bg-gray-300 rounded-full w-20"></div>
                      <div className="h-1 bg-gray-200 rounded-full w-12"></div>
                    </div>
                    <div className="h-1.5 bg-gray-300 rounded-full w-32 mb-1"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-1 bg-gray-200 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <div className="px-3 py-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white font-bold text-xs">M</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-1.5 bg-gray-300 rounded-full w-24"></div>
                      <div className="h-1 bg-gray-200 rounded-full w-10"></div>
                    </div>
                    <div className="h-1.5 bg-gray-300 rounded-full w-28 mb-1"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-200 rounded-full w-5/6"></div>
                      <div className="h-1 bg-gray-200 rounded-full w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
              <div className="px-3 py-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white font-bold text-xs">S</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-1.5 bg-gray-300 rounded-full w-16"></div>
                      <div className="h-1 bg-gray-200 rounded-full w-8"></div>
                    </div>
                    <div className="h-1.5 bg-gray-300 rounded-full w-24 mb-1"></div>
                    <div className="space-y-1">
                      <div className="h-1 bg-gray-200 rounded-full w-full"></div>
                      <div className="h-1 bg-gray-200 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-white border-t border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">+</span>
                </div>
                <div className="h-1 bg-gray-300 rounded-full w-16"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBotPreview;