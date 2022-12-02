import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {

  const details = () => {
    alert("sdded");
  }

  return (
    <div className="container col-9">
      <h3 className="text-center text-light rounded col-8 m-auto p-2 my-5 sectionTitle">Your Calender</h3>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        dateClick={details}
        events={[
          { title: "Math Lec", date: "2022-11-12" },
          { title: "React", date: "2022-11-13" },
          { title: "Angular", date: "2022-11-14" },
        ]}
      />
    </div>
  );
}
