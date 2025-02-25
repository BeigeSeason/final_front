import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
// StarterKit에 기본 기능 포함돼있음.
// 특정 기능을 변경하고 싶을때 개별 확장 사용 (ex. Bold는 strong태그 사용하는데 b태그 사용하고싶을때 커스텀)
// StarterKit: Document, Paragraph, Text, Bold, Italic, Strike(취소선), Code, Blockquote, HardBreak(줄바꿈),
// Heading(h1~h6), History(실행취소/재실행), HorizontalRule(<hr>), ListItem, BulletList, OrderedList, CodeBlock, GapCursor
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import { useState } from "react";
import {
  TipTapContainer,
  ToolContainer,
  ContentContainer,
} from "../../style/TipTapStyled";

import {
  FaBold,
  FaItalic,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaList,
  FaListOl,
  FaMinus,
  FaQuoteLeft,
  FaTextSlash,
} from "react-icons/fa6";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuList,
  LuListOrdered,
  LuBan,
  LuUndo2,
  LuRedo2,
  LuImage,
} from "react-icons/lu";
import { AiOutlineStrikethrough, AiOutlineFontColors } from "react-icons/ai";

interface ToolBarProps {
  editor?: Editor | null;
}

// https://velog.io/@gaoridang/tiptap%EC%9C%BC%EB%A1%9C-React-rich-text-editor-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

export const TipTap: React.FC<ToolBarProps> = () => {
  const [isColorToggleOpen, setIsColorToggleOpen] = useState<boolean>(false);
  const [isBGColorToggleOpen, setIsBGColorToggleOpen] =
    useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      StarterKit, // bold, italic, list 등 기본 편집기능 제공
      TextStyle, // 글자 스타일 확장
      FontSize.configure({ types: ["textStyle"] }), // 글자 크기 확장
      Color.configure({ types: [TextStyle.name] }), // TextStyle 확장과 연동
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({
        resizable: true, // 테이블 크기 조절 가능
      }),
      TableRow,
      TableCell,
      TableHeader,
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
  // const handleColorChange = (color: string) => {
  //   const colorMap: Record<string, string> = {
  //     black: "#000000",
  //     blue: "#228be6",
  //     red: "#fa5252",
  //     green: "#00C471",
  //     yellow: "#ffff00",
  //     gray: "#868e96",
  //   };
  //   const selectedColor = colorMap[color];
  //   editor.chain().focus().setColor(selectedColor).run();
  //   setDropdownVisible(false);
  // };
  const colorOptions = [
    { label: "Red", color: "red" },
    { label: "Blue", color: "blue" },
    { label: "Green", color: "green" },
    { label: "Yellow", color: "yellow" },
  ];

  const highlightOptions = [
    { label: "Yellow", color: "#ffc078" },
    { label: "Green", color: "#8ce99a" },
    { label: "Lightblue", color: "#74c0fc" },
  ];

  const textAlignOptions = [
    { align: "left", icon: <LuAlignLeft /> },
    { align: "center", icon: <LuAlignCenter /> },
    { align: "right", icon: <LuAlignRight /> },
  ];

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
          <LuBold />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("italic") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="기울이기"
        >
          <LuItalic />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("underline") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="밑줄"
        >
          <LuUnderline />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("strike") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="취소선"
        >
          <AiOutlineStrikethrough />
        </button>
        <div className="toggle-button-container">
          <button
            className="tool-button"
            onClick={() => setIsColorToggleOpen(!isColorToggleOpen)}
          >
            <AiOutlineFontColors />
          </button>
          {isColorToggleOpen && (
            <div className="tool-toggle">
              {colorOptions.map(({ label, color }) => (
                <button
                  key={color}
                  className="tool-button"
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                  }}
                >
                  <AiOutlineFontColors
                    className="toggle-element"
                    style={{ color }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {colorOptions.map(({ label, color }) => (
          <button
            key={color}
            onClick={() => {
              editor.chain().focus().setColor(color).run();
            }}
            style={{ backgroundColor: color }}
          >
            {label}
          </button>
        ))}
        {highlightOptions.map(({ label, color }) => (
          <button
            key={color}
            onClick={() => {
              editor.chain().focus().toggleHighlight({ color: color }).run();
            }}
          >
            {label}
          </button>
        ))}
        <button
          className="tool-button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="텍스트 스타일 제거"
        >
          <FaTextSlash />
        </button>
        <select
          className="select-font-size"
          onChange={(e) => {
            editor.chain().focus().setFontSize(e.target.value).run();
          }}
          defaultValue={"16px"}
        >
          <option value="12px">12</option>
          <option value="16px">16</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
        </select>
        <span className="separate-line">|</span>
        {textAlignOptions.map(({ align, icon }) => (
          <button
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={`tool-button ${
              editor.isActive("textAlign", { textAlign: align })
                ? "is-active"
                : ""
            }`}
          >
            {icon}
          </button>
        ))}
        <button
          className={`tool-button ${
            editor.isActive("bulletList") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <LuList />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("orderedList") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <LuListOrdered />
        </button>
        <button
          className={`tool-button ${
            editor.isActive("blockquote") ? "is-active" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="인용"
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
        <label htmlFor="upload-image" className="upload-button">
          <LuImage
            className={`tool-button ${
              editor?.isActive("image") ? "is-active" : ""
            }`}
          />
        </label>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          표 추가
        </button>
        {/* https://tiptap.dev/docs/editor/extensions/nodes/table */}
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
          열 추가 (왼쪽)
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          열 추가 (오른쪽)
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>
          행 추가 (위쪽)
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          행 추가 (아래쪽)
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
          열 삭제
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>
          행 삭제
        </button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>
          표 삭제
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
      </ToolContainer>

      <EditorContent className="tiptap-content" editor={editor} />
    </TipTapContainer>
  );
};
