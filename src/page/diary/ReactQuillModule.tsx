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
