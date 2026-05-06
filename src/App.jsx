import React, { useState, useEffect } from 'react';
import Schedule from './components/Schedule';
import SubjectManager from './components/SubjectManager';
import ScheduleManager from './components/ScheduleManager';
import './App.css';

const App = () => {
  const [schedules, setSchedules] = useState([]);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [subjects, setSubjects] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSchedules = localStorage.getItem('schedules');
    const savedSubjects = localStorage.getItem('subjects');
    const savedCurrentId = localStorage.getItem('currentScheduleId');

    if (savedSchedules) {
      const parsed = JSON.parse(savedSchedules);
      setSchedules(parsed);
      const id = savedCurrentId || parsed[0]?.id;
      setCurrentScheduleId(id);
    }

    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  // Save schedules to localStorage
  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  // Save subjects to localStorage
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  // Save current schedule ID to localStorage
  useEffect(() => {
    if (currentScheduleId) {
      localStorage.setItem('currentScheduleId', currentScheduleId);
    }
  }, [currentScheduleId]);

  const createSchedule = (name) => {
    const newSchedule = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
    };
    setSchedules([...schedules, newSchedule]);
    setCurrentScheduleId(newSchedule.id);
  };

  const deleteSchedule = (id) => {
    const newSchedules = schedules.filter(s => s.id !== id);
    setSchedules(newSchedules);
    if (currentScheduleId === id) {
      setCurrentScheduleId(newSchedules[0]?.id || null);
    }
  };

  const selectSchedule = (id) => {
    setCurrentScheduleId(id);
  };

  const updateSchedule = (updatedData) => {
    setSchedules(
      schedules.map(s =>
        s.id === currentScheduleId
          ? { ...s, ...updatedData }
          : s
      )
    );
  };

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const deleteSubject = (id) => {
    // Remove subject from all schedules
    const newSchedules = schedules.map(schedule => {
      const newSchedule = { ...schedule };
      Object.keys(newSchedule).forEach(key => {
        if (newSchedule[key] === id) {
          newSchedule[key] = null;
        }
      });
      return newSchedule;
    });
    setSchedules(newSchedules);
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const exportSchedule = () => {
    const current = schedules.find(s => s.id === currentScheduleId);
    if (!current) return;

    const data = {
      schedule: current,
      subjects,
      exportedAt: new Date().toISOString(),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${current.name}-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSchedule = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const { schedule: importedSchedule, subjects: importedSubjects } = data;

        if (importedSchedule && importedSubjects) {
          const newId = Date.now().toString();
          const newSchedule = { ...importedSchedule, id: newId };

          setSchedules([...schedules, newSchedule]);
          setSubjects(importedSubjects);
          setCurrentScheduleId(newId);
        }
      } catch (error) {
        alert('Fehler beim Importieren: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const currentSchedule = schedules.find(s => s.id === currentScheduleId);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <ScheduleManager
          schedules={schedules}
          currentScheduleId={currentScheduleId}
          onCreateSchedule={createSchedule}
          onDeleteSchedule={deleteSchedule}
          onSelectSchedule={selectSchedule}
          onExport={exportSchedule}
          onImport={importSchedule}
        />
        <SubjectManager
          subjects={subjects}
          onAddSubject={addSubject}
          onDeleteSubject={deleteSubject}
        />
      </aside>

      <main className="main-content">
        <div className="header">
          <h1>📅 Stundenplan Creator</h1>
          <p>Erstelle deinen persönlichen Stundenplan mit Drag & Drop</p>
        </div>

        <div className="schedule-container">
          {currentSchedule ? (
            <>
              <h2>{currentSchedule.name}</h2>
              <Schedule
                schedule={currentSchedule}
                subjects={subjects}
                onUpdateSchedule={updateSchedule}
              />
            </>
          ) : (
            <div className="no-schedule">
              <p>📋 Keine Stundenpläne vorhanden</p>
              <em>Erstelle einen neuen Stundenplan, um zu beginnen</em>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
