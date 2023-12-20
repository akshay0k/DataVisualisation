import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StudentChart from "./components/studentChart";

const App = () => {
  const [students, setStudents] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    mark: "",
    dob: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    plotGraph(students);
  }, [students]);

  const plotGraph = (data) => {
    const seriesData = data.map((student) => ({
      name: student.name,
      y: parseFloat(student.mark),
    }));

    const newChartOptions = {
      chart: {
        type: "bar",
        style: {
          fontFamily: "Arial, sans-serif",
        },
      },
      title: {
        text: "Comparison of Student Marks",
      },
      xAxis: {
        categories: data.map((student) => student.name),
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: {
          text: "Marks",
        },
        max: 100,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            enabled: true,
            format: "{point.y}",
          },
        },
      },
      series: [
        {
          name: "Marks",
          data: seriesData,
        },
      ],
    };

    setChartOptions(newChartOptions);
  };

  const fetchData = () => {
    const studentData = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(studentData);
    updateChart(studentData);
  };

  const updateChart = (data) => {
    const chartOptions = {
      chart: {
        type: "bar",
        style: {
          fontFamily: "Arial, sans-serif",
        },
      },
      title: {
        text: "Comparison of Student Marks",
      },
      xAxis: {
        categories: data.map((student) => student.name),
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yAxis: {
        title: {
          text: "Marks",
        },
        max: 100,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            enabled: true,
            format: "{point.y}",
          },
        },
      },
      series: [
        {
          name: "Marks",
          data: data.map((student) => student.mark),
        },
      ],
    };
    setChartOptions(chartOptions);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editMode && editStudentId !== null) {
      handleUpdate(editStudentId, formData);
    } else {
      const name = formData.name;
      const subject = formData.subject;
      const mark = Math.min(Number(formData.mark), 100);
      const dob = formData.dob;

      const newStudent = { id: Date.now(), name, subject, mark, dob };
      const updatedStudents = [...students, newStudent];
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      setFormData({
        name: "",
        subject: "",
        mark: "",
        dob: "",
      });
      updateChart(updatedStudents);
    }

    setEditMode(false);
    setEditStudentId(null);
  };

  const handleUpdate = (studentId, updatedData) => {
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, ...updatedData };
      }

      return student;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setStudents(updatedStudents);
    setFormData({
      name: "",
      subject: "",
      mark: "",
      dob: "",
    });
    updateChart(updatedStudents);
    setEditMode(false);
    setEditStudentId(null);
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    updateChart(updatedStudents);
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setEditStudentId(student.id);
    setFormData({
      name: student.name,
      subject: student.subject,
      mark: student.mark,
      dob: student.dob,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Add Data</h1>

      <StudentForm
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
        handleFormSubmit={handleFormSubmit}
      />

      <h2 className="text-2xl font-bold mb-2 text-indigo-700"> Records</h2>

      <StudentTable
        students={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <h2 className="text-2xl font-bold my-4 text-indigo-700">Chart</h2>

      <StudentChart chartOptions={chartOptions} />
    </div>
  );
};

export default App;
