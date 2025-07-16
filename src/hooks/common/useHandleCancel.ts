import { useNavigate } from "react-router-dom";

export const useHandleCancel = ({
  onCancel,
  navigateTo,
}: {
  onCancel?: () => void;
  navigateTo: string;
}) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    const answer = window.confirm(
      "취소하면 작성한 내용이 사라진다옹. 그래도 취소하겠냥?",
    );
    if (answer) {
      onCancel?.();
      navigate(navigateTo);
    }
  };

  return { handleCancel };
};
