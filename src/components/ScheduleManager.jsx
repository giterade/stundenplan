import React, { useState } from 'react';
import './ScheduleManager.css';

const ScheduleManager = ({
  schedules,
  currentScheduleId,
  onCreateSchedule,
  onDeleteSchedule,
  onSelectSchedule,
  onExport,
  onImport,
}) => {
  const [newScheduleName, setNewScheduleName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleCreateSchedule = () => {
    if (newScheduleName.trim()) {
      onCreateSchedule(newScheduleName);
      setNewScheduleName('');
      setShowForm(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateSchedule();
    } else if (e.key === 'Escape') {
      setShowForm(false);
    }
  };

  return (
    <div className="schedule-manager">
      <h3>📋 Stundenpläne</h3>

      {!showForm ? (
        <button
          className="create-schedule-btn"
          onClick={() => setShowForm(true)}
        >
          + Neuer Stundenplan
        </button>
      ) : (
        <div className="create-form">
          <input
            type="text"
            placeholder="Name des Stundenplans..."
            value={newScheduleName}
            onChange={(e) => setNewScheduleName(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
          />
          <div className="form-buttons">
            <button
              className="confirm-btn"
              onClick={handleCreateSchedule}
            >
              ✓
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setNewScheduleName('');
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="schedule-list">
        {schedules.length === 0 ? (
          <p className="empty-message">Keine Stundenpläne vorhanden</p>
        ) : (
          schedules.map(schedule => (
            <div
              key={schedule.id}
              className={`schedule-item ${
                currentScheduleId === schedule.id ? 'active' : ''
              }`}
            >
              <div
                className="schedule-item-content"
                onClick={() => onSelectSchedule(schedule.id)}
              >
                <span className="schedule-name">{schedule.name}</span>
                <span className="schedule-date">
                  {new Date(schedule.createdAt).toLocaleDateString('de-DE')}
                </span>
              </div>
              <div className="schedule-actions">
                <button
                  className="action-btn export-btn"
                  onClick={() => onExport()}
                  title="Exportieren"
                  disabled={currentScheduleId !== schedule.id}
                >
                  ⬇
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => {
                    if (window.confirm(`Stundenplan "${schedule.name}" wirklich löschen?`)) {
                      onDeleteSchedule(schedule.id);
                    }
                  }}
                  title="Löschen"
                >
                  🗑
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="import-section">
        <label className="import-label">
          ⬆ Importieren
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};

export default ScheduleManager;
