import { Link } from "wouter";
import NavigationBar from "../components/shared/NavigationBar";
import { useState } from "react";
import { FileDrag } from "../components/FileDrag";
import Swal from "sweetalert2";

const beURL = import.meta.env.VITE_BACKEND_URL;

type FilesResponse = {
  files: {
    id: string;
    url: string;
  }[];
  success: boolean;
};

export default function Ask() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");

  function uploadFiles(f: File[]) {
    setFiles(f);
  }

  function deleteFile(fileIndex: number) {
    const updatedList = files.filter((ele, index) => index !== fileIndex);
    setFiles(updatedList);
  }

  async function sendFiles() {
    try {
      const fileUrls = files.map((file) => URL.createObjectURL(file));

      const response = await fetch(beURL + "/nearbyy" + `/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: fileUrls }),
      });
      const data: FilesResponse = await response.json();
      if (data.success) {
        Swal.fire({
          title: "Files uploaded",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "There was an error uploading the files",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  async function getResponse(message: string) {
    setLoading(true);
    try {
      console.log("fetching nearbyy response");
      const response = await fetch(beURL + "/nearbyy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      const result = await response.json();
      const prescription = await result.response;
      setRespuesta(prescription);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center overflow-auto">
      <NavigationBar>
        <Link href="/">
          <p>Dashboard</p>
        </Link>
        <Link href="/register">
          <p>Registro</p>
        </Link>
      </NavigationBar>
      <div className="flex flex-col h-full w-[40.625rem] justify-start items-center pt-6 p-4 ">
        <h1 className="mb-3">Ask a question</h1>
        <span className="text-xl">
          Has una pregunta a la base de conocimiento de Nearbyy o agrega un
          archivo
        </span>
        <span className="text-md text-yellow-400">
          No se pueden subir archivos desde host local
        </span>
        <div className="w-full h-full flex flex-col justify-start items-center mt-4">
          <h2 className="text-2xl w-full text-left -mb-2">Subir archivos</h2>
          <FileDrag
            files={files}
            onUpload={uploadFiles}
            onDelete={deleteFile}
            count={4}
            formats={["txt", "pdf", "md", "mdx", "doc", "docx", "html"]}
          />
          <button
            onClick={async () => {
              sendFiles();
            }}
            className="w-3/4 h-12 mt-2 mb-4 hover:bg-blue-500 hover:border-blue-500 transition-all"
          >
            Submit
          </button>
          <span className="text-2xl w-full text-left mb-2">Pregunta</span>
          <textarea
            name="pregunta"
            id="pregunta"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            className="w-full h-[12rem] overflow-auto justify-center bg-[#3D3D3D] rounded-xl p-2 hover:border-transparent mb-6"
          />
          <span className="text-2xl w-full text-left mb-2">Respuesta</span>
          <textarea
            name="output"
            id="output"
            value={loading ? "Loading..." : respuesta}
            readOnly
            className="w-full h-[12rem] overflow-auto justify-center bg-[#3D3D3D] rounded-xl p-2 hover:border-transparent"
          />
          <button
            onClick={async () => {
              getResponse(pregunta);
            }}
            className="w-3/4 h-12 mt-2 mb-4 hover:bg-blue-500 hover:border-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
