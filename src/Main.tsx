import Editor from "./Editor";
import MergeEditor from "./MergeEditor";
import { useAppSelector } from "./hooks/reduxHooks";

export default function Main() {
    const {
        app: { isDiffing },
    } = useAppSelector((state) => state);
    return (
        <div className="container d-flex flex-column w-100">
            {isDiffing ? <MergeEditor /> : <Editor />}
        </div>
    );
}
