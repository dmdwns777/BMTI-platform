import { useState } from 'react';
import { BOARD_DATA } from '../data';

const BoardView = () => {
  const [activeTab, setActiveTab] = useState('vote');
  const [chatType, setChatType] = useState('Z');
  const [votedId, setVotedId] = useState(null);

  const tabs = [
    { id: 'vote', label: 'BMTI 투표' },
    { id: 'chat', label: 'BMTI 소통방' },
    { id: 'qna', label: 'QnA' }
  ];

  return (
    <div className="min-h-screen pt-32 px-6 max-w-4xl mx-auto pb-24 fade-in">
      <h1 className="text-4xl font-serif mb-12 text-center font-bold">BMTI 이모저모</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`board-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-4 text-lg font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-b-2 border-black text-black'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-4">
        {activeTab === 'vote' && (
          <div className="bg-white p-8 border border-gray-200 rounded-3xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-6 whitespace-pre-line leading-relaxed text-center">
              {BOARD_DATA.vote.question}
            </h2>
            <div className="flex flex-col gap-3">
              {BOARD_DATA.vote.options.map(option => {
                const totalVotes = BOARD_DATA.vote.options.reduce((acc, curr) => acc + curr.votes, 0) + (votedId ? 1 : 0);
                const isVoted = votedId === option.id;
                const currentVotes = option.votes + (isVoted ? 1 : 0);
                const percent = Math.round((currentVotes / totalVotes) * 100) || 0;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => setVotedId(option.id)}
                    className={`relative overflow-hidden w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isVoted ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400 bg-white'
                    }`}
                  >
                    {votedId && (
                      <div 
                        className="absolute top-0 left-0 bottom-0 bg-gray-200/50 transition-all duration-500 ease-out"
                        style={{ width: `${percent}%` }}
                      ></div>
                    )}
                    <div className="relative z-10 flex justify-between items-center">
                      <span className={`font-medium ${isVoted ? 'text-black' : 'text-gray-700'}`}>
                        {option.id}. {option.text}
                      </span>
                      {votedId && <span className="font-bold">{percent}%</span>}
                    </div>
                  </button>
                );
              })}
            </div>
            {votedId && <p className="text-center text-sm text-gray-500 mt-6">투표해주셔서 감사합니다!</p>}
          </div>
        )}

        {activeTab === 'chat' && (
          <div>
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setChatType('Z')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  chatType === 'Z' ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                팩트형(Z)
              </button>
              <button
                onClick={() => setChatType('M')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  chatType === 'M' ? 'bg-pink-100 text-pink-700 border-2 border-pink-200' : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                공감형(M)
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {BOARD_DATA.chat[chatType].map(post => (
                <div key={post.id} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer bg-white">
                  <h3 className="text-lg md:text-xl font-medium mb-3">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <span className={`font-bold ${chatType === 'Z' ? 'text-blue-600' : 'text-pink-500'}`}>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'qna' && (
          <div>
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-center text-gray-600 font-medium">
              💡 {BOARD_DATA.qna.description}
            </div>
            <div className="flex flex-col gap-4">
              {BOARD_DATA.qna.posts.map(post => (
                <div key={post.id} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer bg-white">
                  <h3 className="text-lg md:text-xl font-medium mb-3">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <span className="font-medium text-gray-700">{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button id="write-post" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default BoardView;
