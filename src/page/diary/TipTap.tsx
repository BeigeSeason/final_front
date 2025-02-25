import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
// StarterKit에 기본 기능 포함돼있음.
// 특정 기능을 변경하고 싶을때 개별 확장 사용 (ex. Bold는 strong태그 사용하는데 b태그 사용하고싶을때 커스텀)
// StarterKit: Document, Paragraph, Text, Bold, Italic, Strike(취소선), Code, Blockquote, HardBreak(줄바꿈),
// Heading(h1~h6), History(실행취소/재실행), HorizontalRule(<hr>), ListItem, BulletList, OrderedList, CodeBlock, GapCursor
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";
import Underline from "@tiptap/extension-underline";

import { useState } from "react";
import { TipTapContainer, ToolContainer } from "../../style/TipTapStyled";

import {
  FaBold,
  FaItalic,
  FaList,
  FaListOl,
  FaMinus,
  FaQuoteLeft,
  FaTextSlash,
} from "react-icons/fa6";
import { LuBan, LuUndo2, LuRedo2 } from "react-icons/lu";

interface ToolBarProps {
  editor?: Editor | null;
}

// https://velog.io/@gaoridang/tiptap%EC%9C%BC%EB%A1%9C-React-rich-text-editor-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

export const TipTap: React.FC<ToolBarProps> = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      StarterKit, // bold, italic, list 등 기본 편집기능 제공
      TextStyle, // 글자 스타일 확장
      FontSize.configure({ types: ["textStyle"] }), // 글자 크기 확장
      Color.configure({ types: [TextStyle.name] }), // TextStyle 확장과 연동
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
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

  const textAlignOptions = ["left", "center", "right"];

  const addLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt("Enter the image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <TipTapContainer>
      <ToolContainer>
        <button
          className={`tool-button ${
            editor.isActive("bold") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="굵게"
        >
          <FaBold />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("italic") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="기울이기"
        >
          <FaItalic />
        </button>
        <button
          className="tool-button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="텍스트 스타일 제거"
        >
          <FaTextSlash />
        </button>
        <select
          onChange={(e) => {
            editor.chain().focus().setFontSize(e.target.value).run();
          }}
        >
          <option value="" disabled>
            글자 크기 선택
          </option>
          <option value="12px">12px</option>
          <option value="16px">16px(기본)</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="32px">32px</option>
        </select>
        <span className="separate-line">|</span>
        {textAlignOptions.map((align) => (
          <button
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={
              editor.isActive("textAlign", { textAlign: align })
                ? "is-active"
                : ""
            }
          >
            {align}
          </button>
        ))}
        <button
          className={`tool-button ${
            editor.isActive("bulletList") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          // className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaList />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("orderedList") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          // className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("blockquote") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          // className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FaQuoteLeft />
        </button>
        <button
          className="tool-button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="구분선"
        >
          <FaMinus />
        </button>
        <button
          className="tool-button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          title="문단 스타일 제거"
        >
          <LuBan />
        </button>
        <span className="separate-line">|</span>
        <button
          onClick={addImage}
          className={editor.isActive("image") ? "is-active" : ""}
        >
          Add Image
        </button>
        <span className="separate-line">|</span>
        <button
          className="tool-button"
          onClick={() => editor.chain().focus().undo().run()}
          title="되돌리기"
        >
          <LuUndo2 />
        </button>
        <button
          className="tool-button"
          onClick={() => editor.chain().focus().redo().run()}
          title="다시 실행"
        >
          <LuRedo2 />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          Purple
        </button> */}
        {/* <button
          // style={{ backgroundImage: "url(/images/tiptap/Editor_Toolbar_05_TextColor.svg)", backgroundSize: "80%" }}
          onClick={() => setDropdownVisible(!isDropdownVisible)}
        >
          다예님 색상
        </button>
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
      </ToolContainer>
      <EditorContent className="tiptap-content" editor={editor} />
    </TipTapContainer>
  );
};
