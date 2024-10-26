import React, { useState, useRef } from 'react';
import { ArrowLeft, Volume2, Mic, WifiOff, PhoneOff, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TroubleshootingGuide() {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Audio test functions
  const testAudio = () => {
    setIsTesting(true);
    setTestResult(null);

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1000;
    gainNode.gain.value = 0.1;

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
      setIsTesting(false);
      setTestResult('Speaker test completed. Did you hear a beep?');
    }, 1000);
  };

  const testMicrophone = async () => {
    try {
      setIsTesting(true);
      setTestResult(null);

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      mediaStreamSource.connect(analyser);

      let hasSound = false;
      const checkAudio = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        if (average > 10) hasSound = true;
      };

      const interval = setInterval(checkAudio, 100);

      setTimeout(() => {
        clearInterval(interval);
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
        setIsTesting(false);
        setTestResult(hasSound ? 
          'Microphone is working properly!' : 
          'No audio detected. Please check your microphone settings.'
        );
      }, 3000);

    } catch (error) {
      setIsTesting(false);
      setTestResult('Error accessing microphone. Please check your permissions.');
      console.error('Microphone test error:', error);
    }
  };

  const troubleshootingItems = [
    {
      id: 'audio',
      icon: Volume2,
      title: 'Audio Issues',
      content: [
        {
          type: 'Common Issues',
          items: [
            'No sound during calls',
            'Echo or feedback',
            'Poor audio quality',
            'Background noise'
          ]
        },
        {
          type: 'Solutions',
          items: [
            'Use a headset to prevent echo',
            "Ensure you're in a quiet environment",
            'Check audio settings in your browser',
            'Test your speakers and microphone'
          ]
        }
      ],
      hasTest: true
    },
    {
      id: 'connection',
      icon: WifiOff,
      title: 'Connection Problems',
      content: [
        {
          type: 'Common Issues',
          items: [
            'Call drops frequently',
            'Poor call quality',
            'Unable to connect calls',
            'Delayed audio'
          ]
        },
        {
          type: 'Solutions',
          items: [
            'Check your internet connection speed',
            'Use a wired connection if possible',
            'Close bandwidth-heavy applications',
            'Move closer to your WiFi router'
          ]
        }
      ]
    },
    {
      id: 'calls',
      icon: PhoneOff,
      title: 'Call Issues',
      content: [
        {
          type: 'Common Issues',
          items: [
            'Unable to make outgoing calls',
            'Calls not connecting',
            'Call quality issues',
            'Problems with call forwarding'
          ]
        },
        {
          type: 'Solutions',
          items: [
            'Verify your remaining minutes balance',
            'Check the number format is correct',
            'Ensure call forwarding settings are correct',
            'Try refreshing the application'
          ]
        }
      ]
    },
    {
      id: 'errors',
      icon: AlertTriangle,
      title: 'Error Messages',
      content: [
        {
          type: 'Common Issues',
          items: [
            'Browser permission errors',
            'Connection timeout errors',
            'Authentication errors',
            'Device access errors'
          ]
        },
        {
          type: 'Solutions',
          items: [
            'Allow microphone and audio permissions',
            'Check your login status',
            'Clear browser cache and cookies',
            'Update your browser to the latest version'
          ]
        }
      ]
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          to="/dashboard/help"
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Help Center
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Troubleshooting Guide</h1>
        <p className="text-gray-500 mt-1">
          Find solutions to common issues and get back to making calls quickly
        </p>
      </div>

      <div className="space-y-6">
        {troubleshootingItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <item.icon className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </div>
            
            <div className="space-y-4">
              {item.content.map((section) => (
                <div key={section.type}>
                  <h3 className="font-medium text-gray-900 mb-2">{section.type}:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {section.items.map((text, index) => (
                      <li key={index} className="text-gray-600">{text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {item.hasTest && (
              <div className="mt-6 space-y-4">
                <div className="flex space-x-4">
                  <button
                    onClick={testAudio}
                    disabled={isTesting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isTesting ? 'Testing...' : 'Test Speakers'}
                  </button>
                  <button
                    onClick={testMicrophone}
                    disabled={isTesting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isTesting ? 'Testing...' : 'Test Microphone'}
                  </button>
                </div>
                {testResult && (
                  <div className={`p-4 rounded-lg ${
                    testResult.includes('Error') ? 'bg-red-50 text-red-700' :
                    testResult.includes('No audio') ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {testResult}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Still Having Issues?
        </h2>
        <p className="text-blue-700 mb-4">
          Our support team is available 24/7 to help you resolve any problems.
        </p>
        <button 
          onClick={() => {
            if (window.Tawk_API) {
              window.Tawk_API.toggle();
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Chat with Support
        </button>
      </div>
    </div>
  );
}