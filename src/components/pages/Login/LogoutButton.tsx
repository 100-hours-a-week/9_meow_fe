import { Button } from "@/components/ui/button";
import useTokenStore from "@/store/useTokenStore";

export default function LogoutButton() {
  const { clearToken } = useTokenStore();

  return (
    <Button
      variant="link"
      onClick={() => {
        clearToken();
        alert("로그아웃 되었다옹");
      }}
      className="text-base"
    >
      로그아웃
    </Button>
  );
}
