import { useState } from "react";

const Lessons = ({ lessons }) => {
  const [openLessonId, setOpenLessonId] = useState(null);

  const toggleLesson = (id) => {
    setOpenLessonId((prev) => (prev === id ? null : id));
  };

  if (lessons.length === 0) {
    return <p className="text-gray-500">No lessons added yet.</p>;
  }


  console.log(lessons)

  return (
    <ul className="space-y-3">
      {lessons.map((lesson) => (
        <li
          key={lesson.id}
          className="border rounded-lg p-4 cursor-pointer transition"
        >
          {/* Lesson title */}
          <div
            className="flex justify-between items-center"
            onClick={() => toggleLesson(lesson.id)}
          >
            <h3 className="font-medium text-lg text-gray-700">{lesson.title}</h3>
            <span className="text-gray-400">
              {openLessonId === lesson.id ? "▲" : "▼"}
            </span>
          </div>

          {/* Lesson content/video */}
          {openLessonId === lesson.id && (
            <div className="mt-4">
              {lesson.video_url ? (
  <video
    key={lesson.video_url}
    controls
    className="w-full rounded-md h-full"
  >
    <source src={lesson.video_url} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
) : (
  <p className="text-gray-600 text-sm">{lesson.content}</p>
)}

            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Lessons;
