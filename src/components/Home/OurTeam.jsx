import React from 'react';

const OurTeam = () => {
  const team = [
    { name: 'Sarah', role: 'Lead Stylist', image: '/path-to-image/sarah.webp' },
    { name: 'David', role: 'Makeup Artist', image: '/path-to-image/david.webp' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg my-8">
      <h2 className="text-center text-3xl font-bold mb-4">Meet Our Team</h2>
      <div className="flex space-x-4 overflow-auto">
        {team.map((member, index) => (
          <div key={index} className="flex-shrink-0 w-72 bg-MainBGColorYellow p-4 rounded-lg">
            <img src={member.image} alt={member.name} className="h-16 w-16 rounded-full mx-auto" />
            <h3 className="text-lg font-semibold text-center mt-2">{member.name}</h3>
            <p className="text-center text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
