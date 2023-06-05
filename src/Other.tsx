import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function OtherPage() {
  const navigate = useNavigate();
  return (
    <div className="container d-flex flex-column mt-5">
      <Button onClick={() => navigate("/")} style={{ width: 200 }}>
        Page 1
      </Button>
    </div>
  );
}
