// components/PartB.jsx (General Studies)
import { useState } from "react";
import SplashCursor from "../SplashCursor/SplashCursor";

const PartB = () => {
  const [markedItems, setMarkedItems] = useState([]);

  const toggleMark = (id) => {
    setMarkedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const syllabus = [
    {
      id: "unit1",
      title: "UNIT I: GENERAL SCIENCE ",
      content: [
        "Scientific knowledge and scientific temper",
        "Nature of universe - General scientific laws",
        "Mechanics - Properties of matter, force, motion, and energy",
        "Elements and compounds, acids, bases, salts",
        "Main concepts of life science, classification of living organisms",
        "Environment and ecology; Latest inventions in science and technology",
      ],
    },
    {
      id: "unit2",
      title: "UNIT II: GEOGRAPHY OF INDIA (5 Questions)",
      content: [
        "Location - Physical features",
        "Monsoon, rainfall, weather and climate - Water resources - Rivers in India",
        "Soil, Minerals and Natural Resources - Forest and Wildlife",
        "Agricultural pattern; Transport – Communication",
        "Social Geography – Population density and distribution",
        "Racial, linguistic groups and major tribes",
        "Natural calamity - Disaster management",
        "Environmental pollution - Reasons and preventive measures",
        "Climate change - Green energy",
        "Geographical landmarks; Current affairs",
      ],
    },
    {
      id: "unit3",
      title:
        "UNIT III: HISTORY, CULTURE AND INDIAN NATIONAL MOVEMENT (10 Questions)",
      content: [
        "Indus Valley Civilization - Guptas, Delhi Sultans, Mughals, and Marathas",
        "Age of Vijayanagaram and Bahmani Kingdoms - South Indian History",
        "National Renaissance - Early uprising against British rule",
        "Indian National Congress - Emergence of national leaders",
        "Different modes of agitation: Satyagraha and Militant Movements",
        "Communalism and Partition",
        "Characteristics of Indian Culture, Unity in Diversity",
        "India as a secular state, Social harmony",
        "Prominent personalities in Arts, Science, Literature and Philosophy",
        "Social reform movements and their impact",
      ],
    },
    {
      id: "unit4",
      title: "UNIT IV: INDIAN POLITY (15 Questions)",
      content: [
        "Constitution of India - Preamble - Salient features",
        "Union, State and Union Territory - Citizenship",
        "Fundamental Rights, Fundamental Duties, Directive Principles",
        "Union Executive, Union Legislature - State Executive, Legislature",
        "Local Governments, Panchayat Raj",
        "Centre-State relationships - Federalism",
        "Election - Judiciary in India – Rule of Law",
        "Anti-corruption measures - Lokpal and Lok Ayukta",
        "Right to Information - Empowerment of Women",
        "Consumer Protection Forums, Human Rights Charter",
        "Political parties and political system in India",
        "Current affairs in Indian Polity",
      ],
    },
    {
      id: "unit5",
      title: "UNIT V: INDIAN ECONOMY & TAMIL NADU DEVELOPMENT (20 Questions)",
      content: [
        "Nature of Indian Economy – Five-year plans",
        "Planning Commission and Niti Aayog",
        "Fiscal Policy and Monetary Policy - RBI",
        "Finance Commission - Resource sharing",
        "Goods and Services Tax (GST)",
        "Employment Generation, Land Reforms",
        "Application of Science in Agriculture",
        "Industrial growth - Rural welfare programmes",
        "Social problems - Population, Education, Health",
        "Human Development Indicators - TN comparison",
        "Impact of social reform movements in TN",
        "Welfare schemes for various sections",
        "Reservation policy and social justice",
        "Economic trends in Tamil Nadu",
        "Education and health systems in TN",
        "Geography of TN and economic growth",
        "Achievements of Tamil Nadu",
        "e-Governance in Tamil Nadu",
        "Public awareness and General administration",
        "Current socio-economic issues",
      ],
    },
    // Continue with all units...
    {
      id: "unit6",
      title:
        "UNIT VI: HISTORY, CULTURE, HERITAGE, AND SOCIO-POLITICAL MOVEMENTS IN TAMIL NADU (20 Questions)",
      content: [
        "History of Tamil Society, related archaeological discoveries",
        "Tamil literature from Sangam age till contemporary times",
        "Thirukkural - Significance as a secular literature",
        "Relevance to everyday life, Impact on humanity",
        "Role of Tamil Nadu in freedom struggle",
        "Evolution of 19th and 20th century socio-political movements",
        "Contributions of Thanthai Periyar and Perarignar Anna",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      {/* <SplashCursor /> */}
      <h2 className="text-xl font-bold mb-6 text-center text-green-700">
        General Studies (Part B)
      </h2>

      <div className="space-y-6">
        {syllabus.map((unit) => (
          <div
            key={unit.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              {unit.title}
            </h3>
            <ul className="space-y-2">
              {unit.content.map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleMark(`${unit.id}-${index}`)}
                  className={`flex items-start cursor-pointer pl-2 py-1 rounded ${
                    markedItems.includes(`${unit.id}-${index}`)
                      ? "line-through text-gray-500 bg-gray-100"
                      : "hover:bg-gray-50"
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

export default PartB;
