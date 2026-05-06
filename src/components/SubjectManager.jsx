import React, { useState } from 'react';
import './SubjectManager.css';

const SubjectManager = ({ subjects, onAddSubject, onDeleteSubject }) => {
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#667eea');

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      onAddSubject({
        id: Date.now().toString(),
        name: newSubjectName,
        color: newSubjectColor,
      });
      setNewSubjectName('');
      setNewSubjectColor('#667eea');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  return (
    <div className="subject-manager">
      <h3>📚 Fächer</h3>

      <div className="add-subject-form">
        <input
          type="text"
          placeholder="Fachname..."
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="color"
          value={newSubjectColor}
          onChange={(e) => setNewSubjectColor(e.target.value)}
          title="Farbe auswählen"
        />
        <button className="add-btn" onClick={handleAddSubject}>
          + Hinzufügen
        </button>
      </div>

      <div className="subject-list">
        {subjects.length === 0 ? (
          <p className="empty-message">Keine Fächer vorhanden</p>
        ) : (
          subjects.map(subject => (
            <div key={subject.id} className="subject-item-card">
              <div
                className="subject-color-indicator"
                style={{ backgroundColor: subject.color }}
              />
              <span className="subject-name">{subject.name}</span>
              <button
                className="delete-btn"
                onClick={() => onDeleteSubject(subject.id)}
                title="Fach löschen"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectManager;
