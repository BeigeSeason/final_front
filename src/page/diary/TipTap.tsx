// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import { TextStyle } from "@tiptap/extension-text-style";
// import { Color } from "@tiptap/extension-color";
// import Underline from "@tiptap/extension-underline";
// import Code from "@tiptap/extension-code";
// import CodeBlock from "@tiptap/extension-code-block";
// import ListItem from "@tiptap/extension-list-item";
// import { Image } from "@tiptap/extension-image";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useState } from "react";

interface ToolBarProps {
  editor?: Editor | null;
}

// https://velog.io/@gaoridang/tiptap%EC%9C%BC%EB%A1%9C-React-rich-text-editor-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

export const TipTap: React.FC<ToolBarProps> = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color.configure({ types: [TextStyle.name] }), // TextStyle 확장과 연동
      Underline,
      Image,
      Placeholder.configure({
        placeholder: `- 학습 관련 질문을 남겨주세요. 상세히 작성하면 더 좋아요!
  - 마크다운, 단축키를 이용해서 편리하게 글을 작성할 수 있어요.
  - 먼저 유사한 질문이 있었는지 검색해보세요.
  - 서로 예의를 지키며 존중하는 문화를 만들어가요.
  - 서비스 운영 관련 문의는 홈페이지 우측 CS 메뉴를 이용해주세요.`,
      }),
    ],
    content: "",
  });

  if (!editor) {
    return null;
  }

  // 이미지 업로드
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        editor.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  // 색상 변경 처리
  const handleColorChange = (color: string) => {
    const colorMap: Record<string, string> = {
      black: "#000000",
      blue: "#228be6",
      red: "#fa5252",
      green: "#00C471",
      yellow: "#ffff00",
      gray: "#868e96",
    };
    const selectedColor = colorMap[color];
    editor.chain().focus().setColor(selectedColor).run();
    setDropdownVisible(false);
  };

  const headingLevels = [1, 2, 3, 4, 5, 6];

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          // style={{ backgroundImage: "url(/images/tiptap/Editor_Toolbar_01_Bold.svg)" }}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          // style={{ backgroundImage: "url(/images/tiptap/Editor_Toolbar_02_Italic.svg)" }}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <select
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6,
              })
              .run()
          }
          value={
            headingLevels.find((level) =>
              editor.isActive("heading", { level })
            ) || ""
          }
        >
          <option value="" disabled>
            글씨 크기
          </option>
          {headingLevels.map((level) => (
            <option
              key={level}
              value={level}
              style={{ fontSize: `${14 + level * 2}px` }}
            >
              본문{level}
            </option>
          ))}
        </select>
        {/* <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          Purple
        </button>
        {/* <button
          // style={{ backgroundImage: "url(/images/tiptap/Editor_Toolbar_05_TextColor.svg)", backgroundSize: "80%" }}
          onClick={() => setDropdownVisible(!isDropdownVisible)}
        />
        {isDropdownVisible && (
          <div className="dropdown-menu">
            {["black", "blue", "red", "green", "yellow", "gray"].map(
              (color, index) => (
                <button
                  key={color}
                  // style={{
                  //   backgroundColor: "#fff",
                  //   backgroundImage: `url(/images/tiptap/Editor_Toolbar_05_0${index + 1}_${capitalizeFirstLetter(color)}.svg)`,
                  //   backgroundSize: "80%",
                  //   backgroundPosition: "center",
                  //   backgroundRepeat: "no-repeat",
                  // }}
                  onClick={() => handleColorChange(color)}
                />
              )
            )}
          </div>
        )} */}
        <label htmlFor="upload-image" className="upload-button" />
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        {/* <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        코드 블록
      </button>
      <button
        onClick={() => {
          const url = prompt("링크 URL을 입력하세요:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        링크 추가
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        왼쪽 정렬
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        가운데 정렬
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        오른쪽 정렬
      </button>

      {/* 에디터 */}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
