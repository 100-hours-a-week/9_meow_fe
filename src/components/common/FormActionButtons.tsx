import { Button } from "../ui/button";

export default function FormActionButtons({
  disabled,
  isPending,
  handleSubmit,
  handleCancel,
}: {
  disabled: boolean;
  isPending: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
}) {
  return (
    <div className="flex gap-2 w-full justify-end">
      <Button variant="primarySolid" onClick={handleCancel}>
        취소냥
      </Button>
      <Button
        variant="secondarySolid"
        disabled={disabled || isPending}
        onClick={handleSubmit}
      >
        {isPending ? "잠시만 기다려주세옹" : "£완료하면 누르라냥!"}
      </Button>
    </div>
  );
}
