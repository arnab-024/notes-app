import React from "react";
import "./index.css";
import { Trash } from "lucide-react";

const App = () => {
  const [title, setTitle] = React.useState("");

  const [edit, setEdit] = React.useState(null);

  const [details, setDetails] = React.useState("");
  const [task, setTask] = React.useState(() => {
    const data = localStorage.getItem("Notes");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  });

  const deleteNote = (index) => {
    console.log("Note Deleted");
    const copyTask = [...task];
    copyTask.splice(index, 1);
    setTask(copyTask);
    localStorage.setItem("Notes", JSON.stringify(copyTask));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const copyTask = [...task];

    if (edit !== null) {
      copyTask[edit] = { title, details };
      setEdit(null);
    } else {
      copyTask.push({ title, details });
    }

    setTask(copyTask);
    localStorage.setItem("Notes", JSON.stringify(copyTask));
    alert("Form Submitted Successfully");
    setTitle("");
    setDetails("");
  };
  return (
    <div className="bg-black text-white lg:flex h-screen">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex gap-4 lg:w-1/2 p-10 flex-col items-start"
      >
        <h1 className="text-4xl mb-2 font-bolder">Enter Notes🔽</h1>
        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full font-medium py-2 border-2 outline-none rounded h-25"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(title);
          }}
        />
        <textarea
          type="text"
          placeholder="Write Details"
          className="px-5 w-full font-medium h-32 py-2 flex items-start flex-row border-2 outline-none rounded"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            console.log(details);
          }}
        />
        <button
          className="bg-white active:scale-95 font-bolder w-full outline-none text-black px-5 py-2 rounded"
          type="submit"
        >
          {edit !== null ? "Update Note" : "Add Notes"}
        </button>
      </form>
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-4xl font-bold">Your Notes</h1>
        <div className="flex flex-wrap items-start justify-start gap-5 mt-6 h-[90%] overflow-auto">
          {task.map(function (element, index, array) {
            return (
              <div
                key={index}
                className="max-w-xs w-auto bg-cover bg-center py-8 px-5 rounded-2xl text-black bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] shadow-lg"
              >
                <button
                  onClick={() => {
                    deleteNote(index);
                  }}
                  className="p-2 cursor-pointer active:scale-95 mr-5"
                >
                  <Trash />
                </button>
                <button
                  onClick={() => {
                    setTitle(element.title);
                    setDetails(element.details);
                    setEdit(index);
                  }}
                  className="p-2 cursor-pointer active:scale-95 mb-7 underline text-lg font-medium"
                >
                  Edit
                </button>
                <h3 className="text-lg font-bold mb-2">{element.title}</h3>
                <p className="text-lg text-gray-700 break-all">
                  {element.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
