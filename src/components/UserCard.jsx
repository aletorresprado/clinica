import React from "react";

const UserCard = ({ user, onApprove, onReject }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center border">
      <div>
        <p className="font-semibold">{user.nombre}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
        <span className="text-xs text-blue-600">{user.rol}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onApprove(user.id)}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
        >
          Aprobar
        </button>
        <button
          onClick={() => onReject(user.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default UserCard;
