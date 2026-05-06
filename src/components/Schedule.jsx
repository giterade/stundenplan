import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Schedule.css';

const Schedule = ({ schedule, subjects, onUpdateSchedule }) => {
  const hours = Array.from({ length: 9 }, (_, i) => 8 + i);
  const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  const getSubjectName = (subjectId) => {
    return subjects.find(s => s.id === subjectId)?.name || 'Unbekannt';
  };

  const getSubjectColor = (subjectId) => {
    return subjects.find(s => s.id === subjectId)?.color || '#e0e0e0';
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newSchedule = { ...schedule };
    const sourceKey = source.droppableId;
    const destKey = destination.droppableId;

    // Remove from source
    if (newSchedule[sourceKey]?.[source.index]) {
      newSchedule[sourceKey][source.index] = null;
    }

    // Add to destination
    if (!newSchedule[destKey]) {
      newSchedule[destKey] = [];
    }
    newSchedule[destKey][destination.index] = draggableId;

    onUpdateSchedule(newSchedule);
  };

  const handleClearSlot = (dayIndex, hourIndex) => {
    const key = `day${dayIndex}hour${hourIndex}`;
    const newSchedule = { ...schedule };
    newSchedule[key] = null;
    onUpdateSchedule(newSchedule);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="schedule-grid">
        <div className="schedule-header">
          <div className="time-cell"></div>
          {days.map((day, idx) => (
            <div key={idx} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {hours.map((hour, hourIdx) => (
          <div key={hour} className="schedule-row">
            <div className="time-cell">
              <span>{hour}:00</span>
            </div>

            {days.map((day, dayIdx) => {
              const slotKey = `day${dayIdx}hour${hourIdx}`;
              const subjectId = schedule[slotKey];
              const hasSubject = !!subjectId;

              return (
                <Droppable key={slotKey} droppableId={slotKey}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`schedule-cell ${
                        snapshot.isDraggingOver ? 'dragging-over' : ''
                      } ${hasSubject ? 'has-subject' : ''}`}
                    >
                      {hasSubject ? (
                        <div
                          className="subject-slot"
                          style={{
                            backgroundColor: getSubjectColor(subjectId),
                          }}
                          onDoubleClick={() => handleClearSlot(dayIdx, hourIdx)}
                          title="Doppelklick zum Löschen"
                        >
                          <Draggable draggableId={subjectId} index={hourIdx}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`draggable-subject ${
                                  snapshot.isDragging ? 'dragging' : ''
                                }`}
                              >
                                {getSubjectName(subjectId)}
                              </div>
                            )}
                          </Draggable>
                        </div>
                      ) : (
                        <div className="empty-slot">Frei</div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Schedule;
