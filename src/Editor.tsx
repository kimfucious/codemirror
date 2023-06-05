import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { EditorState } from "@codemirror/state";
import { EditorView } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import CodeMirrorMerge from "react-codemirror-merge";
import { materialDarkInit } from "@uiw/codemirror-theme-material";
import { solarizedLightInit } from "@uiw/codemirror-theme-solarized";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHooks";
import { Scene } from "./reducers/AppReducer";

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export default function MergeEditor() {
  const { app } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [changedText, setChangedText] = useState("");
  const [isDark, setIsDark] = useState(true);

  const { original, modified } = useMemo(() => {
    const scene = app.scenes.find((item: Scene) => item.id === "123");
    let original = scene?.text;
    let modified = `${original}\n\n${isDark ? "dark" : "light"}`;
    return { original, modified };
  }, [app.scenes, isDark]);

  // const height = useMemo(() => {
  //     return `calc(100vh - ${sizes.totalHeightOffset + 32}px)`;
  // }, [sizes.totalHeightOffset]);

  function handleChange(str: string) {
    setChangedText(str);
  }

  const { defaultThemeOptions, theme } = useMemo(() => {
    const defaultThemeOptions = EditorView.theme(
      {
        "&": {
          background: isDark ? "#2e3235 !important" : "#2e3235 !important",
          backgroundColor: isDark ? "#2e3235 !important" : "#fdf6e3 !important",
          foreground: isDark ? "#bdbdbd !important" : "#657b83 !important",
          caret: isDark ? "#a0a4ae !important" : "#586e75 !important",
          selection: isDark ? "#d7d4f0 !important" : "#dfd9c8 !important",
          selectionMatch: isDark ? "#d7d4f0 !important" : "#dfd9c8 !important",
          gutterBackground: isDark
            ? "#2e3235 !important"
            : "#00000010 !important",
          gutterActiveBackground: isDark
            ? "#4f5b66 !important"
            : "#00000010 !important",
          gutterActiveForeground: isDark
            ? "#000 !important"
            : "#657b83 !important",
          gutterForeground: isDark
            ? // ? "#999 !important"
              "#ff69b4 !important"
            : "#657b83 !important",
          lineHighlight: isDark ? "#545b61 !important" : "#dfd9c8 !important"
        }
      },
      {
        dark: isDark
      }
    );
    const theme = isDark
      ? materialDarkInit({ theme: "dark" })
      : solarizedLightInit({ theme: "light" });
    return { defaultThemeOptions, theme };
  }, [isDark]);

  return (
    <div className="container d-flex flex-column align-items-center w-100">
      <CodeMirrorMerge
        className="w-100"
        gutter={false}
        highlightChanges
        orientation="a-b"
        revertControls="b-to-a"
      >
        <Original
          extensions={[
            vim({ status: false }),
            defaultThemeOptions,
            theme,
            markdown(),
            EditorView.lineWrapping,
            EditorView.contentAttributes.of({ spellcheck: "true" })
          ]}
          value={original}
          onChange={(str) => handleChange(str)}
        />
        <Modified
          value={modified}
          extensions={[
            vim({ status: false }),
            defaultThemeOptions,
            theme,
            markdown(),
            EditorView.lineWrapping,
            EditorView.editable.of(false),
            EditorState.readOnly.of(true)
          ]}
        />
      </CodeMirrorMerge>

      <div className="d-flex align-items-center my-5 w-100">
        <Button onClick={() => navigate("/other")} style={{ width: 200 }}>
          Page 2
        </Button>
        <Button
          className="d-flex align-items-center justify-content-center ms-2"
          onClick={() => setIsDark(!isDark)}
          style={{ width: 200 }}
          variant={isDark ? "dark" : "light"}
        >
          <i className="bi bi-trash" />
          <span className="ms-2">Switch to {isDark ? "Light" : "Dark"}</span>
        </Button>
      </div>
    </div>
  );
}
