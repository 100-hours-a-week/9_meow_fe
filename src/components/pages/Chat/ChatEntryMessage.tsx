interface IChatEntryMessage {
  message: string;
}

export default function ChatEntryMessage({ message }: IChatEntryMessage) {
  return (
    <div className="w-full bg-muted-foreground/40 rounded-lg p-1">
      <p className="text-sm text-center">{message}</p>
    </div>
  );
}
