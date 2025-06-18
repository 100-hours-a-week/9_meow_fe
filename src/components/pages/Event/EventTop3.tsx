import EventPostCard, {
  IEventPostCard,
} from "@/components/pages/Event/PostCard";

interface IEventTop3 {
  first: IEventPostCard;
  second?: IEventPostCard;
  third?: IEventPostCard;
}
export default function EventTop3({ first, second, third }: IEventTop3) {
  return (
    <div className="flex flex-row justify-between bg-foreground rounded-2xl p-2">
      <EventPostCard {...first} dark />
      {second && <EventPostCard {...second} dark />}
      {third && <EventPostCard {...third} dark />}
    </div>
  );
}
