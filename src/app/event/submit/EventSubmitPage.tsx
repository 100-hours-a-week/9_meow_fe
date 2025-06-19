import { EventSubmitForm } from "@/components/pages";

export default function EventSubmitPage() {
  return (
    <div className="w-full px-6 flex flex-col gap-5 items-center">
      <div className="flex flex-col gap-2 items-center mt-5">
        <p className="text-4xl">¢ 미스코리냥 신청 ♧</p>
        <p className="text-2xl">주제 : (반려)동물의 극대노 모먼트</p>
      </div>
      <div className="flex flex-col gap-0 items-start text-base">
        <p>• 한번 사진 제출하면 바꿀 수 없다냥</p>
        <p>• 사진은 위 아래나 양옆이 잘릴 수도 있다냥</p>
      </div>
      <EventSubmitForm />
    </div>
  );
}
