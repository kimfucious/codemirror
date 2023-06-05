import { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { EditorView } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { vim } from "@replit/codemirror-vim";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { Scene } from "./reducers/AppReducer";
import CodeMirror from "@uiw/react-codemirror";
import { ActionType } from "./types";
import config from "./config/config.json";

export default function Editor() {
    const { app } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(true);

    const dirty = useMemo(() => {
        return app.activeScene?.text !== app.draftActiveSceneText;
    }, [app.activeScene, app.draftActiveSceneText]);

    const onChange = useCallback(
        (value: string) => {
            try {
                dispatch({
                    type: ActionType.SET_DRAFT_ACTIVE_SCENE_TEXT,
                    payload: value,
                });
                const payload = {
                    id: app.activeScene?.id,
                    text: value,
                };
                const str = JSON.stringify(payload);
                localStorage.setItem(config.DRAFT_SCENE_KEY, str);
            } catch (error) {
                console.warn(error);
            }
        },
        [dispatch, app.activeScene?.id]
    );

    return (
        <div className="container d-flex flex-column align-items-center w-100 vh-100">
            <div className="d-flex align-items-center justify-content-between w-100 mb-3 py-3 border-bottom border-danger">
                <Button
                    disabled={!dirty}
                    onClick={() => navigate("/merge")}
                    size="sm"
                >
                    Show Diffs
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
            <CodeMirror
                autoFocus
                basicSetup={{
                    foldGutter: false,
                    highlightActiveLine: false,
                }}
                value={app.draftActiveSceneText}
                // themes: https://uiwjs.github.io/react-codemirror/#/theme/home
                theme={isDark ? "dark" : "light"}
                height={"500px"}
                width={`calc(36em + 74px)`}
                extensions={[
                    vim({ status: true }),
                    markdown(),
                    EditorView.lineWrapping,
                    EditorView.contentAttributes.of({ spellcheck: "true" }),
                ]}
                onChange={onChange}
            />
        </div>
    );
}
