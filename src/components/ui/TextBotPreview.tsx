import React from 'react';
import { Signal, Wifi, Battery, MessageSquare, Phone, Video, Info } from 'lucide-react';

const TextBotPreview = () => {
  return (
    <div className="w-[300px] h-[500px] bg-black rounded-[2rem] p-2 shadow-2xl mx-auto">
      {/* iPhone Frame */}
      <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="bg-white px-4 py-2 flex items-center justify-between text-black">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium">9:41</span>
          </div>
          <div className="flex items-center space-x-1">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Messages Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">TextQL Analytics</h2>
                <p className="text-xs text-green-500">Active now</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-500" />
              <Video className="w-5 h-5 text-blue-500" />
              <Info className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {/* Previous messages as placeholder bubbles */}
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-2xl px-3 py-2 max-w-xs">
              <div className="h-2 bg-blue-300 rounded-full w-20"></div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl px-3 py-2 max-w-xs">
              <div className="space-y-1">
                <div className="h-2 bg-gray-400 rounded-full w-16"></div>
                <div className="h-2 bg-gray-400 rounded-full w-24"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-2xl px-3 py-2 max-w-xs">
              <div className="h-2 bg-blue-300 rounded-full w-12"></div>
            </div>
          </div>

          {/* Time separator */}
          <div className="text-center py-2">
            <span className="text-xs text-gray-500 bg-white px-2">Today 2:15 PM</span>
          </div>

          {/* TextQL Analytics Alert - Main Message */}
          <div className="flex justify-start">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-2xl px-4 py-3 max-w-xs shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <span className="text-sm font-semibold text-red-800">Analytics Alert</span>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed">
                <span className="font-medium">Session duration dropped 55%</span><br/>
                101.23s → 225.93s on March 04
              </p>
              <div className="mt-2 pt-2 border-t border-red-200">
                <p className="text-xs text-gray-600">
                  SF time on page +105% vs Feb 25
                </p>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <div className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs">Critical</div>
                <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">View Report</div>
              </div>
            </div>
          </div>

          {/* Follow-up message */}
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-2xl px-3 py-2 max-w-xs">
              <p className="text-sm text-gray-800">
                Tap "View Report" for detailed analysis and recommendations.
              </p>
            </div>
          </div>

          {/* User response placeholder */}
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-2xl px-3 py-2 max-w-xs">
              <div className="h-2 bg-blue-300 rounded-full w-28"></div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
              <div className="h-2 bg-gray-300 rounded-full w-16"></div>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">↑</span>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center py-2">
          <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TextBotPreview;