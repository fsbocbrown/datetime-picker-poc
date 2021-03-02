import React, { useEffect, useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

const TimeButton = ({ time, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(time)}
      className={`block w-full rounded border text-sm px-6 py-2 ${
        selected ? "bg-blue-800 text-white" : "bg-gray-50"
      }`}
    >
      {time.label}
    </button>
  );
};

function Navbar({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) {
  return (
    <div
      className={"absolute w-full top-4 flex items-center justify-between pr-2"}
    >
      <button onClick={() => onPreviousClick()}>←</button>
      <button onClick={() => onNextClick()}>→</button>
    </div>
  );
}

export default function DateTimePicker() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [pickerStep, setPickerStep] = useState("times");

  useEffect(() => {
    setSelectedEndTime(null);
  }, selectedStartTime);

  var quarterHours = ["00", "15", "30", "45"];
  var times = [];
  for (var i = 9; i < 33; i++) {
    let hour = i === 0 ? "12" : i;
    if (hour > 12) {
      hour = i - 12;
    }

    if (hour > 12) {
      hour = i - 24;
    }
    for (var j = 0; j < 4; j++) {
      let label =
        hour + ":" + quarterHours[j] + (i < 12 || i > 23 ? " AM" : " PM");
      let time = {
        value: i + ":" + quarterHours[j],
        label,
      };
      times.push(time);
    }
  }

  const getSelectedIndex = () => {
    if (!selectedStartTime) return 0;
    return (
      times.findIndex(function (time) {
        return time.value == selectedStartTime.value;
      }) + 1
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {pickerStep === "day" && (
          <div>
            <div>
              <DayPicker
                onDayClick={setSelectedDay}
                selectedDays={[selectedDay]}
                navbarElement={<Navbar />}
              />
            </div>
            <div className="text-center p-4 h-20">
              {!!selectedDay && (
                <button
                  type="button"
                  onClick={() => setPickerStep("times")}
                  className="bg-blue-800 text-white rounded font-semibold px-4 py-2"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
        {pickerStep === "times" && (
          <div>
            <div className="text-center text-gray-400 flex items-center space-x-6">
              <label className="font-semibold flex items-center space-x-2 mb-12 text-black ">
                <button
                  type="button"
                  onClick={() => setPickerStep("day")}
                  className="border border-black rounded-full flex items-center justify-center w-8 h-8"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                    />
                  </svg>
                </button>
                <div className="leading-none">Select a day</div>
              </label>
            </div>

            <div>
              <div className="flex">
                <div className="w-40">
                  <div className="font-semibold">Start time</div>
                  <div className="overflow-y-auto max-h-72 space-y-2 px-2">
                    {times.map((time) => (
                      <TimeButton
                        key={`st-${time.value}`}
                        time={time}
                        selected={selectedStartTime?.value === time.value}
                        onClick={setSelectedStartTime}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-40">
                  <div className="font-semibold">End time</div>
                  <div className="overflow-y-auto max-h-72 space-y-2 px-3">
                    {times.slice(getSelectedIndex()).map((time) => (
                      <TimeButton
                        key={`et-${time.value}`}
                        time={time}
                        selected={selectedEndTime?.value === time.value}
                        onClick={setSelectedEndTime}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center p-4 h-20">
                {!!selectedEndTime && !!selectedStartTime && (
                  <button
                    type="button"
                    onClick={() => setPickerStep("notes")}
                    className="bg-blue-800 text-white rounded font-semibold px-4 py-2"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {pickerStep === "notes" &&
          selectedDay &&
          selectedStartTime &&
          selectedEndTime && (
            <div className="">
              <label className="font-semibold flex items-center space-x-2 mb-12">
                <button
                  type="button"
                  onClick={() => setPickerStep("times")}
                  className="border border-black rounded-full flex items-center justify-center w-8 h-8"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path
                      fill="currentColor"
                      d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                    />
                  </svg>
                </button>
                <div className="leading-none">Schedule an Open House</div>
              </label>
              <div className="text-sm">
                <div>Schedule:</div>
                <div className="w-full border rounded py-4 text-lg font-bold text-center">
                  <div>
                    <div>{selectedDay.toDateString()}</div>
                    <div>
                      {selectedStartTime.label} - {selectedEndTime.label}
                    </div>
                  </div>
                </div>
                <div>
                  <label>Notes</label>
                  <textarea
                    className="w-full border rounded bg-gray-50"
                    rows="5"
                  ></textarea>
                </div>
                <div className="text-center p-4 h-20">
                  <button
                    type="button"
                    onClick={() => setPickerStep("notes")}
                    className="bg-blue-800 text-white rounded font-semibold px-4 py-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
