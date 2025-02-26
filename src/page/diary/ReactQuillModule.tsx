// import ImageCompress from "quill-image-compress";
// import Quill from "quill";
// Quill.register("modules/imageCompress", ImageCompress);
import ReactQuill, { Quill } from "react-quill-new";
import { ImageResize } from "quill-image-resize-module-ts";

// if (typeof window !== 'undefined' && window.Quill) {
//   window.Quill = Quill;
// } //2. Quill을 window 전역 객체에 할당하여 전역으로 사용

Quill.register("modules/ImageResize", ImageResize); //3.Quill 모듈을 등록

interface ReactQuillEditorProps {
  style?: any;
  value: string;
  onChange: (value: string) => void;
}

export const modules = {
  toolbar: [
    // [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
      { color: [] },
      { background: [] },
      "clean",
    ], // dropdown with defaults from theme
    [{ align: [] }, "blockquote"],
    [
      // [
      //   { list: "ordered" },
      //   { list: "bullet" },
      //   // { indent: "-1" },
      //   // { indent: "+1" },
      // ],
      // ["link", "image"],
      "image",
    ],
  ],
  ImageResize: {
    modules: ["Resize", "DisplaySize"],
  },
};

export const formats = [
  // "font",
  "size",
  // "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "align",
  "blockquote",
  // "list",
  // "bullet",
  // "indent",
  // "link",
  "image",
  "table",
];
