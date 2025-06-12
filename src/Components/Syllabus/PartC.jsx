// components/PartC.jsx (Aptitude)
import { useState } from 'react';
import SplashCursor from '../SplashCursor/SplashCursor';

const PartC = () => {
  const [markedItems, setMarkedItems] = useState([]);

  const toggleMark = (id) => {
    setMarkedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const syllabus = [
    {
      id: 'unit1',
      title: 'UNIT I: APTITUDE (15 Questions)',
      content: [
        'Simplification - Percentage',
        'Highest Common Factor (HCF) - Lowest Common Multiple (LCM)',
        'Ratio and Proportion',
        'Simple interest - Compound interest',
        'Area - Volume - Time and Work'
      ]
    },
    {
      id: 'unit2',
      title: 'UNIT II: REASONING (10 Questions)',
      content: [
        'Logical reasoning - Puzzles',
        'Dice - Visual reasoning',
        'Alpha numeric reasoning',
        'Number series'
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      {/* <SplashCursor /> */}
      <h2 className="text-xl font-bold mb-6 text-center text-purple-700">
        Aptitude & Mental Ability (Part C)
      </h2>
      
      <div className="space-y-6">
        {syllabus.map((unit) => (
          <div key={unit.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">{unit.title}</h3>
            <ul className="space-y-2">
              {unit.content.map((item, index) => (
                <li 
                  key={index}
                  onClick={() => toggleMark(`${unit.id}-${index}`)}
                  className={`flex items-start cursor-pointer pl-2 py-1 rounded ${
                    markedItems.includes(`${unit.id}-${index}`) 
                      ? 'line-through text-gray-500 bg-gray-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2 text-gray-500">•</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartC;