import React from "react";

const StudentForm = ({
  formData,
  setFormData,
  editMode,
  handleFormSubmit
}) => {
  return (
    <form onSubmit={handleFormSubmit} className="mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject:
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mark:
            <input
              type="number"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.mark}
              onChange={(e) =>
                setFormData({ ...formData, mark: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth:
            <input
              type="date"
              className="mt-1 p-2 border rounded-md w-full"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </label>
        </div>
      </div>
      <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded-md">
        {editMode ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default StudentForm;
