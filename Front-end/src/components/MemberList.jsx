import React from 'react';
import Loading from '../components/Loading'; // Make sure you have this component

export default function MemberList({ members, isLoading, error, onAccept, onRemove }) {

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loading /></div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }
  
  if (members.length === 0) {
    return <div className="text-center p-8 text-gray-500">No members found.</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">S.No</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Roll No</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Phone</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 text-gray-700">{String(index + 1).padStart(2, '0')}</td>
              <td className="p-4 text-gray-700">{member.name}</td>
              <td className="p-4 text-gray-700">{member.rollNo}</td>
              <td className="p-4 text-gray-700">{member.email}</td>
              <td className="p-4 text-gray-700">{member.phone || 'N/A'}</td>
              <td className="p-4">
                {member.status === 'pending' ? (
                  <button
                    onClick={() => onAccept(member._id)}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    Accept
                  </button>
                ) : (
                  <button
                    onClick={() => onRemove(member._id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}