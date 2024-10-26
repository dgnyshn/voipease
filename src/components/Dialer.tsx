import React, { useState, useEffect } from 'react';
import { Phone, X, Plus, Mic, MicOff, Globe, Delete, Voicemail } from 'lucide-react';
import useCallStore from '../store/useCallStore';
import { getCallCost, formatCost } from '../utils/callUtils';

const DialerButton: React.FC<{
  value: string;
  onClick: () => void;
  onLongPress?: () => void;
  subText?: string;
}> = ({ value, onClick, onLongPress, subText }) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    if (onLongPress && value === '0') {
      const timer = setTimeout(onLongPress, 500);
      setPressTimer(timer);
    }
  };

  const handleMouseUp = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-20 h-20 rounded-full bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center transition-colors"
    >
      <span className="text-2xl font-semibold">{value}</span>
      {subText && <span className="text-xs text-gray-500">{subText}</span>}
    </button>
  );
};

export default function Dialer() {
  const { 
    currentNumber, 
    addToNumber, 
    clearNumber, 
    isInCall, 
    startCall, 
    endCall,
    getRemainingMinutes,
    leaveVoicemail
  } = useCallStore();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isRecordingVoicemail, setIsRecordingVoicemail] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if ((isInCall || isRecordingVoicemail) && !timer) {
      const newTimer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setTimer(newTimer);
    } else if (!isInCall && !isRecordingVoicemail && timer) {
      clearInterval(timer);
      setTimer(null);
      setCallDuration(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInCall, isRecordingVoicemail]);

  const handleCall = () => {
    if (currentNumber.length > 0 && getRemainingMinutes() > 0) {
      startCall();
    }
  };

  const handleEndCall = () => {
    if (isRecordingVoicemail) {
      leaveVoicemail(currentNumber, callDuration);
      setIsRecordingVoicemail(false);
    } else {
      endCall();
    }
    clearNumber();
  };

  const handleDeleteDigit = () => {
    if (currentNumber.length > 0) {
      const newNumber = currentNumber.slice(0, -1);
      clearNumber();
      if (newNumber) {
        newNumber.split('').forEach(digit => addToNumber(digit));
      }
    }
  };

  const handleVoicemail = () => {
    if (currentNumber.length > 0) {
      setIsRecordingVoicemail(true);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const dialerButtons = [
    { value: '1', subText: '' },
    { value: '2', subText: 'ABC' },
    { value: '3', subText: 'DEF' },
    { value: '4', subText: 'GHI' },
    { value: '5', subText: 'JKL' },
    { value: '6', subText: 'MNO' },
    { value: '7', subText: 'PQRS' },
    { value: '8', subText: 'TUV' },
    { value: '9', subText: 'WXYZ' },
    { value: '*', subText: '' },
    { value: '0', subText: '+', onLongPress: () => addToNumber('+') },
    { value: '#', subText: '' },
  ];

  const remainingMinutes = getRemainingMinutes();
  const estimatedCost = currentNumber ? getCallCost(currentNumber) : 0;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-6">
        <input
          type="text"
          value={currentNumber}
          readOnly
          className="w-full text-3xl font-semibold text-center p-4 rounded-lg bg-gray-50"
          placeholder="Enter number"
        />
        {currentNumber.startsWith('+') && (
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
            <Globe className="w-4 h-4 mr-1" />
            International Call
          </div>
        )}
        <div className="text-center mt-2 text-sm text-gray-500">
          Rate: {formatCost(estimatedCost)}/min • Available: {remainingMinutes} min
        </div>
      </div>

      {isInCall || isRecordingVoicemail ? (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-xl font-semibold text-green-600">{currentNumber}</div>
            <div className="text-lg text-gray-600 mt-2">
              {isRecordingVoicemail ? 'Recording Voicemail: ' : ''}{formatTime(callDuration)}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            
            <button
              onClick={handleEndCall}
              className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              <X size={24} />
            </button>
            
            <button
              className="p-4 rounded-full bg-gray-100 text-gray-600"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 justify-items-center mb-6">
            {dialerButtons.map((button) => (
              <DialerButton
                key={button.value}
                value={button.value}
                subText={button.subText}
                onClick={() => addToNumber(button.value)}
                onLongPress={button.onLongPress}
              />
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCall}
              disabled={remainingMinutes === 0}
              className={`p-4 rounded-full ${
                remainingMinutes > 0 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Phone size={24} />
            </button>

            <button
              onClick={handleVoicemail}
              className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <Voicemail size={24} />
            </button>
            
            {currentNumber && (
              <button
                onClick={handleDeleteDigit}
                className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <Delete size={24} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}