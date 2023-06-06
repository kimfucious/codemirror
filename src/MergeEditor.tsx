import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { EditorState } from "@codemirror/state";
import { EditorView } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import CodeMirrorMerge from "react-codemirror-merge";
import { solarizedLight } from "@uiw/codemirror-theme-solarized";
import { oneDark } from "@codemirror/theme-one-dark";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { Scene } from "./reducers/AppReducer";
import { ActionType } from "./types";

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export default function MergeEditor() {
    const { app } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const [changedText, setChangedText] = useState("");
    const [isDark, setIsDark] = useState(true);

    const { original, modified } = useMemo(() => {
        const original = app.activeScene?.text;
        const modified = app.draftActiveSceneText;
        return { original, modified };
    }, [app.activeScene, app.draftActiveSceneText]);

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
                    backgroundColor: isDark
                        ? "#282c34 !important"
                        : "#fdf6e3 !important",
                },
            },
            {
                dark: isDark,
            }
        );
        const theme = isDark ? [oneDark] : [solarizedLight];
        return { defaultThemeOptions, theme };
    }, [isDark]);

    return (
        <div className="container d-flex flex-column align-items-center w-100 vh-100">
            <div className="d-flex align-items-center justify-content-between w-100 mb-3 py-3 border-bottom border-danger">
                <div className="d-flex align-items-center">
                    <Button
                        className="text-decoration-none text-muted"
                        onClick={() =>
                            dispatch({
                                type: ActionType.SET_IS_DIFFING,
                                payload: false,
                            })
                        }
                        size="sm"
                        variant="link"
                    >
                        cancel
                    </Button>
                </div>
                <div className="d-flex align-items-center">
                    <Button
                        className="ms-2"
                        onClick={() => {
                            dispatch({ type: ActionType.ABANDON_CHANGES });
                        }}
                        size="sm"
                        variant="danger"
                    >
                        Abandon Changes
                    </Button>
                    <Button
                        className="ms-2"
                        disabled={!app.activeScene || !changedText}
                        onClick={() => {
                            dispatch({
                                type: ActionType.SAVE_CHANGES,
                                payload: {
                                    ...app.activeScene,
                                    text: changedText,
                                },
                            });
                        }}
                        size="sm"
                        variant="primary"
                    >
                        Save Changes
                    </Button>
                    <Button
                        className="d-flex align-items-center justify-content-center ms-2"
                        onClick={() => setIsDark(!isDark)}
                        size="sm"
                        variant={isDark ? "dark" : "light"}
                    >
                        <span>Switch to {isDark ? "Light" : "Dark"}</span>
                    </Button>
                </div>
            </div>
            <CodeMirrorMerge
                className="w-100"
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
                        EditorView.contentAttributes.of({ spellcheck: "true" }),
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
                        EditorState.readOnly.of(true),
                    ]}
                />
            </CodeMirrorMerge>
        </div>
    );
}
