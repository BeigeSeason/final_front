import ImageCompress from "quill-image-compress";
import Quill from "quill";
Quill.register("modules/imageCompress", ImageCompress);

export const modules = {
  toolbar: [
    // [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      // { list: "ordered" },
      // { list: "bullet" },
      // { indent: "-1" },
      // { indent: "+1" },
    ],
    // ["link", "image"],
    ["image"],
    ["clean"],
  ],
  imageCompress: {
    quality: 0.7, // 압축 품질 (0.7이 기본값, 0은 최대 압축, 1은 원본 품질)
    maxWidth: 800, // 이미지 최대 너비
    maxHeight: 800, // 이미지 최대 높이
    imageType: "image/jpeg", // 이미지 형식
  },
};

export const formats = [
  // "font",
  "size",
  // "header",
  "color",
  "background",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  // "bullet",
  "indent",
  // "link",
  "image",
];
