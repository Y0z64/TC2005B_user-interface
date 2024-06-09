import { useRef, useEffect, useState, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import Swal from "sweetalert2";

type Props = {
  files: File[];
  onUpload: (files: File[]) => void;
  onDelete: (index: number) => void;
  count: number;
  formats: string[];
};

export function FileDrag({ files, onUpload, onDelete, count, formats }: Props) {
  const dropContainer = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  function processFiles(files: File[]) {
    const allFilesValid = files.every((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return formats.includes(extension || "");
    });

    if (files.length >= count) {
      showAlert(
        "warning",
        "Maximum Files",
        `Only ${count} files can be uploaded`
      );
      return;
    }
    if (!allFilesValid) {
      showAlert(
        "warning",
        "Invalid File",
        `Invalid file format. Please only upload ${formats
          .join(", ")
          .toUpperCase()}`
      );
      return;
    }
    if (count && count < files.length) {
      showAlert(
        "error",
        "Error",
        `Only ${count} file${count !== 1 ? "s" : ""} can be uploaded at a time`
      );
      return;
    }

    if (files && files.length) {
      Promise.all(files).then((newFiles) => {
        onUpload(newFiles);
        TopNotification.fire({
          icon: "success",
          title: "Files(s) uploaded",
        });
      });
    }
  }

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const files = [...e.target.files];

    processFiles(files);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (!e.dataTransfer) {
      return;
    }

    const files = [...e.dataTransfer.files];

    processFiles(files);
  }

  useEffect(() => {
    function handleDragOver(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    }
    function handleDragLeave(e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }

    const current = dropContainer.current;

    if (current) {
      current.addEventListener("dragover", handleDragOver);
      current.addEventListener("drop", handleDrop);
      current.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      if (current) {
        current.removeEventListener("dragover", handleDragOver);
        current.removeEventListener("drop", handleDrop);
        current.removeEventListener("dragleave", handleDragLeave);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const TopNotification = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  function showAlert(
    icon: "success" | "error" | "warning" | "info" | "question",
    title: string,
    text: string
  ) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      width: 500,
      timer: 1500,
    });
  }

  return (
    <div className="w-full flex flex-col h-fit">
      <div
        className={`${
          dragging
            ? "border border-[#2B92EC] bg-[#EDF2FF]"
            : "border-dashed border-[#e0e0e0]"
        } flex items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5 w-full`}
        ref={dropContainer}
      >
        <div className="flex-1 flex flex-col">
          <div className="mx-auto text-gray-400 mb-2">
            <Upload size={18} />
          </div>
          <div className="text-[12px] font-normal text-gray-500">
            <input
              className="opacity-0 hidden"
              type="file"
              multiple
              ref={fileRef}
              onChange={(e) => handleUpload(e)}
            />
            <span
              className="text-[#4070f4] cursor-pointer"
              onClick={() => {
                fileRef.current && fileRef.current.click();
              }}
            >
              Click to upload
            </span>{" "}
            or drag and drop
          </div>
          <div className="text-[10px] font-normal text-gray-500">
            Only two files PNG, JPG or JPEG
          </div>
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-4">
          {files.map((file, index) => (
            <div className="w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3">
              <div className="flex justify-between">
                <div className="w-[70%] flex justify-start items-center space-x-2">
                  <div className=" space-y-1">
                    <div className="text-xs font-medium text-gray-500">
                      {file.name}
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                      file.size / 1024
                    )} KB`}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="space-y-1">
                    <div
                      className="text-gray-500 text-[17px] cursor-pointer"
                      onClick={() => onDelete(index)}
                    >
                      <X className="ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">
                      Done
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
