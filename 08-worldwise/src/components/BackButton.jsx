import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigate(-1); // navigate -1 means navigating to previous open page
      }}
      type="back"
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
