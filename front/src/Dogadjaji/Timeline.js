 
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css'; 
import './Timeline.css';
import useFetchEvents from '../kuke/useFetchEvents';

const Timeline = () => {
  const { events, loading, error } = useFetchEvents();

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Event Timeline</h2>
      <VerticalTimeline>
        {events.map(event => (
          <VerticalTimelineElement
            key={event.id}
            date={`${event.event_date.split('T')[0]} ${event.start_time.split('T')[1]} - ${event.end_time.split('T')[1]}`}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">{event.name}</h3>
            <h4 className="vertical-timeline-element-subtitle">{event.location}</h4>
            <p>{event.description}</p>
            
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
