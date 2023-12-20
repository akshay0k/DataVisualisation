import React from "react";

const StudentTable = ({ students, handleEdit, handleDelete }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Subject</th>
          <th className="p-2">Mark</th>
          <th className="p-2">Date of Birth</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className="p-2">{student.name}</td>
            <td className="p-2">{student.subject}</td>
            <td className="p-2">{student.mark}</td>
            <td className="p-2">{student.dob}</td>
            <td className="p-2">
              <button
                onClick={() => handleEdit(student)}
                className="mr-2 p-2 bg-yellow-500 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
